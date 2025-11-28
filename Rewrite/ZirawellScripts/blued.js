/********************************
Blued Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/B/Blued/rewrite/blued.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/B/Blued/blued.sgmodule
********************************/

if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
obj.data[0].banner = {};
obj.data[0].service = [];
obj.data[0].healthy = {};
obj.data[0].healthy_banner = [];
obj.data[0].emotions = [];
$done({body: JSON.stringify(obj)});
