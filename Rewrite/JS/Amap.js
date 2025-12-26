const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);
if (url.includes("/aos/perception/publicTravel/beforeNavi")) {
  if (obj?.data?.common_data?.bus_plan_bottom_event?.data?.length > 0) {
    obj.data.common_data.bus_plan_bottom_event.data = [];
  }
  if (obj?.data?.common_data?.bus_plan_bottom_tips?.data?.length > 0) {
    obj.data.common_data.bus_plan_bottom_tips.data = [];
  }
  if (obj?.data?.common_data?.bus_plan_segment_event?.data?.length > 0) {
    obj.data.common_data.bus_plan_segment_event.data = [];
  }
  if (obj?.data?.front_end?.assistant?.length > 0) {
    obj.data.front_end.assistant = [];
  }
} else if (url.includes("/boss/car/order/content_info")) {
  if (obj?.data?.lubanData?.popup?.dataList?.length > 0) {
    obj.data.lubanData.popup.dataList = [];
  }
  if (obj?.data?.lubanData?.skin?.dataList?.length > 0) {
    obj.data.lubanData.skin.dataList = [];
  }
  if (obj?.data?.matrixData?.c3DiversionCard?.dataList?.length > 0) {
    obj.data.matrixData.c3DiversionCard.dataList = [];
  }
  if (obj?.data?.matrixData?.DiversionCard?.dataList?.length > 0) {
    obj.data.matrixData.DiversionCard.dataList = [];
  }
} else if (url.includes("/boss/order_web/friendly_information")) {
  const items = ["banners", "carouselTips", "integratedBanners", "integratedTips", "skins", "skinAndTips", "tips"];
  if (obj?.data?.["105"]) {
    for (let i of items) {
      delete obj.data["105"][i];
    }
  }
} else if (url.includes("/bus/plan/integrate")) {
  if (obj?.data?.banner_lists?.data?.length > 0) {
    obj.data.banner_lists.data = [];
  }
  if (obj?.data?.banner_lists?.tips?.length > 0) {
    obj.data.banner_lists.tips = [];
  }
  if (obj?.data?.mixed_plans?.data?.taxiPlans?.length > 0) {
    obj.data.mixed_plans.data.taxiPlans = [];
  }
} else if (url.includes("/c3frontend/af-hotel/page/main")) {
  if (obj?.data?.modules) {
    if (obj?.data?.modules?.CouponPortalCard) {
      delete obj.data.modules.CouponPortalCard;
    }
    if (obj?.data?.modules?.CouponWidget) {
      delete obj.data.modules.CouponWidget;
    }
    if (obj?.data?.modules?.recommended_list) {
      delete obj.data.modules.recommended_list;
    }
    if (obj?.data?.modules?.user_filter_card) {
      const items = [
        "banner",
        "bannerList",
        "service_data",
        "sug_items_data"
      ];
      if (obj?.data?.modules?.user_filter_card?.data) {
        if (obj?.data?.modules?.user_filter_card?.data?.search_button_data?.rightbgText) {
          delete obj.data.modules.user_filter_card.data.search_button_data.rightbgText;
        }
        for (let i of items) {
          delete obj.data.modules.user_filter_card.data[i];
        }
      }
    }
  }
} else if (url.includes("/c3frontend/af-launch/page/main")) {
  if (obj?.data?.modules?.C1EndNaviEngine?.data) {
    obj.data.modules.C1EndNaviEngine.data = {};
  }
} else if (url.includes("/c3frontend/af-nearby/nearby")) {
  if (obj?.data?.modules?.banner) {
    obj.data.modules.banner = {};
  }
  if (obj?.data?.modules?.contentPoster) {
    obj.data.modules.contentPoster = {};
  }
} else if (url.includes("/faas/amap-navigation/card-service-plan-home")) {
  if (obj?.data?.children?.length > 0) {
    obj.data.children = obj.data.children.filter((i) => !i.hasOwnProperty("schema"));
  }
} else if (url.includes("/faas/amap-navigation/main-page")) {
  if (obj?.data?.cardList?.length > 0) {
    obj.data.cardList = obj.data.cardList.filter(
      (i) =>
        i?.dataKey === "ContinueNavigationCard" ||
        i?.dataKey === "FrequentLocation" ||
        i?.dataKey === "LoginCard"
    );
  }
  if (obj?.data?.mapBizList?.length > 0) {
    obj.data.mapBizList = obj.data.mapBizList.filter(
      (i) => i?.dataKey === "FindCarVirtualCard"
    );
  }
} else if (url.includes("/perception/drive/routeInfo")) {
  if (obj?.data?.tbt?.event?.length > 0) {
    obj.data.tbt.event = obj.data.tbt.event.filter((i) => !/ads-\d+/.test(i?.dynamic_id_s));
  }
  if (obj?.data?.front_end) {
    if (obj?.data?.front_end?.assistant) {
      delete obj.data.front_end.assistant;
    }
    if (obj?.data?.front_end?.guide_tips?.length > 0) {
      obj.data.front_end.guide_tips = obj.data.front_end.guide_tips.filter((i) => i?.biz_type !== "music");
    }
    if (obj?.data?.front_end?.download?.length > 0) {
      obj.data.front_end.download = obj.data.front_end.download.filter((i) => !/ads-\d+/.test(i?.dynamic_id_s));
    }
  }
} else if (url.includes("/perception/drive/routePlan")) {
  const items = [
    "assistant",
    "global_guide_data",
    "route_search",
    "start_button_tips"
  ];
  if (obj?.data?.front_end) {
    for (let i of items) {
      delete obj.data.front_end[i];
    }
  }
  if (obj?.data?.tbt?.event?.length > 0) {
    obj.data.tbt.event = obj.data.tbt.event.filter((i) => !/ads-\d+/.test(i?.dynamic_id_s));
  }
  if (obj?.data?.front_end?.download?.length > 0) {
    obj.data.front_end.download = obj.data.front_end.download.filter((i) => !/ads-\d+/.test(i?.dynamic_id_s));
  }
} else if (url.includes("/promotion-web/resource")) {
  const items = [
    "alpha",
    "banner",
    "bravo",
    "bubble",
    "charlie",
    "icon",
    "other",
    "popup",
    "push",
    "tips"
  ];
  if (obj?.data) {
    for (let i of items) {
      delete obj.data[i];
    }
  }
} else if (url.includes("/shield/dsp/profile/index/nodefaasv3")) {
  if (obj?.data) {
    if (obj?.data?.tipData) {
      delete obj.data.tipData;
    }
    if (obj?.data?.memberInfo) {
    }
    if (obj?.data?.topMixedCard) {
      delete obj.data.topMixedCard;
    }
    if (obj?.data?.cardList?.length > 0) {
      obj.data.cardList = obj.data.cardList.filter((i) => i?.dataKey === "MyOrderCard");
    }
  }
} else if (url.includes("/shield/frogserver/aocs/updatable/")) {
  const items = [
    "Naviendpage_Searchwords",
    "SplashScreenControl",
    "TipsTaxiButton",
    "amapCoin",
    "favorites_info",
    "feedback_banner",
    "footprint",
    "his_input_tip",
    "home_business_position_config",
    "hotel_activity",
    "hotel_fillin_opt",
    "hotel_loop",
    "hotel_tipsicon",
    "hotsaleConfig",
    "landing_page_info",
    "map_weather_switch",
    "maplayers",
    "navi_end",
    "nearby_business_popup",
    "nearby_map_entry_guide",
    "nearby_map_pull_down_guide",
    "operation_layer",
    "poi_rec",
    "preword",
    "route_banner",
    "routeresult_banner",
    "search_homepage",
    "search_keyword",
    "search_moni",
    "search_perf",
    "search_poi_recommend",
    "search_service_adcode",
    "search_word",
    "sportsGroupConfig",
    "sportsHealthConfig",
    "sportsHomeConfig",
    "sportsRouteConfig",
    "sportsTaskConfig",
    "sports_walk",
    "small_biz_b2b_kb",
    "small_biz_case",
    "small_biz_fun",
    "small_biz_index",
    "small_biz_news",
    "splashscreen",
    "splashview_config",
    "sur_bar",
    "taxi_activity",
    "testflight_adiu",
    "tf_remind",
    "tips_bar_black_list",
    "vip"
  ];
  if (obj?.data) {
    for (let i of items) {
      if (obj?.data?.[i]) {
        obj.data[i] = { status: 1, version: "", value: "" };
      }
    }
  }
} else if (url.includes("/shield/search/common/coupon/info")) {
  if (obj?.data) {
    obj.data = {};
  }
} else if (url.includes("/shield/search/nearbyrec_smart")) {
  const items = ["head", "search_hot_words", "feed_rec"];
  if (obj?.data?.modules?.length > 0) {
    if (obj?.data?.modules?.length > 0) {
      obj.data.modules = obj.data.modules.filter((i) => items?.includes(i));
    }
  }
} else if (url.includes("/shield/search/poi/detail")) {
  const items = [
    "CouponBanner",
    "CouponPush",
    "adStoreBigBannerModule",
    "adv_compliance_info",
    "adv_gift",
    "bigListBizRec",
    "bottomDescription",
    "brand_service",
    "brand_shop_bar",
    "businessQualifications",
    "carServiceCard",
    "checkIn",
    "check_in",
    "cityCardFeed",
    "city_discount",
    "claim",
    "co_branded_card",
    "collector_guide",
    "commonAiAgent",
    "commonGoodsShelf",
    "common_coupon_bar",
    "common_coupon_card",
    "comprehensiveEditEntrance",
    "contributor",
    "cpt_service_shop",
    "dayTripList",
    "discount_commodity",
    "divergentRecommendModule",
    "enhanceCustomerServiceFixedBottom",
    "enhanceCustomerServicePoiModule",
    "everyOneToSee",
    "feedback",
    "first_surround_estate_tab",
    "footer_tel_button",
    "horizontalGoodsShelf",
    "hospital_strategy",
    "hotPlay",
    "hot_new_house_estate",
    "hot_shop",
    "hotelCoupon",
    "hotelList",
    "hotelMustRead",
    "houseAgentService",
    "houseList",
    "houseOfficeBrandIntroduction",
    "houseOfficeInfo",
    "houseOfficeNotice",
    "houseOfficeService",
    "houseShelf",
    "house_apart_info",
    "house_buying_agent",
    "house_coupon",
    "house_cp_clues",
    "house_cpt_coupon",
    "house_cpt_grab",
    "house_price",
    "house_price_v2",
    "house_rent_sale_agency",
    "image_banner",
    "kaMarketingCampaign",
    "kaProductMixServiceShelf",
    "ka_not_enter",
    "legSameIndustryRecEntrance",
    "legal_document",
    "listBizRec_1",
    "listBizRec_2",
    "matrix_banner",
    "merchantSettlement",
    "membership",
    "mini_hook_shelf",
    "movie_info",
    "multi_page_anchor",
    "nearbyGoodCar",
    "nearbyRecommendModule",
    "nearby_house",
    "nearby_new_house_estate",
    "nearby_office_estate",
    "nearby_old_sell_estate",
    "nearby_play_rec",
    "newGuest",
    "newRelatedRecommends",
    "new_operation_banner",
    "newsellhouse",
    "officerenthouse",
    "officesellhouse",
    "official_account",
    "official_account_hospital",
    "oldsellhouse",
    "operation_banner",
    "operator_card",
    "packageShelf",
    "parentBizRec",
    "parentPoiRecEntrance",
    "platformCustomerCommonModule",
    "platformCustomerComplianceInfo",
    "poiDetailBottomBar",
    "poiDetailBottomBarOperation",
    "poiDetailCommonConfig",
    "poiDetailNewBeltV2",
    "poiDetailWaterFeed",
    "poiDetailWaterFeedTitle",
    "poster_banner",
    "portal_entrance",
    "quickLink",
    "quickLinksPortal",
    "relatedRecommends",
    "renthouse",
    "rentSaleHouse",
    "rentsaleagencyv2",
    "rentsaleagencyv3",
    "rentsalehouse",
    "residentialOwners",
    "retainInfo",
    "reviews",
    "sameIndustryRecommendModule",
    "sameIndustry2RecommendModule",
    "scenic_coupon",
    "scenic_filter",
    "scenic_lifeservices",
    "scenic_mustplay",
    "scenic_play_guide",
    "scenic_recommend",
    "scenic_voice",
    "searchPlaMap",
    "second_surround_estate_tab",
    "service_shop",
    "shopBaseCase",
    "shopStructGift",
    "shoppingMallEvent",
    "similarShelfRecommend",
    "similarShopRecommend",
    "smallListBizRec",
    "smallOrListBizRec",
    "societyPublicExperience",
    "subscription",
    "surroundHouseTab",
    "surroundOldSellHouse",
    "surroundRentHouse",
    "surround_facility",
    "surround_facility_new",
    "surround_house_tab",
    "surround_oldsellhouse",
    "surround_renthouse",
    "surround_rentoffice",
    "surround_selloffice",
    "thirdparty_info",
    "travelGuideRec",
    "uploadBar",
    "upload_bar",
    "verification",
    "waistRecEntrance",
    "waterFallFeed",
    "waterFallFeedTitle",
    "yellowPageAdRecommendModule"
  ];
  if (obj?.data?.modules) {
    if (obj?.data?.modules?.combineReviews?.data?.write_comment) {
      delete obj.data.modules.combineReviews.data.write_comment;
    }
    for (let i of items) {
      delete obj.data.modules[i];
    }
  }
} else if (url.includes("/shield/search_bff/hotword")) {
  if (obj?.data?.headerHotWord?.length > 0) {
    obj.data.headerHotWord = [];
  }
} else if (url.includes("/shield/search_poi/search/sp") || url.includes("/shield/search_poi/mps")) {
  if (obj?.data?.list_data) {
    let list = obj.data.list_data.content[0];
    if (list?.hookInfo) {
      let hookData = list.hookInfo.data;
      if (hookData?.header) {
        delete hookData.header;
      }
      if (hookData?.house_info) {
        delete hookData.house_info;
      }
    }
    if (list?.map_bottom_bar?.hotel) {
      delete list.map_bottom_bar.hotel;
    }
    if (list?.poi?.item_info?.tips_bottombar_button?.hotel) {
      delete list.poi.item_info.tips_bottombar_button.hotel;
    }
    if (list?.tips_operation_info) {
      delete list.tips_operation_info;
    }
    if (list?.bottom?.bottombar_button?.hotel) {
      delete list.bottom.bottombar_button.hotel;
    }
    if (list?.card?.card_id === "SearchCardBrand" && list?.item_type === "brandAdCard") {
      delete list.card;
    }
    if (list?.card?.card_id === "NearbyGroupBuy" && list?.item_type === "toplist") {
      delete list.card;
    }
    if (list?.card?.card_id === "ImageBanner" && list?.item_type === "ImageBanner") {
      delete list.card;
    }
  } else if (obj?.data?.district?.poi_list) {
    let poi = obj.data.district.poi_list[0];
    if (poi?.transportation) {
      delete poi.transportation;
    }
    if (poi?.feed_rec_tab) {
      delete poi.feed_rec_tab;
    }
  } else if (obj?.data?.modules) {
    if (obj?.data?.modules?.not_parse_result?.data?.list_data) {
      let list = obj.data.modules.not_parse_result.data.list_data.content[0];
      if (list?.hookInfo) {
        let hookData = list.hookInfo.data;
        if (hookData?.header) {
          delete hookData.header;
        }
        if (hookData?.house_info) {
          delete hookData.house_info;
        }
      }
      if (list?.map_bottom_bar?.hotel) {
        delete list.map_bottom_bar.hotel;
      }
      if (list?.poi?.item_info?.tips_bottombar_button?.hotel) {
        delete list.poi.item_info.tips_bottombar_button.hotel;
      }
      if (list?.tips_operation_info) {
        delete list.tips_operation_info;
      }
      if (list?.bottom?.bottombar_button?.hotel) {
        delete list.bottom.bottombar_button.hotel;
      }
    }
    if (obj?.data?.modules?.list_data?.data) {
      let list = obj.data.modules.list_data.data;
      if (list?.content?.length > 0) {
        list.content = list.content.filter((i) => !["brandAdCard", "toplist_al"]?.includes(i?.item_type));
      }
    }
  }
} else if (url.includes("/shield/search_poi/sug")) {
  if (obj?.tip_list) {
    let newLists = [];
    if (obj?.tip_list?.length > 0) {
      for (let item of obj.tip_list) {
        if (
          ["12"]?.includes(item?.tip?.datatype_spec) ||
          ["ad", "poi_ad", "toplist"]?.includes(item?.tip?.result_type) ||
          ["ad", "exct_query_sug_merge_theme", "query_sug_merge_theme", "sp"]?.includes(item?.tip?.task_tag)
        ) {
          continue;
        } else {
          newLists.push(item);
        }
      }
      obj.tip_list = newLists;
    }
  } else if (obj?.city_list) {
    let newLists = [];
    if (obj?.city_list?.length > 0) {
      for (let item of obj.city_list) {
        let newTips = [];
        if (item?.tip_list?.length > 0) {
          for (let ii of item.tip_list) {
            if (["12"]?.includes(ii?.tip?.datatype_spec)) {
              continue;
            } else if (["ad", "poi_ad"]?.includes(ii?.tip?.result_type)) {
              continue;
            } else {
              newTips.push(ii);
            }
          }
          item.tip_list = newTips;
        }
        newLists.push(item);
      }
      obj.city_list = newLists;
    }
  }
} else if (url.includes("/shield/search_poi/tips_operation_location")) {
  if (obj?.data?.coupon) {
    delete obj.data.coupon;
  }
  const items = [
    "belt",
    "common_float_bar",
    "common_image_banner",
    "coupon_discount_float_bar",
    "coupon_float_bar",
    "discount_coupon",
    "image_cover_bar",
    "mood_coupon_banner",
    "operation_brand",
    "promotion_wrap_card",
    "tips_top_banner"
  ];
  if (obj?.data?.modules) {
    for (let i of items) {
      delete obj.data.modules[i];
    }
  }
} else if (url.includes("/valueadded/alimama/splash_screen")) {
  if (obj?.data?.ad?.length > 0) {
    for (let item of obj.data.ad) {
      item.set.setting.display_time = 0;
      item.creative[0].start_time = 3818332800;
      item.creative[0].end_time = 3818419199;
    }
  }
}
$done({ body: JSON.stringify(obj) });
