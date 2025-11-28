/********************************
163News Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/W/网易新闻/rewrite/163news.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/W/网易新闻/163news.sgmodule
********************************/

if (!$response.body) $done({});
const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);
if (url.includes("/feed/dynamic/headline-list")) {
  // 信息流
  if (obj?.data?.items?.length > 0) {
    // 移除置顶新闻
    obj.data.items = obj.data.items.filter((i) => !(i?.tagList?.length > 0));
  }
} else if (url.includes("/nex.163.com/q")) {
  // 开屏广告
  if (obj?.ads?.length > 0) {
    obj.ads = [];
  }
} else if (url.includes("/search/hot-word")) {
  // 搜索框
  if (obj?.data?.special?.length > 0) {
    // 猜你想搜
    obj.data.special = [];
  }
  // if (obj?.data?.hotWordList?.length > 0) {
  //     热搜列表
  //   obj.data.hotWordList = [];
  // }
  if (obj?.data?.RollhotWordList?.length > 0) {
    // 搜索框填充词
    obj.data.RollhotWordList = [];
  }
}
body = JSON.stringify(obj);
$done({body});
