/********************************
ABC Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/Z/中国农业银行/rewrite/abc.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/Z/中国农业银行/abc.sgmodule
********************************/

const url = $request.url;
const header = $request.headers;
const headopt = header["Operation-Type"] || header["operation-type"];

const blockList = [
    "com.bankabc.recommendcenter.homepage.gethpadverinfo",
    "com.bankabc.credit.welfareCenter.getadverinfo",
    //"com.bankabc.credit.home.getCcocAdInfo",
    "com.bankabc.credit.query.custbillqry.getadv",
    "com.abchina.mbank.common.homepage.getStartParam",
    "alipay.client.updateVersion",
    "com.abchina.mbank.securitycenter.msmp.antiHijack"
];

if (blockList?.includes(headopt)) {
    $done({status: "HTTP/1.1 404 Not Found"});
} else {
    $done({});
}
