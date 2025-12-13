/********************************
JavDB Remove Ads - Version 1.0
CheckOut Source - https://raw.githubusercontent.com/zirawell/R-Store/main/Res/Scripts/AntiAd/myBlockAds.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/J/JavDB/rewrite/javdb.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/J/JavDB/javdb.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
try {
    let obj = JSON.parse(body);
    if (url.includes("/ads")) {
        // 首页banner
        if (obj?.data?.ads?.index_top?.length > 0) {
            // 黑名单 移除http外链
            obj.data.ads.index_top = obj.data.ads.index_top.filter((i) => !/https?:\/\//.test(i?.url));
        }
        if (obj?.data?.ads?.web_magnets_top?.length > 0) {
            // 黑名单 移除http外链
            obj.data.ads.web_magnets_top = obj.data.ads.web_magnets_top.filter((i) => !/https?:\/\//.test(i?.url));
        }
    } else if (url.includes("/startup")) {
        // 开屏广告
        if (obj?.data?.splash_ad) {
            obj.data.splash_ad.enabled = false;
            obj.data.splash_ad.overtime = 0;
        }
        if (obj?.data?.feedback) {
            obj.data.feedback = {};
        }
        if (obj?.data?.settings?.NOTICE) {
            delete obj.data.settings.NOTICE;
        }
        if (obj?.data?.user) {
            obj.data.user.vip_expired_at = "2090-12-31T23:59:59.000+08:00";
            obj.data.user.is_vip = true;
        }
    } else if (url.includes("/users")) {
        // 伪装会员
        if (obj?.data?.user) {
            obj.data.user.vip_expired_at = "2090-12-31T23:59:59.000+08:00";
            obj.data.user.is_vip = true;
        }
    } else if (url.includes("/movies")) {
        // 详情页banner
        if (obj?.data?.show_vip_banner) {
            obj.data.show_vip_banner = false;
        }
    } else {
        $done({});
    }
    body = JSON.stringify(obj);
    $done({body});
} catch (err) {
    console.log(`JavDB, 出现异常: ` + err);
}
