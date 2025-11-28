/********************************
Sptcc Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/S/上海交通卡/rewrite/sptcc.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/S/上海交通卡/sptcc.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
if (obj?.myPageBanner) {
  obj.myPageBanner = [];
}
if (obj?.mainPage_recommend) {
  obj.mainPage_recommend.waterfallFlow = [];
}
if (obj?.ggLykLinkArray) {
  obj.ggLykLinkArray = [];
}
body = JSON.stringify(obj);
$done({body});
