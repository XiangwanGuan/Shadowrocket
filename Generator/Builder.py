import os
import re
import shlex
import datetime
import requests
import ipaddress

def load_source(url):
    candidate_paths = [url, os.path.join(os.path.dirname(os.path.abspath(__file__)), url)]
    if url.startswith("https://"):
        try: response = requests.get(url); response.raise_for_status(); return response.text
        except Exception: print(f"Failed to download {url}"); return None
    for file_path in candidate_paths:
        if os.path.isfile(file_path):
            try: return open(file_path, encoding='utf-8').read()
            except Exception: print(f"Failed to read {file_path}"); return None
    print(f"Local file not found: {candidate_paths[-1]}"); return None

def build_sgmodule(rule_text, project_name):
    formatted_time = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=8)).strftime("%Y-%m-%d %H:%M:%S")
    header_details_lines = [f"#!name={project_name}", f"#!desc={formatted_time}"]
    arguments_list = re.findall(r'^\s*#!arguments\s*=\s*(.+)', rule_text, re.MULTILINE)
    arguments_list = [", ".join(part.strip() for part in line.split(',')) for line in arguments_list]
    if arguments_list:
        header_details_lines.append("#!arguments=" + ", ".join(arguments_list))
    desc_matches = re.findall(r'^\s*#!arguments-desc\s*=\s*(.+)', rule_text, re.MULTILINE)
    desc_items = [desc.strip() for line in desc_matches for desc in line.split('；') if desc.strip()]
    if desc_items:
        header_details_lines.append(f"#!arguments-desc=\\n 参数说明：\\n {'；\\n '.join(desc_items)}；\\n ")
    sgmodule_content = '\n'.join(header_details_lines) + '\n' if header_details_lines else ''

    rule_pattern = r'^(?!#)(.*?)\s*(DOMAIN(?:-SUFFIX|-KEYWORD)?|IP-CIDR|AND|URL-REGEX),'
    priority_list = ['DOMAIN,', 'DOMAIN-SUFFIX,', 'DOMAIN-KEYWORD,', 'IP-CIDR,', 'AND,', 'URL-REGEX,']
    priority_index = {p: i for i, p in enumerate(priority_list)}
    rule_match_lines = []
    for line in rule_text.splitlines():
        line = line.strip()
        if line and re.match(rule_pattern, line):
            rule_match_lines.append(line)
    rule_match_lines = list(set(rule_match_lines))
    rule_match_lines.sort(key=lambda x: (
        0 if ',PROXY' in x.replace(' ', '').upper() else 1 if ',DIRECT' in x.replace(' ', '').upper() else 2,
        priority_index.get(next((p for p in priority_list if x.startswith(p)), ''), len(priority_list)),
        (lambda ip: 0 if ip and ip.version == 4 else 1 if ip and ip.version == 6 else 2)(
            (lambda s: ipaddress.ip_address(s) if s and re.match(r'^\d', s) else None)(
                x.split(',')[1].split('/')[0].strip() if x.startswith('IP-CIDR,') and ',' in x and '/' in x else ''
            )
        ),
        (lambda s: list(ipaddress.ip_address(s).packed) if s and re.match(r'^\d', s) else [999] * 16)(
            x.split(',')[1].split('/')[0].strip() if x.startswith('IP-CIDR,') and ',' in x and '/' in x else ''
        ),
        x.upper()
    ))
    sgmodule_content += "\n[Rule]\n" + '\n'.join(rule_match_lines) + '\n' if rule_match_lines else ''

    rewrite_pattern = r'^(?!#)(.*?)\s*url\s+(reject(?:-200|-array|-dict|-img|-tinygif)?)'
    redirect_pattern = r'^(?!#)(.*?)\s*url\s+(302|307|header)\s+(.*)$'
    url_rewrite_lines = []
    for match in re.finditer(rewrite_pattern, rule_text, re.MULTILINE):
        pattern = match.group(1).strip()
        reject_type = match.group(2).strip()
        url_rewrite_lines.append(f"{pattern} - {reject_type}")
    for match in re.finditer(redirect_pattern, rule_text, re.MULTILINE):
        pattern = match.group(1).strip()
        destination = match.group(3).strip()
        redirect_type = match.group(2).strip()
        url_rewrite_lines.append(f"{pattern} {destination} {redirect_type}")
    sgmodule_content += "\n[URL Rewrite]\n" + '\n'.join(sorted(set(url_rewrite_lines))) + '\n' if url_rewrite_lines else ''

    header_pattern = r'^(?!#)(.*?)\s*url\s+(request-header|response-header)\s+(.*)$'
    header_rewrite_lines = []
    for match in re.finditer(header_pattern, rule_text, re.MULTILINE):
        request_url, header_type, header_content = match.group(1).strip(), match.group(2).strip(), match.group(3).strip()
        operation_type = f"http-{header_type.split('-')[0]}"
        header_content = header_content.replace("-regex", "").strip()
        header_replace_match = re.search(r'([\w-]+)\s*:\s*"?([^"]+)"?', header_content)
        if header_replace_match:
            header_value = header_replace_match.group(2)
            header_rewrite_lines.append(f"{operation_type} {request_url} {'header-replace-regex' if '-regex' in match.group(3) else 'header-replace'} {header_replace_match.group(1)} {header_value}")
        else:
            header_del_match = re.search(r'(\S+)\s+\S+-header-del', header_content, re.I)
            header_add_match = re.search(r'(\S+)\s+\S+-header-add\s+"?([^"]+)"?', header_content, re.I)
            if header_del_match:
                header_rewrite_lines.append(f"{operation_type} {request_url} header-del {header_del_match.group(1)}")
            elif header_add_match:
                header_add_value = header_add_match.group(2)
                header_rewrite_lines.append(f'{operation_type} {request_url} header-add {header_add_match.group(1)} {header_add_value}')
    header_rewrite_lines = [line for operation in ['header-del', 'header-add', 'header-replace'] for line in header_rewrite_lines if operation in line]
    header_rewrite_lines = list(dict.fromkeys(header_rewrite_lines))
    sgmodule_content += "\n[Header Rewrite]\n" + '\n'.join(header_rewrite_lines) + '\n' if header_rewrite_lines else ''

    jq_pattern = r'^(?!#)(.*?)\s*url\s+jsonjq-response-body\s+(.*)$'
    body_pattern = r'^(?!#)(.*?)\s*url\s+(response-body|request-body)\s+(\S+)\s+\2\s+(\S+)'
    body_rewrite_lines = []
    for m in re.finditer(jq_pattern, rule_text, re.MULTILINE):
        matcher, body_expr = m.group(1).strip(), m.group(2).strip()
        if body_expr.startswith("'") and body_expr.endswith("'"):
            body_rewrite_lines.append(f"http-response-jq {matcher} {body_expr}")
    for m in re.finditer(body_pattern, rule_text, re.MULTILINE):
        matcher, body_type, old, new = m.group(1).strip(), m.group(2).strip(), m.group(3).strip(), m.group(4).strip()
        if body_type == 'response-body':
            body_rewrite_lines.append(f"http-response {matcher} {old} {new}")
        else:
            body_rewrite_lines.append(f"http-request {matcher} {old} {new}")
    sgmodule_content += "\n[Body Rewrite]\n" + '\n'.join(sorted(set(body_rewrite_lines))) + '\n' if body_rewrite_lines else ''

    maplocal_pattern = r'^(?!#)(.*?)\s*mock-response-body\s+(.*)$'
    map_local_lines = []
    for match in re.finditer(maplocal_pattern, rule_text, re.MULTILINE):
        regex, params_str = match.group(1).strip(), match.group(2).strip()
        data_match = re.search(r'data=\s*(["\'].*["\']|{.*}|\[.*\])', params_str)
        data = data_match.group(1) if data_match else ''
        params_str_wo_data = params_str[:data_match.start()] + params_str[data_match.end():] if data_match else params_str
        lexer = shlex.shlex(params_str_wo_data, posix=False)
        lexer.whitespace_split = True
        lexer.commenters = ''
        lexer.quotes = '"'
        lexer.wordchars += ':/-._?&'
        kv_pairs = dict(token.split('=', 1) for token in lexer if '=' in token)
        data_type = kv_pairs.get('data-type', '').lower()
        status_code = kv_pairs.get('status-code', '')
        is_base64 = kv_pairs.get('mock-data-is-base64', '').lower() == 'true'
        status_code = status_code or ('200' if data_type == 'json' else status_code)
        data = data[1:-1] if data.startswith('"') and data.endswith('"') else data
        if is_base64 or data_type == 'base64': content_type = 'application/octet-stream'
        elif data_type in ('json','text') and (data.strip().startswith('{') or data.strip().startswith('[')): content_type = 'application/json'
        elif data_type in ('json','text'): content_type = 'text/plain'
        else: content_type = 'application/octet-stream'
        line = f'{regex} data-type={data_type} data="{data}"'
        line += f' status-code={status_code}' if status_code else ''
        line += f' header="content-type: {content_type}"' if 'header' not in kv_pairs else ''
        map_local_lines.append(line)
    sgmodule_content += "\n[Map Local]\n" + '\n'.join(sorted(set(map_local_lines))) + '\n' if map_local_lines else ''

    script_pattern = r'^(?!#)(.*?)\s*url\s+(script-(?:response|request)-(?:body|header)|script-echo-response|script-analyze-echo-response)\s+(\S+)'
    script_rewrite_lines = []
    for match in re.finditer(script_pattern, rule_text, re.MULTILINE):
        pattern = match.group(1).strip()
        script_type_raw = match.group(2)
        script_path = match.group(3).strip().rstrip(',')
        filename_match = re.search(r'/([^/]+?)(?:\.js)?$', script_path)
        filename = filename_match.group(1).strip() if filename_match else script_path
        script_type = 'response' if script_type_raw in ['script-response-body', 'script-echo-response', 'script-response-header'] else 'request'
        needbody = "true" if script_type_raw in ['script-response-body', 'script-echo-response', 'script-response-header', 'script-request-body', 'script-analyze-echo-response'] else "false"
        params = [f"{filename} =type=http-{script_type}", f"pattern={pattern}", f"script-path={script_path}", f"requires-body={needbody}", "max-size=0"]
        line_start = match.start()
        line_end = rule_text.find('\n', line_start)
        line = rule_text[line_start:line_end if line_end != -1 else None]
        binary_body_mode_match = re.search(r'binary-body-mode\s*=\s*(true|false)', line)
        if binary_body_mode_match:
            params.append(f"binary-body-mode={binary_body_mode_match.group(1)}")
        argument_match = re.search(r'argument\s*=\s*(["\'].*["\']|{.*}|\[.*\])', line)
        if argument_match:
            params.append(f'argument={argument_match.group(1)}')
        script_line = ', '.join(f'{k}={f"""{v}""" if "," in v or " " in v else v}' for k,v in (p.split("=",1) for p in params))
        script_rewrite_lines.append(script_line)
    sgmodule_content += "\n[Script]\n" + '\n'.join(sorted(set(script_rewrite_lines))) + '\n' if script_rewrite_lines else ''

    mitm_pattern = r'^\s*hostname\s*=\s*([^\n#]*)\s*(?=#|$)'
    mitm_matches = set()
    for match in re.finditer(mitm_pattern, rule_text, re.MULTILINE):
        hostnames = match.group(1).split(',')
        mitm_matches.update(host.strip().lower() for host in hostnames if host.strip())
    mitm_match_content = ','.join(sorted(mitm_matches, key=lambda host: (0 if host.startswith('-') else 1, host)))
    sgmodule_content += "\n[MITM]\n" + f"hostname = %APPEND% {mitm_match_content}\n" if mitm_match_content else ''

    return sgmodule_content

def save_sgmodule(content, path):
    try: open(path, 'w', encoding='utf-8').write(content)
    except Exception as e: print(f"Failed to save output file: {path}: {e}")

def generate_app_modules(rules, parent_dir):
    dir_modules = os.path.join(parent_dir, "Release", "Modules")
    os.makedirs(dir_modules, exist_ok=True)
    apps_dict, buffer_lines, current_app = {}, [], None
    for line in rules.splitlines():
        if line.startswith("# >"):
            if current_app and buffer_lines: apps_dict[current_app] = "\n".join(buffer_lines); buffer_lines=[]
            current_app = line[3:].strip()
        elif current_app: buffer_lines.append(line)
    if current_app and buffer_lines: apps_dict[current_app] = "\n".join(buffer_lines)
    existing_files = set(os.listdir(dir_modules))
    for filename in existing_files:
        if filename.replace(".sgmodule", "") not in apps_dict: os.remove(os.path.join(dir_modules, filename))
    for app_name, text in apps_dict.items():
        full_content = build_sgmodule(text, app_name).rstrip("\n") + "\n"
        strip = lambda s: "\n".join(l for l in s.splitlines() if not l.startswith('#!desc=')) + "\n"
        filepath = os.path.join(dir_modules, f"{app_name}.sgmodule")
        if os.path.exists(filepath):
            with open(filepath, encoding="utf-8") as f: content = f.read()
            if strip(content) != strip(full_content): os.remove(filepath)
            else: continue
        save_sgmodule(full_content, filepath)

def generate_main_sgmodule(sources, parent_dir):
    merged_rules = "\n".join(filter(None, (load_source(u) for u in sources)))
    if not merged_rules: return print("No valid rules found — module generation skipped.")
    content = build_sgmodule(merged_rules, "融合模块")
    if content: save_sgmodule(content, os.path.join(parent_dir, "Release", "Module.sgmodule")); print(content)
    generate_app_modules(merged_rules, parent_dir)

def main():
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    try: entries=[l.strip() for l in open(os.path.join(parent_dir,"Generator","Generate.conf")) if l.strip() and not l.startswith('#')]
    except Exception as e: return print(f"Failed to read input file: {e}")
    generate_main_sgmodule(entries, parent_dir)

if __name__=="__main__": main()
