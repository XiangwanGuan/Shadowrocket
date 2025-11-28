/********************************
XiaoHeiHe Remove Ads - Version 1.0
Date - 2024-07-11 07:57:09
Checkout Source - https://kelee.one/Resource/Script/XiaoHeiHe/XiaoHeiHe_remove_ads.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/X/小黑盒/rewrite/xiaoheihe.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/X/小黑盒/xiaoheihe.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
var json = JSON.parse($response.body);

// 移除热点板块信息流广告
if (json.result && json.result.links && Array.isArray(json.result.links)) {
    json.result.links.forEach(function (link) {
        if (link.content_type === 27) {
            var propertiesToDelete = [
                "title",
                "ad_pm",
                "img_gif",
                "idea_id",
                "ad_report",
                "label",
                "source",
                "intranet_only",
                "ad_cm",
                "content_type",
                "protocol",
                "img",
                "ad_ratio"
            ];

            propertiesToDelete.forEach(function (prop) {
                delete link[prop];
            });
        }
    });
}

$done({body: JSON.stringify(json)});
