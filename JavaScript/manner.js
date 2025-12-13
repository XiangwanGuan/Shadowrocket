/********************************
Manner Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/M/Manner/rewrite/manner.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/M/Manner/manner.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);

if (obj?.data?.myAnims?.length > 0) {
  obj.data.myAnims = [];
}
if (obj?.data?.homeAds?.length > 0) {
  obj.data.homeAds = [];
}
if (obj?.data?.orderPopups?.length > 0) {
  obj.data.orderPopups = [];
}
if (obj?.data?.homePopups?.length > 0) {
  obj.data.homePopups = [];
}
if (obj?.data?.broadcasts?.length > 0) {
  obj.data.broadcasts = [];
}
if (obj?.data?.menuPopups?.length > 0) {
  obj.data.menuPopups = [];
}
if (obj?.data?.giftCardAds?.length > 0) {
  obj.data.giftCardAds = [];
}
if (obj?.data?.myPopups?.length > 0) {
  obj.data.myPopups = [];
}
if (obj?.data?.menuAnims?.length > 0) {
  obj.data.menuAnims = [];
}
if (obj?.data?.orderAnims?.length > 0) {
  obj.data.orderAnims = [];
}
if (obj?.data?.pmPopups?.length > 0) {
  obj.data.pmPopups = [];
}
if (obj?.data?.goodsCategoryAds?.length > 0) {
  obj.data.goodsCategoryAds = [];
}
if (obj?.data?.shopAds?.length > 0) {
  obj.data.shopAds = [];
}
if (obj?.data?.ooAds?.length > 0) {
  obj.data.ooAds = [];
}
if (obj?.data?.homeAnims?.length > 0) {
  obj.data.homeAnims = [];
}
if (obj?.data?.startAds?.length > 0) {
  obj.data.startAds = [];
}

body = JSON.stringify(obj);
$done({body});
