/********************************
Foliday Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/F/复游会/rewrite/foliday.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/F/复游会/foliday.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;

if (url.includes("getPageComponents")) {
    let obj = JSON.parse(body);
    if (obj?.data?.pageComponents?.length > 0) {
        obj.data.pageComponents = obj.data.pageComponents.filter(
            (i) =>
                ![
                    "TCMP_home_followingadvertising",   // TCMP小程序首页底部广告
                ]?.includes(i?.componentCode)
        );
    }
    body = JSON.stringify(obj);
}

$done({body});
