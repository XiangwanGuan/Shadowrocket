/********************************
Pinduoduo Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/P/拼多多/rewrite/pdd.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/P/拼多多/pdd.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);

if (url.includes('/api/alexa/homepage/hub')) {
  if (obj.result && obj.result.bottom_tabs && obj.result.bottom_tabs.length > 0) {
    obj.result.bottom_tabs = obj.result.bottom_tabs.filter(tab => tab.title !== '多多视频' && tab.title !== '大促会场' && tab.title !== '搜索' && tab.title !== '直播');
    delete obj.result.icon_set;
    delete obj.result.search_bar_hot_query;
  }
} else if (url.includes('/api/philo/personal/hub')) {
  delete obj.monthly_card_entrance;
  delete obj.personal_center_style_v2_vo;
  if (obj.icon_set) {
    delete obj.icon_set.icons;
    delete obj.icon_set.top_personal_icons;
  }
} else if (url.includes("/api/oak/integration/render")) {
  if (obj.ui) {
    delete obj.ui.bottom_section;
    if (obj.ui.live_section) {
      delete obj.ui.live_section.float_info;
    }
  }
  delete obj.bottom_section_list;
}
body = JSON.stringify(obj);

$done({body});
