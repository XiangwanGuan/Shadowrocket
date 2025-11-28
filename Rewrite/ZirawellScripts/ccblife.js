/********************************
CCBLife Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/J/建行生活/rewrite/ccblife.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/J/建行生活/ccblife.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);

const moduleKeys = [
  "TAG_AD_INFO",                  // 精选-右下角悬浮广告
  "NOTICE_AD_INFO",               // 精选-中间文字推荐
  "PREFERENCE_AD_INFO",           // 精选-本地优惠
  "HPBANNER_AD_INFO_SECOND",      // 精选-精选推荐-横幅
  "DAY_BEST_AD_FIRST",            // 精选-精选推荐-轮播1
  "DAY_BEST_AD_SECOND",           // 精选-精选推荐-轮播2
  "DAY_BEST_AD_THIRD",            // 精选-精选推荐-轮播3
  "DAY_BEST_AD_FOURTH",           // 精选-精选推荐-轮播4

  "LIFE_TOP_ROTATION_INFO_V3",    // 生活-上方轮播图
  "EDITOR_RECOMMEND2_AD",         // 生活-小编推荐
  "LIFE_V3_SCENE_AGGREGATION",    // 生活-分期·好生活
  "LIFE_LIST",                    // 生活-本地优惠标签

  "THROUGH_COLUMN_INFO",          // 金融-中间轮播图

  "MEBCT_AD_INFO",                // 我的-底部横幅广告
  "MYSELF_ENTRANCE_AD",           // 我的-财富会员入口
  
];

const blockKeys = [
  "A3341SB16",                    // 更新提示
  "A3341C147",                    // 新人礼包
  "A3341A009",                    // 开屏广告

];

const flowKeys = [
  "A3341A095",                    // 精选-种草推荐
  "A3341MB22",                    // 生活-本地优惠
  "A3341A068",                    // 金融-热门资讯 
];

if (containKey(url,blockKeys)) {
  $done({body: "", headers: "", status: "HTTP/1.1 204 No Content"});

} else if (url.includes("A3341AB04")) {
  if (obj?.data?.ICON_SKIN_INFO) {
    delete obj.data.ICON_SKIN_INFO;
  }
// 页面模块内容净化
} else if (url.includes("A3341AB03")) {
  if (obj?.data) {
    moduleKeys.forEach(key => {
      if (obj.data[key]) {
        delete obj.data[key];
      }
    });
  }
// 弹窗广告去除
} else if (url.includes("A3341A120")) {
  if (obj?.data?.POP_AD_INFO) {
    delete obj.data.POP_AD_INFO;
  }
// 信息流去除
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
// 楼层开关
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
