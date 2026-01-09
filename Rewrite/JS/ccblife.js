const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
const moduleKeys = [
  "TAG_AD_INFO",
  "NOTICE_AD_INFO",
  "PREFERENCE_AD_INFO",
  "HPBANNER_AD_INFO_SECOND",
  "DAY_BEST_AD_FIRST",
  "DAY_BEST_AD_SECOND",
  "DAY_BEST_AD_THIRD",
  "DAY_BEST_AD_FOURTH",
  "LIFE_TOP_ROTATION_INFO_V3",
  "EDITOR_RECOMMEND2_AD",
  "LIFE_V3_SCENE_AGGREGATION",
  "LIFE_LIST",
  "THROUGH_COLUMN_INFO",
  "MEBCT_AD_INFO",
  "MYSELF_ENTRANCE_AD",
];
const blockKeys = [
  "A3341SB16",
  "A3341C147",
  "A3341A009",
];
const flowKeys = [
  "A3341A095",
  "A3341MB22",
  "A3341A068",
];
if (containKey(url,blockKeys)) {
  $done({body: "", headers: "", status: "HTTP/1.1 204 No Content"});
} else if (url.includes("A3341AB04")) {
  if (obj?.data?.ICON_SKIN_INFO) {
    delete obj.data.ICON_SKIN_INFO;
  }
} else if (url.includes("A3341AB03")) {
  if (obj?.data) {
    moduleKeys.forEach(key => {
      if (obj.data[key]) {
        delete obj.data[key];
      }
    });
  }
} else if (url.includes("A3341A120")) {
  if (obj?.data?.POP_AD_INFO) {
    delete obj.data.POP_AD_INFO;
  }
} else if (containKey(url,flowKeys)) {
  if (obj?.data?.data?.recList && obj.data.data.recList.length > 0) {
    delete obj.data.data.recList;
  }
  if (obj?.data?.data?.topList && obj.data.data.topList.length > 0) {
    delete obj.data.data.topList;
  }
  if (obj?.data?.MCT_INFO && obj.data.MCT_INFO.length > 0) {
    delete obj.data.MCT_INFO;
  }
} else if (url.includes("A3341AB08")) {
  if (obj?.data?.STOREY_DISPLAY_INFO && obj.data.STOREY_DISPLAY_INFO.length > 0) {
    obj.data.STOREY_DISPLAY_INFO.forEach(item => {
      if (item.STOREY_NM?.match(/广告|热门|轮播|分期|推荐|借|我要/)) {
        item.IS_DISPLAY = "0";
      }
    });
  }
}
body = JSON.stringify(obj);
$done({body});
function containKey(url,keys) {
  return keys.some(key => url.includes(key));
}
