/********************************
Flyert Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/F/飞客/rewrite/flyert.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/F/飞客/flyert.sgmodule
********************************/

let body = $response.body;
let headers = $response.headers;
if (!$response.body) $done({});
const isJson = headers["Content-Type"] == "application/json";
if (isJson) {
  let obj = JSON.parse(body);
  if (obj?.Variables) {
    let variables = obj.Variables;
    if (variables.data && variables.data.adv) {
      variables.data.adv = {};
    }
  }
  body = JSON.stringify(obj);
  $done({body});
} else {
  $done();
}
