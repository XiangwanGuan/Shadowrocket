/********************************
PeiYinXiu Remove Ads - Version 1.0 
Date - 2024-08-28 08:57:11
Checkout Source - https://kelee.one/Resource/Script/DubbingShow/DubbingShow_remove_ads.js
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/P/配音秀/rewrite/peiyinxiu.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/P/配音秀/peiyinxiu.sgmodule
********************************/

const url = $request.url;
const body = $response.body;

if (!body) $done({});

function removeDataWithKeyword(array) {
    if (Array.isArray(array)) {
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i].data && array[i].data.includes("金币哦")) {
                array.splice(i, 1);
            }
        }
    }
}

try {
    let obj = JSON.parse(body);

    if (url.includes("/Api/Film/GetConfigValue")) {
        if (obj.data && Array.isArray(obj.data)) {
            removeDataWithKeyword(obj.data);
        }
    }

    $done({body: JSON.stringify(obj)});
} catch (e) {
    console.error("JSON parsing error:", e);
    $done({});
}
