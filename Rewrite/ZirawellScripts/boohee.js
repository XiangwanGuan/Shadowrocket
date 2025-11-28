/********************************
Boohee Remove Ads - Version 1.0
Checkout Source - https://kelee.one/Resource/Script/BooHee/BooHee_remove_ads.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/B/薄荷健康/rewrite/boohee.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/B/薄荷健康/boohee.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/index/plaza-flow?")) {
  if (obj?.data?.contents && obj.data.contents.length > 0) {
    obj.data.contents = obj.data.contents.filter(item => item.type !== 4);
  }
}

if (url.includes("/index?")) {
  delete obj.data.recom_cards;
  delete obj.data.recom_btns;
}

if (url.includes("/index/plaza")) {
  delete obj.data.tabs[1].badge;
  delete obj.data.recommend_ads;
}

if (url.includes("/string/market_page?title=metabolism_config")) {
  delete obj.dtop_banner;
  delete obj.diagnos_config;
  delete obj.partner_hospital;
  delete obj.question_answer;
  delete obj.product;
  delete obj.brand_story;
}

$done({body: JSON.stringify(obj)});
