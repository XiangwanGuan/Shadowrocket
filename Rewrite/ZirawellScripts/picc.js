/********************************
Picc Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/Z/中国人保/rewrite/picc.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/Z/中国人保/picc.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);

const actions = {
  'homeInit': () => {
    obj.data.startupPage = {};
    obj.data.templates = obj.data.templates.filter(e => !e.name?.match(/主轮播图|保险推荐|专享|腰封轮播图|浮标配置|二楼营销位|首页主题/));
  },
  'myPageConfigList': () => {
    if (obj?.data?.YFList) {
      obj.data.YFList = [];
    }
  }
};

const actionKey = Object.keys(actions).find(key => url.includes(key));
actions[actionKey]?.();

$done({body: JSON.stringify(obj)});
