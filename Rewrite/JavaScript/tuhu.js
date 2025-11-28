/********************************
Tuhu Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/T/途虎养车/rewrite/tuhu.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/T/途虎养车/tuhu.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.indexOf("/homePage/getHomePageInfo") != -1) {
  const moduleIdDelete = [120, 810, 119, 819, 7, 852, 122, 801, 13, 688, 502, 668, 93, 53, 87, 650, 652];
  obj.data.cmsInfo.cmsList = obj.data.cmsInfo.cmsList.filter(item => !moduleIdDelete.includes(item.moduleId));
} else if (url.indexOf("/personalCenter/getCmsModuleList") != -1) {
  const idsToDelete = [90, 17, 13, 35, 10, 7];
  const mainTitlesToDelete = ["保养超值卡", "特价团购", "合作加盟", "抖音团购券兑换", "集团客户", "美团兑换", "评价途虎"];
  obj.data.cmsList = obj.data.cmsList.filter(item => !idsToDelete.includes(item.moduleTypeId) && !mainTitlesToDelete.includes(item.mainTitle));
} else if (url.indexOf("/shopTab/getModuleForC") != -1) {
  delete obj.data.bannersList;
  if (obj && obj.data && obj.data.cmsList) {
    obj.data.cmsList = obj.data.cmsList.reduce((acc, module) => {
      if (module.bottomMargin !== 12) {
        acc.push(module);
      }
      return acc;
    }, []);
  }
} else {
  $done({});
}
$done({body: JSON.stringify(obj)});
