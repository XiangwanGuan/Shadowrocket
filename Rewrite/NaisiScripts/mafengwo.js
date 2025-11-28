/********************************
Mafengwo Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/M/马蜂窝/rewrite/mafengwo.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/M/马蜂窝/mafengwo.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
// 打卡提醒
if (url.includes("/get_profile")) {
  if (obj?.data?.user_info?.daka_guide_info) {
    obj.data.user_info.daka_guide_info.is_show_tip = 0;
    obj.data.user_info.daka_guide_info.tip = "";
  }
// 我的页推广内容
} else if (url.includes("/get_list")) {
  if (obj?.data?.list?.length > 0) {
    obj.data.list = obj.data.list.filter(function (item) {
      if (item.style != "inspire") {
        return item;
      }
    });
  }
}
body = JSON.stringify(obj);
$done({body});
