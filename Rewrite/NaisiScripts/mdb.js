/********************************
Maidanba Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/M/买单吧/rewrite/mdb.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/M/买单吧/mdb.sgmodule
********************************/

const resp = {};
if (!$response.body) $done({});
// 买单吧-充值页面
var parser = new DOMParser();
var doc = parser.parseFromString($response.body, "text/html");
var element = doc.getElementById("banner");
element.parentNode.removeChild(element);
resp.body = doc.documentElement.outerHTML;
$done(resp);
