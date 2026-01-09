const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
if (url.includes("ems.com.cn")) {
  obj.info.moduleJson = JSON.stringify(JSON.parse(obj.info.moduleJson).filter(item => !item.moduleName.includes("广告") || item.moduleName === "轮播广告"));
} else if (url.includes("mapi.xiaotucc.com")) {
  if (url.includes("main_page/index/getActivity")) {
    delete obj.data.p3;
  } else if (url.includes("mall/main")) {
    delete obj.data;
  }
} else if (url.includes("minifm.maxxipoint.com")) {
  delete obj.data.topBanner;
} else if (url.includes("lawsonapi.yorentown.com")) {
  if (url.includes("/home/getReservation")) {
      if (obj?.data) {
          obj.data = {};
      }
  } else if (url.includes("/home/getRecommendations")) {
      if (obj?.data) {
          obj.data = {};
      }
  } else if (url.includes("/home/getConfigInfo")) {
      if (obj?.data?.dysmorphismPictureList) {
          obj.data.dysmorphismPictureList = [];
      }
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
} else if (url.includes("miniapp.sexytea2013.com")) {
  delete obj.data.INDEX_SLOT_01;
  delete obj.data.INDEX_SLOT_02;
  obj.data?.INDEX_TOP_BANNER?.contents?.forEach(item => {
    delete item.bubble;
    delete item.figure;
  });
} else if (url.includes("coco-com.e.verystar.net")) {
  delete obj.data.top_background_url;
  delete obj.data.bottom_banner_list;
} else if (url.includes("htwkop.xiaojukeji.com")) {
  delete obj.data.bannerInfoConfig;
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
