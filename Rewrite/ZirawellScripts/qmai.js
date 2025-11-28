/********************************
Qmai Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/B/霸王茶姬/rewrite/chagee.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/C/陈香贵点单/rewrite/cxg.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/N/挪瓦咖啡/rewrite/nowwa.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/L/LINLEE林里柠檬茶/rewrite/linlee.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/B/霸王茶姬/chagee.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/C/陈香贵点单/cxg.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/N/挪瓦咖啡/nowwa.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/L/LINLEE林里柠檬茶/linlee.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);

if (obj.data?.length > 0) {
    obj.data = obj.data.filter(item => {
        item.detailInfo.popDayLimit = 0;
        item.detailInfo.adType = 4;
        item.detailInfo.closeButtonLocation = 0;
        item.detailInfo.skipButtonLocation = 0;
        item.detailInfo.adLandingInfoList = [{
            "id": "",
            "imgSource": null,
            "landingPageModel": "",
            "landingPageLink": null,
            "landingPageType": null,
            "landingGroup": null,
            "styleType": null,
            "orderIndex": 1,
            "landingPageText": null,
            "landingPageImg": "",
            "landingPageName": "",
            "messageModel": null
        }];
        return true;
    });
}

body = JSON.stringify(obj);
$done({body});
