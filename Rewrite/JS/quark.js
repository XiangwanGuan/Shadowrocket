if (!$response.body) $done({});
var json = JSON.parse($response.body);
var pathsToDelete = [
    "result.cms_user_center_bussiness_banner_config",
    "result.cms_user_center_welfare_farm_entry_config",
    "result.cms_cloud_drive_transport_header_banner",
    "result.qk_novel_noah_sdk_slot_bottom_banner",
    "result.cms_novel_bookshelf_banner",
    "result.cms_bookmarkAndHistory_banner_ad",
    "result.paisou_benefit_banner",
    "result.novel_ad_flbanner_close",
    "result.noah_content_embed_ad_hc_vertical_scale_style",
    "result.minipg_ads_switch_quark",
    "result.noah_search_mid_page_ad_list",
    "result.noah_search_mid_ad_enable",
    "result.cms_web_ad_local_block_js",
    "result.novel_paid_book_ad_density_newuser",
    "result.novel_ad_flbanner_cdtime",
    "result.cms_sm_ad_request_handle_enable",
    "result.novel_ad_space_count",
    "result.cms_sc_ad_request_handle_enable",
    "result.noah_content_embed_ad_vertical_scale_style",
    "result.enable_miniframe_prefetch_ad",
    "result.cms_camera_asset_activity_banner_list",
    "result.idfa_auth_config",
    "result.cms_cloud_drive_user_banner",
    "result.cms_quark_pan_scene.res_data.data[0].items[39]",
    "result.cms_quark_pan_scene.res_data.data[0].items[40]",
    "result.cms_quark_pan_scene.res_data.data[0].items[41]",
    "result.cms_quark_pan_scene.res_data.data[0].items[4]",
    "result.cms_quark_pan_scene.res_data.data[0].items[6]",
    "result.cms_cloud_backup_free_benefit_config",
    "result.camera_universal_word_result_page",
    "result.cms_quark_pan_scene.res_data.data[0].items[5]",
    "result.cms_quark_pan_scene.res_data.data[0].items[52]",
    "result.cms_quark_pan_scene.res_data.data[0].items[185]",
    "result.cms_quark_pan_scene.res_data.data[0].items[186]"
];
pathsToDelete.forEach(function (path) {
    var parts = path.split('.');
    var current = json;
    for (var i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
            delete current[parts[i]];
        } else {
            current = current[parts[i]];
            if (!current) break;
        }
    }
});
$done({body: JSON.stringify(json)});
