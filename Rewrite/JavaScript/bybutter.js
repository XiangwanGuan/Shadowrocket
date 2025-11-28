/********************************
ButterCam Unlock Vip - Version 1.0
Checkout Source - https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/hy.js
Please note that you may need to reinstall app for script to work.

- QuantumultX:

[rewrite_local]
^https?:\/\/api\d\.bybutter\.com\/v\d url script-response-body https://raw.githubusercontent.com/zirawell/R-Store/main/Res/Scripts/Unlock/bybutter.js

[mitm]
hostname = api*.bybutter.com

- Surge:

[Script]
bybutter = type=http-response,pattern=^https?:\/\/api\d\.bybutter\.com\/v\d,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/zirawell/R-Store/main/Res/Scripts/Unlock/bybutter.js

[MITM]
hostname= %APPEND% api*.bybutter.com

********************************/

if (!$response.body) $done({});
let body = $response.body;
const modifiedBody = body
  .replace(/"ownership":\s*"\w+"/g, '"ownership":"free"')
  .replace(/"usageType":\s*"\w+"/g, '"usageType":"unlimited"')
  .replace(/"memberships":\s*\[\]/g, '"memberships":[{"endAt":1780697166,"id":"1","name":"262223689020250215","ownership":"temporary","startAt":1587654321,"usageType":"unlimited"}]')
  .replace(/false/g, "true");
$done({ body: modifiedBody });