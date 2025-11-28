/********************************
Guiderank Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/G/盖得排行/rewrite/guiderank.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/G/盖得排行/guiderank.sgmodule
********************************/

if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
let data = obj.data;
if (data.countdownBanner) {
  delete obj.data.countdownBanner;
}
if (data.newEvaluations) {
  delete obj.data.newEvaluations;
}
if (data.freeToPayBannerPhotoUrl) {
  delete obj.data.freeToPayBannerPhotoUrl;
}
if (data.groupBuyingList) {
  delete obj.data.groupBuyingList;
}
if (data.multiCountdownBanner) {
  delete obj.data.multiCountdownBanner;
}
if (data.banners) {
  delete obj.data.banners;
}
if (data.multiPlatformBanner) {
  delete obj.data.multiPlatformBanner;
}
if (data.specialSaleBannerPhotoUrl) {
  delete obj.data.specialSaleBannerPhotoUrl;
}
if (data.guide90Evaluation) {
  delete obj.data.guide90Evaluation;
}
if (data.insurancePromotions) {
  delete obj.data.insurancePromotions;
}
body = JSON.stringify(obj);
$done({body});
