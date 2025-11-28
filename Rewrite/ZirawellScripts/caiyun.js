/********************************
Caiyun Remove Ads - Version 1.0
Checkout Source - https://kelee.one/Resource/Script/ColorfulClouds/ColorfulClouds_remove_ads.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/C/彩云天气/rewrite/caiyunapp.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/C/彩云天气/caiyunapp.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);
if (url.includes("/activity")) {
  // 彩云推广
  if (["&type_id=A03&"]?.includes(url)) {
    // 彩云AI
    if (obj?.interval) {
      obj.interval = 2592000; // 30天===2592000秒
    }
    if (obj?.activities?.length > 0) {
      let newActs = [];
      for (let item of obj.activities) {
        if (item?.type === "tabbar" && item?.feature) {
          item.feature = false;
        } else {
          continue;
        }
        newActs.push(item);
      }
      obj.activities = newActs;
    }
  } else {
    // 其他请求
    obj = {
      status: "ok",
      interval: 2592000,
      id: "1",
      activities: [
        {
          items: [{text: "", image_light: "", link: "", activity_name: "", id: "1", image_dark: ""}],
          type: "activity_icon",
          name: "",
          carousel: "5000"
        }
      ]
    };
  }
}
$done({body: JSON.stringify(obj)});
