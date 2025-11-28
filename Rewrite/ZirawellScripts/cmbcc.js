/********************************
CMBCreditCard Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/Z/招行信用卡/rewrite/cmbcc.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/Z/招行信用卡/cmbcc.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;

if (url.includes("ResourceBits")) {
  let obj = JSON.parse(body);
  if (obj?.data?.metaData?.length > 0) {
    obj.data.metaData = obj.data.metaData.filter(item => item.key !== "banner");
  }
  if (obj?.data?.RIGHTRED) {
    delete obj.data.RIGHTRED;
  }
  if (obj?.data?.HOT) {
    delete obj.data.HOT;
  }
  if (obj?.data?.F1) {
    delete obj.data.F1;
  }
  if (obj?.data?.BANNER) {
    delete obj.data.BANNER;
  }

  body = JSON.stringify(obj);
} else if (url.includes("get-page-resource")) {
  body = body.replace(/_AD/g, "_AD0");
  body = body.replace(/PENDANT/g, "PENDANT0");
}

$done({body});
