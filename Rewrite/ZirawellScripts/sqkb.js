/********************************
ShengQianKuaiBao Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/S/省钱快报/rewrite/sqkb.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/S/省钱快报/sqkb.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
if (url.includes("/remind/list")) {
  if (obj?.data) {
    obj.data.recommend_coupon_list = [];
  }
} else if (url.includes("/operate/elements")) {
  if (obj?.data?.user_center_mid_2022?.length > 0) {
    obj.data.user_center_mid_2022 = [];
  }
  if (obj?.data?.user_center_slide_show_pic_2022?.length > 0) {
    obj.data.user_center_slide_show_pic_2022 = [];
  }
  if (obj?.data?.home_mid_banner_multi_202208?.length > 0) {
    obj.data.home_mid_banner_multi_202208 = [];
  }
  if (obj?.data?.main_rebate_banner_2022_09?.length > 0) {
    obj.data.main_rebate_banner_2022_09 = [];
  }
  if (obj?.data?.home_newfeed_oper_new_2022?.length > 0) {
    obj.data.home_newfeed_oper_new_2022 = [];
  }
}
body = JSON.stringify(obj);
$done({body});
