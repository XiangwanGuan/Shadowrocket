/********************************
Sougou Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/S/搜狗输入法/rewrite/sogou.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/S/搜狗输入法/sogou.sgmodule
********************************/

const url = $request.url;
const header = $request.headers;
const contype = header["Content-Type"] || header["content-type"];

if (contype === "application/octet-stream") {
  $done({status: "HTTP/1.1 404 Not Found"});
} else {
  $done({});
}
