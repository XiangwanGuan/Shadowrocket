/********************************
SDB Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/P/平安口袋银行/rewrite/sdb.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/P/平安口袋银行/sdb.sgmodule
********************************/

const url = $request.url;
const header = $response.headers;

const contType = header["Content-Type"];
const contLength = header["Content-Length"];

if ((contType == "image/jpeg" || contType == "image/jpg") && contLength > 100000) {
  $done({body: "", headers: "", status: "HTTP/1.1 204 No Content"});
} else {
  $done({});
}
