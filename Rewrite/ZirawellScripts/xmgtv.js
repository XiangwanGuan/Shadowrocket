/********************************
XiaoMang Remove Ads - Version 1.0
Checkout Source - https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/AdBlock/xmApp/xmApp.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/X/小芒/rewrite/xmgtv.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/X/小芒/xmgtv.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let Body = JSON.parse(body);
if (url.match(/icon/)) {
    Body.data = {
        ...Body.data,
        big_promotion_center: {},
        active_center: {}
    }
} else if (url.match(/index/)) {
    let filtData = Body.data.filter(e => e.hasMore);
    Body.data = filtData;
}
$done({body: JSON.stringify(Body)})
