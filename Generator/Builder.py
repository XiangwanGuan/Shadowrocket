import os
import re
import shlex
import datetime
import requests
import ipaddress

def load_source(url):
    if os.path.isfile(url):
        try:
            with open(url, 'r', encoding='utf-8') as file:
                return file.read()
        except IOError as e:
            print(f"Failed to read local file: {url}: {e}")
            return None
    elif url.startswith("https://"):
        try:
            response = requests.get(url)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            print(f"Failed to download content from URL: {url}: {e}")
            return None
    else:
        local_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), url)
        if os.path.isfile(local_path):
            try:
                with open(local_path, 'r', encoding='utf-8') as file:
                    return file.read()
            except IOError as e:
                print(f"Error reading local file {local_path}: {e}")
                return None
        else:
            print(f"Local file not found: {local_path}")
            return None

def build_sgmodule(rule_text, project_name):
    formatted_time = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=8)).strftime("%Y-%m-%d %H:%M:%S")
    header_lines = [f"#!name={project_name}", f"#!desc={formatted_time}"]
    arguments_list = re.findall(r'^\s*#!arguments\s*=\s*(.+)', rule_text, re.MULTILINE)
    arguments_list = [", ".join(part.strip() for part in line.split(',')) for line in arguments_list]
    if arguments_list:
        header_lines.append("#!arguments=" + ", ".join(arguments_list))
    desc_matches = re.findall(r'^\s*#!arguments-desc\s*=\s*(.+)', rule_text, re.MULTILINE)
    desc_items = [desc.strip() for line in desc_matches for desc in line.split('；') if desc.strip()]
    if desc_items:
        header_lines.append(f"#!arguments-desc=\\n 参数说明：\\n {'；\\n '.join(desc_items)}；\\n ")
    sgmodule_content = '\n'.join(header_lines) + '\n' if header_lines else ''

    sgmodule_content += "\n[Rule]\n"
    rule_pattern = r'^(?!#)(.*?)\s*(DOMAIN(?:-SUFFIX|-KEYWORD)?|IP-CIDR|AND|URL-REGEX),'
    priority_list = ['DOMAIN,', 'DOMAIN-SUFFIX,', 'DOMAIN-KEYWORD,', 'IP-CIDR,', 'AND,', 'URL-REGEX,']
    priority_index = {p: i for i, p in enumerate(priority_list)}
    rule_lines = []
    for line in rule_text.splitlines():
        line = line.strip()
        if line and re.match(rule_pattern, line):
            rule_lines.append(line)
    rule_lines = list(set(rule_lines))
    rule_lines.sort(key=lambda x: (
        priority_index.get(next((p for p in priority_list if x.startswith(p)), ''), len(priority_list)),
        0 if (x.startswith('IP-CIDR,') and ',' in x and '/' in x and
            ipaddress.ip_address(x.split(',')[1].split('/')[0].strip()).version == 4) else
        1 if (x.startswith('IP-CIDR,') and ',' in x and '/' in x and
            ipaddress.ip_address(x.split(',')[1].split('/')[0].strip()).version == 6) else 2,
        list(ipaddress.ip_address(x.split(',')[1].split('/')[0].strip()).packed)
        if x.startswith('IP-CIDR,') and ',' in x and '/' in x else [999] * 16,
        x.upper()
    ))
    sgmodule_content += '\n'.join(rule_lines) + '\n' if rule_lines else ''

    sgmodule_content += "\n[URL Rewrite]\n"
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
    sgmodule_content += '\n'.join(sorted(set(url_rewrite_lines))) + '\n' if url_rewrite_lines else ''

    sgmodule_content += "\n[Map Local]\n"
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
        lexer.wordchars += ':/-._'
        kv_pairs = dict(token.split('=', 1) for token in lexer if '=' in token)
        data_type = kv_pairs.get('data-type', '').lower()
        status_code = kv_pairs.get('status-code', '')
        is_base64 = kv_pairs.get('mock-data-is-base64', '').lower() == 'true'
        status_code = status_code or ('200' if data_type == 'json' else status_code)
        data = data[1:-1] if data.startswith('"') and data.endswith('"') else data
        content_type = ('application/octet-stream' if is_base64 or data_type == 'base64'
                        else {'text': 'text/plain', 'json': 'application/json'}.get(data_type, 'application/octet-stream'))
        line = f'{regex} data-type={data_type} data="{data}"'
        line += f' status-code={status_code}' if status_code else ''
        line += f' header="Content-Type:{content_type}"' if 'header' not in kv_pairs else ''
        map_local_lines.append(line)
    sgmodule_content += '\n'.join(sorted(set(map_local_lines))) + '\n' if map_local_lines else ''

    sgmodule_content += "\n[Body Rewrite]\n"
    body_pattern = r'^(?!#)(.*?)\s*url\s+jsonjq-response-body\s+(.*)$'
    body_jq_lines = []
    for match in re.finditer(body_pattern, rule_text, re.MULTILINE):
        body_matcher = match.group(1).strip()
        body_expr = match.group(2).strip()
        if body_expr.startswith("'") and body_expr.endswith("'"):
            line = f"http-response-jq {body_matcher} {body_expr}"
            body_jq_lines.append(line)
        elif body_expr.startswith('jq-path="') and body_expr.endswith('"'):
            line = f"http-response-jq {body_matcher} {body_expr}"
            body_jq_lines.append(line)
    sgmodule_content += '\n'.join(sorted(set(body_jq_lines))) + '\n' if body_jq_lines else ''

    sgmodule_content += "\n[Script]\n"
    script_pattern = r'^(?!#)(.*?)\s*url\s+(script-(?:response|request)-(?:body|header)|script-echo-response|script-analyze-echo-response)\s+(\S+)'
    script_lines = []
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
        script_line = ', '.join(params)
        script_lines.append(script_line)
    sgmodule_content += '\n'.join(sorted(set(script_lines))) + "\n" if script_lines else ''
    replace_pattern = r'^(?!#)(.*?)\s*url\s+(response-body)\s+(\S+)\s+(response-body)\s+(\S+)'
    replace_lines = []
    for match in re.finditer(replace_pattern, rule_text, re.MULTILINE):
        pattern = match.group(1).strip()
        re1 = match.group(3).strip()
        re2 = match.group(5).strip()
        line = f"ReplaceBody =type=http-response, pattern={pattern}, script-path=https://xiangwanguan.github.io/Shadowrocket/Rewrite/JavaScript/ReplaceBody.js, requires-body=true, max-size=0, argument={re1}->{re2}"
        replace_lines.append(line)
    sgmodule_content += '\n'.join(sorted(set(replace_lines))) + '\n' if replace_lines else ''

    sgmodule_content += "\n[MITM]\n"
    mitm_pattern = r'^\s*hostname\s*=\s*([^\n#]*)\s*(?=#|$)'
    mitm_matches = set()
    for match in re.finditer(mitm_pattern, rule_text, re.MULTILINE):
        hostnames = match.group(1).split(',')
        mitm_matches.update(host.strip().lower() for host in hostnames if host.strip())
    mitm_match_content = ','.join(sorted(mitm_matches, key=lambda host: (0 if host.startswith('-') else 1, host)))
    sgmodule_content += f"hostname = %APPEND% {mitm_match_content}\n" if mitm_match_content else ''

    return sgmodule_content

def generate_sgmodule(rule_sources, project_name, parent_dir):
    merged_rule_text = ""
    for url in rule_sources:
        rule_text = load_source(url)
        if rule_text:
            merged_rule_text += rule_text + "\n"
        else:
            print(f"Unable to retrieve or process rule source: {url}")
    sgmodule_content = build_sgmodule(merged_rule_text, project_name)
    if sgmodule_content:
        output_file = os.path.join(parent_dir, "Release", "Module.sgmodule")
        save_sgmodule(sgmodule_content, output_file)
        print(sgmodule_content)
        print(f"Module successfully generated and saved to: {output_file}")
    else:
        print("No valid content found — module generation skipped.")

def save_sgmodule(content, file_path):
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except IOError as e:
        print(f"Failed to save output file: {file_path}: {e}")

def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(current_dir)
    input_file_path = os.path.join(parent_dir, "Generator", "Generate.conf")
    print("Input file path:", input_file_path)
    try:
        with open(input_file_path, 'r') as file:
            build_entries = [line.strip() for line in file if line.strip() and not line.strip().startswith('#')]
    except IOError as e:
        print(f"Failed to read input file: {e}")
        exit(1)
    generate_sgmodule(build_entries, "融合模块", parent_dir)

if __name__ == "__main__":
    main()
