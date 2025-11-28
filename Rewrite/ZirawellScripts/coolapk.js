/********************************
Coolapk Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/K/酷安/rewrite/coolapk.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/K/酷安/coolapk.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/feed/detail")) {
  if (obj.data?.hotReplyRows?.length > 0) {
    obj.data.hotReplyRows = obj.data.hotReplyRows.filter((item) => item.id);
  }
  if (obj.data?.topReplyRows?.length > 0) {
    obj.data.topReplyRows = obj.data.topReplyRows.filter((item) => item.id);
  }
  const item = ["detailSponsorCard", "include_goods", "include_goods_ids"];
  for (let i of item) {
    if (obj.data?.[i]) {
      obj.data[i] = [];
    }
  }
} else if (url.includes("/feed/replyList")) {
  if (obj.data?.length > 0) {
    obj.data = obj.data.filter((item) => item.id);
  }
} else if (url.includes("/main/dataList")) {
  if (obj.data?.length > 0) {
    obj.data = obj.data.filter(
        (item) =>
            !(item.entityTemplate === "sponsorCard" || item.title === "精选配件")
    );
  }
} else if (url.includes("/main/indexV")) {
  if (obj.data?.length > 0) {
    obj.data = obj.data.filter(
        (item) =>
            !(
                item.entityTemplate === "sponsorCard" ||
                item.entityId === 8639 ||
                item.entityId === 29349 ||
                item.entityId === 33006 ||
                item.entityId === 32557 ||
                item.title.includes("值得买") ||
                item.title.includes("红包")
            )
    );
  }
} else if (url.includes("/main/init")) {
  if (obj.data?.length > 0) {
    obj.data = obj.data.filter(
        (item) => ![944, 945, 6390].includes(item?.entityId)
    );
  }
} else if (url.includes("/page/dataList")) {
  if (obj.data?.length > 0) {
    obj.data = obj.data.filter((item) => !(item.title === "酷安热搜"));
  }
}

$done({body: JSON.stringify(obj)});
