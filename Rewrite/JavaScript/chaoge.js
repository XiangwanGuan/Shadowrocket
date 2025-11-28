/********************************
Chaoge Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/C/超格教育/rewrite/chaoge.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/C/超格教育/chaoge.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/getPageAdList")) {
  if (obj.data?.ad_list?.length > 0) {
    obj.data.ad_list = obj.data.ad_list.filter(list => list.page_position !== "pop");
  }
  
} else if (url.includes("/getAppBanner")) {
  const queryParam = $request.url.split("?")[1];
  if (queryParam) {
    const params = {};
    for (param of queryParam.split("&")) {
        params[param.split("=")[0]] = param.split("=")[1];
    }
    if (params.adv_flag === "1") {
      if (obj.data?.length > 0) {
        obj.data = obj.data.filter(item => item.adv_flag !== "1");
      }
    }
  }
}
$done({body: JSON.stringify(obj)});


