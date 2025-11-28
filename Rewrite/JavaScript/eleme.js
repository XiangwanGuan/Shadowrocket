/********************************
Eleme Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Alipay/E/饿了么/rewrite/eleme.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Alipay/E/饿了么/eleme.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
if (url.includes("mtop.alsc.eleme.miniapp.homepage")) {
	if (obj.data?.data?.miniapp_suspension_template) {
		delete obj.data.data.miniapp_suspension_template;
	}
	if (obj.data?.data?.frontend_suspension_template) {
		delete obj.data.data.frontend_suspension_template;
	}

}
body = JSON.stringify(obj);
$done({body});
