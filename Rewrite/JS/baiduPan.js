const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);
if (url.includes("/api/getsyscfg?")) {
  const switchs = [
    "active_sigin_text",
    "ai_search_h5",
    "album_story_config",
    "bdnc_commerce_expire_alert_area",
    "bdnc_commerce_video_ad_area_pad",
    "business_ad_config_area",
    "certification_user_area",
    "enterprise_banner_area",
    "enterprise_bottom_banner",
    "enterprise_hot_tools_area",
    "enterprise_share_file_list",
    "enterprise_space_area",
    "enterprise_space_config_area",
    "enterprise_space_document_pay_guide",
    "flutter_business_area",
    "home_card_area",
    "home_recnet_chasing_card_switch",
    "home_tool_area_all_tool_item_area",
    "ios_carplay_config_area",
    "local_push",
    "magictrick",
    "magictrick_inspiration_area",
    "my_person_service",
    "my_share_tag_area",
    "new_user_card",
    "ocr_ai_scan_entrance_area",
    "private_background_upload",
    "public_guide_config",
    "public_home_config",
    "public_imprint_config",
    "push_active_area",
    "share_Im_idol_area",
    "share_tool_area",
    "splash_advertise_fetch_config_area",
    "splash_advertise_type_area",
    "theme_skin_active_area",
    "thrid_ad_buads_service",
    "thrid_ad_funads_service",
    "universal_card_area",
    "upload_retrieve"
  ];
  for (let i of switchs) {
    if (obj?.[i]?.cfg_list?.length > 0) {
      for (let ii of obj[i].cfg_list) {
        if (ii?.switch) {
          ii.switch = "0";
        }
        if (ii?.open) {
          ii.open = "0";
        }
      }
    }
  }
} else if (url.includes("/membership/user?")) {
  obj = {
    product_infos: [
      {
        cur_svip_type: "Crack",
        product_name: "svip2_nd",
        product_description: "解锁倍速+画质",
        function_num: 510004015,
        start_time: 1672502400,
        buy_description: "无下载加速",
        buy_time: 980784000,
        product_id: "问好",
        auto_upgrade_to_svip: 0,
        end_time: 4070880000,
        cluster: "vip",
        detail_cluster: "svip",
        status: 0
      }
    ],
    level_info: {
      current_level: 10
    }
  };
}
$done({body: JSON.stringify(obj)});
