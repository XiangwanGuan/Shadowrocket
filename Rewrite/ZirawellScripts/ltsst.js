/********************************
Ltsst Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/L/旅途随身听/rewrite/1314zhilv.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/L/旅途随身听/1314zhilv.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);

if (url.includes('/common/getJGQIconNew')) {
  delete obj.content.specialBanner;
} else if (url.includes('/city/getAllBannelByCity')) {
  obj.content = obj.content.filter(i => i.bannerType === 1);
}

body = JSON.stringify(obj);
$done({body});
