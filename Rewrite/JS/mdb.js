const resp = {};
if (!$response.body) $done({});
var parser = new DOMParser();
var doc = parser.parseFromString($response.body, "text/html");
var element = doc.getElementById("banner");
element.parentNode.removeChild(element);
resp.body = doc.documentElement.outerHTML;
$done(resp);
