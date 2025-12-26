const url = $request.url;
const header = $request.headers;
const resp = {};
const traceKey = Object.keys(header).find(key => /^tok/i.test(key));
const headopt = traceKey ? header[traceKey] : null;
if (headopt) {
  $done({body: "", headers: "", status: "HTTP/1.1 204 No Content"});
} else {
  $done({});
}
