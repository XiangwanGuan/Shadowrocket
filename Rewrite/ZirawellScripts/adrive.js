/********************************
Adrive Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/A/阿里云盘/rewrite/adrive.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/A/阿里云盘/adrive.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/users/onboard_list")) {
    if (obj.result?.length > 0) {
        obj.result = obj.result.filter(
            (i) =>
                ![
                    "backup_list_under_mydevice_banner",
                    "backup_top_banner",
                    "home_top_banner",
                    "resource_top_banner"
                ].includes(i?.anchor)
        );
    }
} else if (url.includes("/users/home/news")) {
    if (obj.result?.length > 0) {
        obj.result = obj.result.filter((i) => !i?.code?.includes("productUpdate"));
    }
} else if (url.includes("/users/home/widgets")) {
    const item = [
        "banners", // 顶部奖励
        "coreFeatures", // 横版图标
        "mainBackup", // 手机备份
        "minorBackup", // 备份设备列表
        "signIn" // 签到
    ];
    item.forEach((i) => {
        delete obj[i];
    });
}

$done({body: JSON.stringify(obj)});
