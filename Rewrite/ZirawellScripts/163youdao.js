/********************************
Youdao Remove Ads - Version 1.0
Checkout Source - https://raw.githubusercontent.com/fmz200/wool_scripts/main/Scripts/youdao/dict-youdao-ad.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/W/网易有道词典/rewrite/163youdao.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/W/网易有道词典/163youdao.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);

if (url.includes('/homepage/promotion')) {
  obj.data.dataList = obj.data.dataList.filter(i => i.type === 'WOW');
} else if (url.includes('/course/tab/home')) {
  obj.data.tab.tabList = obj.data.tab.tabList.filter(i => i.title === '学库' || i.title === '四六级');
  obj.data.icon.iconList = obj.data.icon.iconList.filter(i => i.title === '实用英语');
  obj.data.fragmentList = obj.data.fragmentList.filter(i => i.type === 'GREAT_COURSE');
} else if (url.includes('/homepage/tile')) {
  obj.data.children = obj.data.children.filter(i => i.type === '');
}

$done({body: JSON.stringify(obj)});
