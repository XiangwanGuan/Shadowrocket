/********************************
Umetrip Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/H/航旅纵横/rewrite/umetrip.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/H/航旅纵横/umetrip.sgmodule
********************************/

const url = $request.url;
const header = $request.headers;
const ua = $request.headers.rpid || $request.headers.Rpid;
const blockIds = [
	"1000002",
	"1000019",
	"1430064",
	"1120002"
];

if (blockIds.includes(ua)) {
	$done({status: "HTTP/1.1 404 Not Found"});
} else {
	$done();
}
