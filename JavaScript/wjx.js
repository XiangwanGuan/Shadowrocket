/********************************
WenJuanXing Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/W/问卷星/rewrite/wjx.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/W/问卷星/wjx.sgmodule
********************************/

const resp = {};
if (!$response.body) $done({});
var parser = new DOMParser();
let body = $response.body;
body = body.replace(/^isRandShowAward =1;/g, "isRandShowAward =0;");
var doc = parser.parseFromString(body, "text/html");
var element = doc.getElementById("divAward");
element.parentNode.removeChild(element);
element = doc.getElementById("divPromoteVas");
element.parentNode.removeChild(element);
resp.body = doc.documentElement.outerHTML;
$done(resp);
