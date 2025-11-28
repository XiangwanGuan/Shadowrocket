/********************************
SMZDM Remove Ads - Version 1.0
Checkout Source -
1.https://raw.githubusercontent.com/ZenmoFeiShi/Qx/main/Smzdm.js
2.https://raw.githubusercontent.com/fmz200/wool_scripts/main/Scripts/smzdm/smzdm_ads.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/S/什么值得买/rewrite/smzdm.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/S/什么值得买/smzdm.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);

const fixPos = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].pos = i + 1;
    }
};

if (url.includes("/home") && url.includes("homepage-api")) {
    const recursivelyFilterByCellType = (data) => {
        if (Array.isArray(data)) {
            return data.map(item => recursivelyFilterByCellType(item)).filter(Boolean);
        } else if (typeof data === 'object') {
            if (data['cell_type'] === '23008' || data['cell_type'] === '23005' || data['cell_type'] === '23024') {
                return null;
            } else {
                for (const key in data) {
                    data[key] = recursivelyFilterByCellType(data[key]);
                }
                return data;
            }
        }
        return data;
    };

    obj.data = recursivelyFilterByCellType(obj.data);
}

if (url.includes("/vip")) {
    if (obj?.data?.big_banner) {
        delete obj.data.big_banner;
    }
    if (obj?.data?.top_banner) {
        delete obj.data.top_banner;
    }
    if (obj?.data?.yaoqingshaiwu) {
        delete obj.data.yaoqingshaiwu;
    }
    // 个人中心广告
    if (url.includes("/creator_user_center")) {
        obj.data = {};
    } else if (url.includes("/bottom_card_list")) {
        if (obj?.data?.rows) {
            delete obj.data.rows;
        }
    }
} else if (url.includes("/util/update")) {
    if (obj?.data?.ad_black_list) {
        delete obj.data.ad_black_list;
    }
    // 弹窗图片广告
    if (obj?.data?.operation_float) {
        delete obj.data.operation_float;
    }
    if (obj?.data?.haojia_widget) {
        delete obj.data.haojia_widget;
    }
} else if (url.includes("/util/loading")) {
    if (obj?.data) {
        delete obj.data;
    }
} else if (url.includes("/home/list")) {
    if (obj?.data?.banner_v2) {
        delete obj.data.banner_v2;
    }
} else if (url.includes("/home") && url.includes("homepage-api")) {
    obj.data.component = obj.data.component.filter((item) =>
        item.zz_type === "circular_banner" || item.zz_type === "fixed_banner" || item.zz_type === "filter" || item.zz_type === "list"
    );
    fixPos(obj.data.component);
    if (obj?.data?.functions) {
        obj.data.functions = obj.data.functions.filter((item) => item.type === "message");
        fixPos(obj.data.functions);
    }
} else if (url.includes("/publish/get_bubble")) {
    if (obj?.data) {
        delete obj.data;
    }
} else if (url.includes("/app/home")) {
    if (obj?.data) {
        obj.data = obj.data.filter((item) => item.id === "40" || item.id === "20");
        fixPos(obj.data);
    }
} else if (url.includes("/detail_modul/user_related_modul")) {
    // 详情页广告
    if (obj?.data?.super_coupon) {
        delete obj.data.super_coupon;
    }
} else if (url.includes("/ranking_list/articles") || url.includes("/sou/list_v")) {
    // 排行榜广告&搜索结果广告
    obj.data.rows = obj.data.rows.filter(item => item.model_type !== "ads");
} else if (url.includes("/sou/filter/tags/hot_tags")) {
    // 搜索热榜广告
    obj.data.search_hot.home = obj.data.search_hot.home.filter(item => item.pos);
    if (obj?.data?.tonglan) {
        delete obj.data.tonglan;
    }
    if (obj?.data?.hongbao) {
        delete obj.data.hongbao;
    }
} else if (url.includes("/ajax_app/ajax_get_footer_list")) {
    if (obj?.data?.activity_banner?.hot_widget) {
        obj.data.activity_banner.hot_widget.forEach(widget => {
            if (widget.pic_url) {
                delete widget.pic_url;
            }
        });
    }
}
if (obj?.data?.services) {
    obj.data.services = obj.data.services.filter((item) => item.type === "articel_manage" || item.type === "199794" || item.type === "199796");
    fixPos(obj.data.services);
}
if (obj?.data?.widget) {
    delete obj.data.widget;
}
if (obj?.data?.operation_float_screen) {
    delete obj.data.operation_float_screen;
}
if (obj?.data?.rows?.length > 0) {
    obj.data.rows = obj.data.rows.filter(
        (i) => !(i?.hasOwnProperty("ad_banner_id") || ["ad_campaign_id_", "ad_campaign_name", "abs_position"]?.includes(i?.ad))
    );
}

body = JSON.stringify(obj);
$done({body});
