/********************************
Douyu Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.
Checkout Source - https://kelee.one/Resource/Script/Douyu/Douyu_remove_ads.js

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/D/斗鱼直播/rewrite/douyu.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/D/斗鱼直播/douyu.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

function removeAds(data) {
  return data.filter(item => !item.ad);
}

if (url.includes("/getRecV3")) {
  if (obj.data && obj.data.rec_cont) {
    obj.data.rec_cont = removeAds(obj.data.rec_cont);
  }
  if (obj.data && obj.data.rec_card) {
    for (let i in obj.data.rec_card) {
      var v = obj.data.rec_card[i]
      if (v.card_banner) {
        v.card_banner = removeAds(v.card_banner)
      }
    }
  }
} else if (url.includes("/nc/m/list")) {
  if (obj.data) {
    // 直播间悬浮窗
    delete obj.data.pendant_a;
    // 直播间宝箱
    delete obj.data.entrance_d;
  }
} else if (url.includes("keyCodeSet=flow_config")) {
  const keysToZero = {
    "greatGodGameSitterSwitch": 0, // 大神游戏陪玩
    "followMoreAnchorEntrance": 0, // 关注更多主播入口
    "sdklivebanner": 0, // 直播横幅
    "homeActFloatSwitch": 0, // 首页活动悬浮窗
    "bringGoodsSwitch": 0, // 带货开关
    "qqGameSwitch": 0 // QQ游戏
  };
  if (obj.data) {
    for (let key in keysToZero) {
      if (obj.data.hasOwnProperty(key)) {
        obj.data[key] = keysToZero[key];
      }
    }
  }
}
$done({body: JSON.stringify(obj)});
