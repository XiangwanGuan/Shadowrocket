/********************************
Yunda Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/Y/韵达快递/rewrite/yunda.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/Y/韵达快递/yunda.sgmodule
********************************/

if (!$request.body) $done({});
let body = JSON.parse($request.body);
const action = body.action;
const blockIds = [
	"ydmbintegral.ydintegral.integral.event.sign",
	"ydmbaccount.ydaccount.queryAdinfosByGateway",
	"ydmbcommon.ydcommon.ad.guide.config",
	"ydmbcard.ydcard.activity.queryPopularize"
];

if (blockIds.includes(action)) {
	$done({status: "HTTP/1.1 404 Not Found", body: "", headers: ""});
} else {
	$done({});
}
