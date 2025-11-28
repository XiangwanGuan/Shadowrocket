/********************************
TaiFengLuJing Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/T/台风路径/rewrite/tflj.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/T/台风路径/tflj.sgmodule
********************************/

if (!$response.body) $done({});
let resp = {};
let body = $response.body;
body = body.replace(/adConfig/g, "adConfig0").replace(/typhoonPopupConfig/g, "typhoonPopupConfig0").replace(/guidePoup/g, "guidePoup0");
$done({body});
