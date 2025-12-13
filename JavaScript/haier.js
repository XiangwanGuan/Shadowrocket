/********************************
HaierZJ Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/H/海尔智家/rewrite/ehaier.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/H/海尔智家/ehaier.sgmodule
********************************/

if (!$response.body) $done({});
const url = $request.url;
let obj = JSON.parse($response.body);

if (url.includes("/get/resourceBag")) {
  if (obj.data) {
    obj.data.resource.md5 = null;
  }
}

if (url.includes("/resource/confFile/")) {
  if (obj.id) {
    if (obj.id === 595 && obj.detail) {
      let item = obj.detail;
      item = item.filter(a =>
              a.aliasName === "705首页顶部" ||
              // a.aliasName === "718-天气"
              a.aliasName === "版块标题" ||
              a.aliasName === "图文导航" ||
              a.aliasName === "705消息通知"
          // a.aliasName === "705活动标题"
          // a.aliasName === "魔方"
          // a.aliasName === "705生活标题"
          // a.aliasName === "魔方"
          // a.aliasName === "双排瀑布流"
      );
    } else if (obj.id === 169 && obj.detail) {
      let item = obj.detail[0].na.items;
      item = item.filter(b =>
          b.na.name === "首页" ||
          b.na.name === "智家" ||
          b.na.name === "我的"
      );
    }
  } else if (obj.length === 1) {
    let item = obj[0].na.items;
    item = item.filter(c =>
        c.na.name === "首页" ||
        c.na.name === "智家" ||
        c.na.name === "我的"
    );
  }
}

body = JSON.stringify(obj);
$done({body});
