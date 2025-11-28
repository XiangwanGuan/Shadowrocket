/********************************
Gaoding Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/G/稿定设计/rewrite/gaoding.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/G/稿定设计/gaoding.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);
if (url.indexOf("/oc/exhibitions/template/resources") != -1) {
  // 移除首页轮播图
  if (obj.pits && obj.pits[0]) {
    delete obj.pits[0].delivery_materials;
  }
} else if (url.indexOf("/oc/exhibitions/app_mine/resources") != -1) {
  // 移除我的页面轮播图
  if (obj.pits && obj.pits[2]) {
    delete obj.pits[2].delivery_materials;
  }
} else {
  $done({});
}
$done({body: JSON.stringify(obj)});
