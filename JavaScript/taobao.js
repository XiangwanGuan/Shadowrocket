/********************************
Taobao Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/T/淘宝/rewrite/taobao.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/T/淘宝/taobao.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
if (url.includes("mtop.taobao.cloudvideo.video.query")) {
  if (obj?.data?.duration) {
    obj.data.duration = "0";
  }
  if (obj?.data?.resources?.length > 0) {
    obj.data.resources = [];
  }
  if (obj?.data?.caches?.length > 0) {
    obj.data.caches = [];
  }
  if (obj?.data?.respTimeInMs) {
    obj.data.respTimeInMs = "3818332800000";
  }
} else if (url.includes("mtop.taobao.wireless.home.splash.awesome.get")) {
  if (obj?.data?.containers?.splash_home_base) {
    let splash = obj.data.containers.splash_home_base;
    if (splash?.base?.sections?.length > 0) {
      for (let items of splash.base.sections) {
        if ("taobao-splash" in items.bizData) {
          if (items?.bizData?.["taobao-splash"]?.data?.length > 0) {
            for (let item of items.bizData["taobao-splash"].data) {
              item.waitTime = "0";
              item.times = "0";
              item.hotStart = "false";
              item.haveVoice = "false";
              item.hideTBLogo = "false";
              item.enable4G = "false";
              item.coldStart = "false";
              item.waitTime = "0";
              item.startTime = "3818332800000";
              item.endTime = "3818419199000";
              item.gmtStart = "2090-12-31 00:00:00";
              item.gmtEnd = "2090-12-31 23:59:59";
              item.gmtStartMs = "3818332800000";
              item.gmtEndMs = "3818419199000";
              if (item?.imgUrl) {
                item.imgUrl = "";
              }
              if (item?.videoUrl) {
                item.videoUrl = "";
              }
            }
          }
        }
      }
    }
  }
} else if (url.includes("poplayer.template.alibaba.com")) {
  if (obj?.res?.images?.length > 0) {
    obj.res.images = [];
  }
  if (obj?.res?.videos?.length > 0) {
    obj.res.videos = [];
  }
  if (obj?.enable) {
    obj.enable = false;
  }
  if (obj?.mainRes?.images?.length > 0) {
    obj.mainRes.images = [];
  }
}
body = JSON.stringify(obj);
$done({body});
