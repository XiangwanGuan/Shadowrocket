/********************************
Xunlei Remove Ads - Version 1.0
Date - 2024-07-14 20:23:36
Checkout Source - https://kelee.one/Resource/Script/XunLei/XunLei_remove_ads.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/X/迅雷/rewrite/xunlei.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/X/迅雷/xunlei.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
var json = JSON.parse($response.body);

// 删除我的云笔记、迅雷浏览器、迅雷TV、金融专区、迅雷快鸟、隐私协议
if (json.values && json.values.me_config && json.values.me_config.common_service_list) {
    var commonServiceIndexes = [0, 1, 2, 3, 4, 5];
    commonServiceIndexes.forEach(function (index) {
        if (json.values.me_config.common_service_list[index]) {
            delete json.values.me_config.common_service_list[index];
        }
    });
}

// 删除迅雷小说
if (json.values && json.values.me_config && json.values.me_config.entrance_list) {
    var entranceIndexes = [7];
    entranceIndexes.forEach(function (index) {
        if (json.values.me_config.entrance_list[index]) {
            delete json.values.me_config.entrance_list[index];
        }
    });
}

// 删除我的页面横幅
if (json.values && json.values.me_config && json.values.me_config.banner_service_list) {
    delete json.values.me_config.banner_service_list;
}

$done({body: JSON.stringify(json)});
