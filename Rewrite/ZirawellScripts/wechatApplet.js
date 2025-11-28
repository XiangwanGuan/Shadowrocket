/********************************
WechatApplet Remove Ads - Version 1.0

Please note that you may need to clean applet caches for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/N/挪瓦咖啡/rewrite/nowwa.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/H/汇付天下商户服务/rewrite/cloudpnr.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/M/MStand/rewrite/mstand.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/C/CoCo点单+/rewrite/coco.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/C/茶颜悦色/rewrite/sexytea.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/D/滴滴青桔/rewrite/didiqj.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/Q/全家微会员/rewrite/fm.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/X/小兔充充/rewrite/xiaotucc.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/E/EMS/rewrite/ems.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/L/罗森点点/rewrite/lawson.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/N/挪瓦咖啡/nowwa.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/H/汇付天下商户服务/cloudpnr.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/M/MStand/mstand.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/C/CoCo点单+/coco.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/C/茶颜悦色/sexytea.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/D/滴滴青桔/didiqj.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/Q/全家微会员/fm.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/X/小兔充充/xiaotucc.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/E/EMS/ems.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/L/罗森点点/lawson.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
//EMS中国邮政物流速递
if (url.includes("ems.com.cn")) {
  obj.info.moduleJson = JSON.stringify(JSON.parse(obj.info.moduleJson).filter(item => !item.moduleName.includes("广告") || item.moduleName === "轮播广告"));
//小兔充充
} else if (url.includes("mapi.xiaotucc.com")) {
  if (url.includes("main_page/index/getActivity")) {
    delete obj.data.p3;
  } else if (url.includes("mall/main")) {
    delete obj.data;
  }
//全家微会员
} else if (url.includes("minifm.maxxipoint.com")) {
  delete obj.data.topBanner;
//罗森点点
} else if (url.includes("lawsonapi.yorentown.com")) {
  // 处理预购列表
  if (url.includes("/home/getReservation")) {
      if (obj?.data) {
          obj.data = {};
      }
  // 处理推荐列表
  } else if (url.includes("/home/getRecommendations")) {
      if (obj?.data) {
          obj.data = {};
      }
  // 处理首页banner推广
  } else if (url.includes("/home/getConfigInfo")) {
      if (obj?.data?.dysmorphismPictureList) {
          obj.data.dysmorphismPictureList = [];
      }
  // 处理首页栏目
  } else if (url.includes("/mina/systemSetting")) {
      if (obj?.data) {
          obj.data = obj.data.map(item => {
              if (item.type === 'HOMETAB') {
                  item.openFlg = false;
                  item.typeValue = {};
              }
              return item;
          });
      }
  }
//茶颜悦色
} else if (url.includes("miniapp.sexytea2013.com")) {
  delete obj.data.INDEX_SLOT_01;
  delete obj.data.INDEX_SLOT_02;
  obj.data?.INDEX_TOP_BANNER?.contents?.forEach(item => {
    delete item.bubble;
    delete item.figure;
  });
//CoCo点单+
} else if (url.includes("coco-com.e.verystar.net")) {
  delete obj.data.top_background_url;
  delete obj.data.bottom_banner_list;
//滴滴青桔
} else if (url.includes("htwkop.xiaojukeji.com")) {
  delete obj.data.bannerInfoConfig;
//M Stand
} else if (url.includes("api.prod.dj.mstand.cn")) {
  delete obj.data.homeNewsAdv.jumpValue;
  delete obj.data.homeDineInAdv;
  delete obj.data.homePickupAdv;
  delete obj.data.nearbyShopInfo;
  delete obj.data.homeEventThemesAdv;
  delete obj.data.eventThemes;
  delete obj.data.homeRootAdv;
  delete obj.data.homeTopAdv;
  delete obj.data.homeDialogAdv;
  delete obj.data.homeBannerAdv;
  delete obj.data.homeCouponAdv;
  delete obj.data.homeCompanyAdv;
  delete obj.data.homeDeliveryAdv;
} else if (url.includes("webapi.qmai.cn")) {

//汇付天下商户服务
} else if (url.includes("saas-ad.cloudpnr.com")) {
  var ads = obj.data[0].ad_data;
  ads.forEach(function (adData) {
    adData.landing_page_url = "";
    adData.path = "";
    adData.ad_url_list = "";
    adData.check_ad_clicks = "";
    adData.check_ad_end_downloads = "";
    adData.check_ad_end_installs = "";
    adData.check_ad_fail_deep_links = "";
    adData.check_ad_landing_page = "";
    adData.check_ad_landing_page_fail = "";
    adData.check_ad_landing_page_success = "";
    adData.check_ad_open_deep_links = "";
    adData.check_ad_start_downloads = "";
    adData.check_ad_start_installs = "";
    adData.check_ad_success_deep_links = "";
    adData.check_ad_views = "";
  });
}

body = JSON.stringify(obj);
$done({body});
