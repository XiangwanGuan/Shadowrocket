/********************************
Zhuanzhuan Remove Ads - Version 2.0
Reference Source - https://raw.githubusercontent.com/fmz200/wool_scripts/main/Scripts/zhuanzhuan/zhuanzhuan.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/Z/转转/rewrite/zhuanzhuan.conf
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/Applet/Wechat/Z/转转/rewrite/zhuanzhuan.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/Z/转转/zhuanzhuan.sgmodule
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/Applet/Wechat/Z/转转/zhuanzhuan.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

// App去广告
if (url.indexOf("/transfer/getmyprofilev") != -1) {
    try {
        // 删除“测一测，你的手机能卖多少钱”
        delete obj.respData.bmNewInfo;
        obj.respData.itemGroupList = obj.respData.itemGroupList.map(itemGroup => {
            // 去掉“我的钱包”
            if (itemGroup.groupType === 15) {
                return null; // 将groupType为15的元素置为null
            } else if (itemGroup.groupType === 3) { // 推荐工具只保留4个
                itemGroup.itemList = itemGroup.itemList.slice(0, 4);
            }
            return itemGroup;
        }).filter(Boolean); // 过滤掉为null的元素
    } catch (error) {
        console.log('zhuanzhuan.js 脚本运行出现错误，部分内容未生效⚠️');
        console.log('错误信息：' + error.message);
    }
// 小程序去广告
} else if (url.indexOf("/zzlogic/mywxcontinenthomepage") != -1) {
    if (obj?.respData?.popWin) {
        delete obj.respData.popWin;
    }
    if (obj?.respData?.pendant) {
        delete obj.respData.pendant;
    }
    if (obj?.respData?.leftPendant) {
        delete obj.respData.leftPendant;
    }
    if (obj?.respData?.rightOpera) {
        delete obj.respData.rightOpera;
    }
    if (obj?.respData?.rightOpera2) {
        delete obj.respData.rightOpera2;
    }
} else {
    $done({});
}

$done({body: JSON.stringify(obj)});
