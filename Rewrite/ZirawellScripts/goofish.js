/********************************
Goofish Remove Ads - Version 1.0
Checkout Source - https://github.com/fmz200/wool_scripts/raw/main/Scripts/xianyu/xianyu_ads.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/X/闲鱼/rewrite/goofish.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/X/闲鱼/goofish.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/mtop.taobao.idlehome.home.nextfresh")) {
  // 可能存在的首页标签
  delete obj.data.widgetReturnDO;
  // 删除banner图
  delete obj.data.bannerReturnDO;
  // 信息流广告
  if (obj.data?.sections) {
    obj.data.sections = obj.data.sections.filter(section => {
      return !(section.data && (section.data.bizType === "AD" || section.data.bizType === "homepage"));
    });

    let excludeNames = ['fish_home_yunying_card_d3', 'idlefish_seafood_market', 'fish_home_chat_room'];
    obj.data.sections = obj.data.sections.filter(function (section) {
      return !excludeNames.includes(section.template.name);
    });
  }
} else if (url.includes("/mtop.taobao.idle.local.home")) {
  if (obj.data?.sections) {
    obj.data.sections = obj.data.sections.filter(section => {
      return !(section.data && section.data.bizType === "AD");
    });
  }
} else if (url.includes("/mtop.taobao.idle.home.whale.modulet")) {
  delete obj.data.container.sections;
}

$done({body: JSON.stringify(obj)});
