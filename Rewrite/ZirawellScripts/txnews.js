/********************************
TencentNews Remove Ads - Version 1.1
Checkout Source - https://raw.githubusercontent.com/app2smile/rules/master/js/qq-news.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/T/腾讯新闻/rewrite/txnews.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/T/腾讯新闻/txnews.sgmodule
********************************/

let url = $request.url;
let method = $request.method;
if (!$response.body) $done({});

let body = JSON.parse($response.body);

if (method !== "POST") {
    $notification.post("腾讯新闻App脚本错误", "method错误:", method);
}

if (url.includes("gw/page/event_detail")) {
    removeAdList('event_detail');
} else if (url.includes("gw/page/channel_feed")) {
    removeAdList('channel_feed');
} else {
    if (!body.adList) {
        // 部分专题列表无广告,没有adList字段
    } else {
        body.adList = null;
    }
}

body = JSON.stringify(body);

$done({
    body
});

function removeAdList(name) {
    //console.log(`gw/page/${name}`);
    if (body.data.widget_list) {
        body.data.widget_list = body.data.widget_list.filter(item => {
            if (item.widget_type === 'ad_list') {
                //console.log('去除ad_list广告');
                return false;
            }
            return true;
        });
    } else {
        //console.log($response.body);
        $notification.post('腾讯新闻App脚本错误', name, '无widget_list字段');
    }
}
