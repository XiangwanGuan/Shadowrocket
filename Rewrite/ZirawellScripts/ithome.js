/********************************
ItHome Remove Ads - Version 1.0
Checkout Source - https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/ithome.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/I/IT之家/rewrite/ithome.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/I/IT之家/ithome.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (
    url.includes("/api/news/index") ||
    url.includes("/api/topmenu/getfeeds")
) {
  if (obj?.data?.list?.length > 0) {
    let list = obj.data.list;
    const newList = [];
    for (let item of list) {
      if (item?.feedContent?.smallTags?.some((i) =>
          i?.text?.includes("广告"))
      ) {
        continue;
      }
      if ([10002, 10003].includes(item?.feedType)) {
        continue;
      }
      newList.push(item);
    }
    obj.data.list = newList;
  }
}

$done({body: JSON.stringify(obj)});
