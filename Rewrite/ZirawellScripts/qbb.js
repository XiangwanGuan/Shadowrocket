/********************************
Qbb Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/Q/亲宝宝/rewrite/qbb.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/Q/亲宝宝/qbb.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
if (obj?.adBannerList) {
  obj.adBannerList = [];
}
body = JSON.stringify(obj);
$done({body});
