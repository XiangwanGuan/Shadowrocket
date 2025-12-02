/********************************
Meituan Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/M/美团/rewrite/meituan.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/M/美团/meituan.sgmodule
********************************/

const url = $request.url;
const iconRegex1 = /\.(gif|jpg|webp|png)@(132w_96h|186w_135h|1284w|250w_0h|400w_0h|700w_0h|1200w_0h)/;
const iconRegex2 = /%(4088h_88w|40115h_115w|4047h_189w|40157h_189w)_1e_1l\.(gif|jpg|webp|png)/;
const urlRegex = /https?:\/\/p\d\.meituan\.net\/linglong\/\w+\.(gif|jpg|webp|png)$/;
var removeFlag = true;
if (url.includes("/linglong")) {
    if (urlRegex.test(url)) {
        const header = $request.headers;
        const traceKey = Object.keys(header).find(key => /^(ai|dt|al|u)$/i.test(key));
        removeFlag = traceKey ? true : false;
        // 针对会员权益图片的修复
        if (url.endsWith("@1sc") {
            removeFlag = false;
        }
    } else {
        const dimStr = extractAfterAt(url);
        if ("-1" != dimStr && compareDimensions(dimStr)) {
            removeFlag = false;
        }
        if (url.match(iconRegex1) || url.match(iconRegex2)) {
            removeFlag = false;
        }
    }
    
    if (removeFlag) {
        $done({body: "", headers: "", status: "HTTP/1.1 204 No Content"});
    } else {
        $done({});
    }
}


function extractAfterAt(str) {
    const atIndex = str.lastIndexOf("@");
    if (atIndex === -1) {
        return "-1";
    }
    return str.substring(atIndex + 1);
}

function compareDimensions(str) {
    const widthMatch = str.match(/(\d+)w/);
    const width = widthMatch ? parseInt(widthMatch[1]) : null;
    const heightMatch = str.match(/(\d+)h/);
    const height = heightMatch ? parseInt(heightMatch[1]) : null;
    if (width == null || height == null) {
        return false;
    }
    return width == height || Math.abs(width - height) === 1;;
}