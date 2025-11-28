/********************************
Feizhu Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/F/飞猪旅行/rewrite/fliggy.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/F/飞猪旅行/fliggy.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
// 首页简化
if (url.includes("mtop.fliggy.ssif.pattern.home")) {
  const designedStructure = {
    "s_vertical_homepage_inner_scroll_layout": [
      "s_vertical_homepage_search_btns_2022",
      "s_vertical_homepage_kingkong_2022"
    ],
    "root": [
      "s_vertical_homepage_inner_scroll_layout",
      "s_vertical_homepage_cheap_2021_5",
      "s_vertical_homepage_wonderful_journey_channel",
      "s_vertical_homepage_cheap_bottom_gap",
      "s_vertical_homepage_topservice_layout"
    ],
    "s_share_guessyoulike_home_gul_tab_layout": [
      "s_share_guessyoulike_home_gul_tab_2021"
    ]
  };
  if (typeof obj?.data?.hierarchy?.structure !== "undefined") {
    obj.data.hierarchy.structure = designedStructure;
  }
// 产品页底部咨询框
} else if (url.includes("mtop.fliggy.traveldetail.ultron.detail.firstscreen")) {
  if (typeof obj?.data?.sellerConsultV2 !== "undefined") {
    delete obj.data.sellerConsultV2;
  }
}
body = JSON.stringify(obj);
$done({body});
