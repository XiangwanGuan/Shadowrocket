/********************************
AirChina Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/Z/中国国际航空/rewrite/airchina.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/Z/中国国际航空/airchina.sgmodule
********************************/

const url = $request.url;
const resp = {};
const header = $request.headers;
const proc = header["procedure"];

const blockList = [
  "queryOpenScreenAd",
  "hasUpgrade",
  "getLocalHomePage",
  "getExternalHomePage",
  "queryImportantList",
];

if (blockList.includes(proc)) {
  resp.headers = $request.headers;
  $done(resp);
} else {
  $done({});
}
