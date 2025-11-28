/********************************
MeituanWM Remove Ads - Version 1.0
Checkout Source - https://raw.githubusercontent.com/ZenmoFeiShi/Qx/refs/heads/main/MeiTuanNoAd.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/M/美团外卖/rewrite/meituanwm.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/M/美团外卖/meituanwm.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

// 微信小程序
if (url.includes("api/miniprogram")) {
    if (obj?.data) {
        if (Array.isArray(obj.data)) {
            obj.data = obj.data.filter(item => {
                if (item && item.name) {
                    return ["首页", "神券", "我的"].includes(item.name);
                }
                return false;
            });
        } else {
            if (obj.data.oneCentBuy) {
                delete obj.data.oneCentBuy;
            }
        }
    }
}
$done({body: JSON.stringify(obj)});
