/********************************
QuDa Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/Q/去上网(去哒)/rewrite/quda.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/Q/去上网(去哒)/quda.sgmodule
********************************/

if (!$response.body) $done({});
var body = $response.body;
var obj = JSON.parse(body);
if (obj.data.length == 600) {
    obj.data = "null";
    $done({body: JSON.stringify(obj)});
} else {
    $done({});
}
