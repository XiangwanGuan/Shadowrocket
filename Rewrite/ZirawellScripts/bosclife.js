/********************************
BOSC Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/S/上银美好生活/rewrite/bosclife.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/S/上银美好生活/bosclife.sgmodule
********************************/

const url = $request.url;
const header = $request.headers;
const headopt = header["Operation-Type"] || header["operation-type"];

const blockList = [
  "com.GLMobile.Market.PopupListQry",
  "com.GLMobile.Customer.QryGreeting",
  "alipay.client.updateVersion",
  "alipay.client.getUnionResource",
  "com.GLMobile.Market.SecondFloorResourcesQry",
  "com.GLMobile.NewOnlineService.HomeData",
  "com.GLMobile.Customer.HomePageInfoQry"

];

blockList.includes(headopt) ? $done({status: "HTTP/1.1 404 Not Found"}) : $done({});
