/*
# 高德地图
# 高德地图应用净化；
# 由向晚重写维护；
# 更新时间: 20250324
# 规则链接: https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/Amap.js

[rewrite_local]
^https?:\/\/.*\.amap\.com\/ws\/faas\/amap-navigation\/card-service-route-plan\? url reject-dict
^https?:\/\/.*\.amap\.com\/ws\/boss\/order_web\/\w{8}_information url reject-200
^https?:\/\/.*\.amap\.com\/ws\/asa\/ads_attribution url reject
^https?:\/\/.*\.amap\.com\/ws\/shield\/scene\/recommend url reject-dict
^https?:\/\/.*\.amap\.com\/uploadimg\/\w+\.gif url reject-img
^https?://.*.amap.com/ws/valueadded/alimama/splash_screen url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/Amap.js
^https?://.*.amap.com/ws/message/notice/list url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/Amap.js
^https?://.*.amap.com/ws/shield/frogserver/aocs/updatable url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/Amap.js
^https?://.*.amap.com/ws/shield/search/nearbyrec_smart url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/Amap.js
^https?://.*.amap.com/ws/promotion-web/resource url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/Amap.js
^https?://.*.amap.com/ws/faas/amap-navigation/main-page url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/Amap.js
^https?://.*.amap.com/ws/msgbox/pull url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/Amap.js
^https?://.*.amap.com/ws/shield/dsp/profile/index/nodefaas url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/Amap.js
^https?://.*.amap.com/ws/shield/search/new_hotword url script-response-body https://raw.githubusercontent.com/XiangwanGuan/Shadowrocket/main/Rewrite/JavaScript/Amap.js

[mitm]
hostname = *.amap.com
*/

var obj = JSON.parse($response.body);
let modified = false;
if ($request.url.includes("search/nearbyrec_smart")) {
    let fieldsToRemove = ["coupon", "scene", "activity", "commodity_rec", "operation_activity"];
    if (obj.data) {
        for (let field of fieldsToRemove) {
            delete obj.data[field];
        }
        if (Array.isArray(obj.data.modules)) {
            obj.data.modules = obj.data.modules.filter(module => 
                !fieldsToRemove.includes(module.name)
            );
        }
        modified = true;
    }
} else if ($request.url.includes("valueadded/alimama/splash_screen")) {
    if (obj.data?.ad) {
        for (let ad of obj.data.ad) {
            if (ad.set?.setting) {
                ad.set.setting.display_time = 0;
            }
            if (Array.isArray(ad.creative)) {
                for (let creative of ad.creative) {
                    creative.start_time = 2240150400;
                    creative.end_time = 2240150400;
                }
            }
        }
        modified = true;
    }
} else if ($request.url.includes("faas/amap-navigation/main-page")) {
    if (Array.isArray(obj.data?.cardList)) {
        const allowedCards = new Set(["LoginCard", "FrequentLocation"]);
        obj.data.cardList = obj.data.cardList.filter(a => allowedCards.has(a.dataType));
    }
    if (obj.data?.pull3?.msgs) obj.data.pull3.msgs = [];
    if (obj.data?.business_position) obj.data.business_position = [];
    if (obj.data?.mapBizList) obj.data.mapBizList = [];
    modified = true;
} else if ($request.url.includes("profile/index/node")) {
    delete obj.data?.tipData;
    if (Array.isArray(obj.data?.cardList)) {
        const allowedCards = new Set(["MyOrderCard", "GdRecommendCard"]);
        obj.data.cardList = obj.data.cardList.filter(a => allowedCards.has(a.dataType));
    }
    modified = true;
} else if ($request.url.includes("new_hotword")) {
    if (obj.data?.header_hotword) obj.data.header_hotword = [];
    modified = true;
} else if ($request.url.includes("ws/promotion-web/resource")) {
    let resourceTypes = ["icon", "banner", "tips", "popup", "bubble", "other"];
    for (let type of resourceTypes) {
        if (obj.data?.[type]) obj.data[type] = [];
    }
    modified = true;
} else if ($request.url.includes("ws/msgbox/pull")) {
    if (obj.msgs) obj.msgs = [];
    if (obj.pull3?.msgs) obj.pull3.msgs = [];
    modified = true;
} else if ($request.url.includes("ws/message/notice/list")) {
    if (obj.data?.noticeList) obj.data.noticeList = [];
    modified = true;
} else if ($request.url.includes("ws/shield/frogserver/aocs")) {
    let keysToClear = [
        "gd_notch_logo",
        "home_business_position_config",
        "his_input_tip",
        "operation_layer"
    ];
    for (let key of keysToClear) {
        if (obj.data?.[key]) {
            obj.data[key] = { status: 1, version: "", value: "" };
        }
    }
    modified = true;
}
$done({ body: modified ? JSON.stringify(obj) : $response.body });
