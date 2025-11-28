/********************************
Usmile Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/X/笑容加/rewrite/usmile.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/X/笑容加/usmile.sgmodule
********************************/

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
