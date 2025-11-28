/********************************
360SmartCamera Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/0-9/360摄像机/rewrite/360cam.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/0-9/360摄像机/360cam.sgmodule
********************************/

if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
// 删除 - 我的页面推广语
if (obj.activity) {
  delete obj.activity;
}
// 删除 - 底栏商城入口
if (obj.tab_conf["tab_360Mall"]) {
  delete obj.tab_conf["tab_360Mall"];
}
// 删除 - 广告配置
if (obj.ad_conf) {
  delete obj.ad_conf;
}

body = JSON.stringify(obj);
$done({body});
