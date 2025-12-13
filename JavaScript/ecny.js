/********************************
eCNY Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/S/数字人民币/rewrite/ecny.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/S/数字人民币/ecny.sgmodule
********************************/

const url = $request.url;
const header = $request.headers;
const headopt = header["Operation-Type"] || header["operation-type"];

const blockList = [
    "alipay.client.updateVersion",
    "alipay.client.switches.all.get.afterloginPb",
    "com.dcep.walletapp.api.securityEnvDetect"

];

if (blockList?.includes(headopt)) {
    $done({status: "HTTP/1.1 404 Not Found", body: "", headers: ""});
} else {
    $done({});
}
