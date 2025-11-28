/********************************
Maimai Remove Ads - Version 1.0
Checkout Source - https://kelee.one/Resource/Script/MaiMai/MaiMai_remove_ads.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/M/脉脉/rewrite/maimai.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/M/脉脉/maimai.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/focus_feed")) {
  if (obj.feeds && obj.feeds.length > 0) {
    obj.feeds = obj.feeds.filter(feed => !feed.newAdStyle);
  }
}

if (url.includes("/gossip_detail_comment")) {
  if (obj.comments?.lst && obj.comments.lst.length > 0) {
    obj.comments.lst = obj.comments.lst.filter(comment => !comment.newAdStyle);
  }
}

if (url.includes("/feed_detail_comment")) {
  if (obj.lst && obj.lst.length > 0) {
    obj.lst = obj.lst.filter(item => !item.newAdStyle);
  }
}

$done({body: JSON.stringify(obj)});
