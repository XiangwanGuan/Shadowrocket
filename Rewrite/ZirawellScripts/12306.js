/********************************
12306 Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/0-9/12306/rewrite/12306.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/0-9/12306/12306.sgmodule
********************************/

const url = $request.url;
const header = $request.headers;
const headopt = header["Operation-Type"] || header["operation-type"];

const blockList = [
  // "com.cars.otsmobile.bangbangSafe.deciveInfo", // 设备序列号
  // "com.cars.otsmobile.checkLoginStatus", // 登录信息
  // "com.cars.otsmobile.city",
  // "com.cars.otsmobile.initCountry",
  // "com.cars.otsmobile.initNewSysCache",
  // "com.cars.otsmobile.initProvince",
  //"com.cars.otsmobile.integration.activityBanner", // 活动横幅
  "com.cars.otsmobile.memberInfo.getMemberQa", // 铁路会员 常见问题
  // "com.cars.otsmobile.memberInfo.integrationHomeInit", // 铁路会员 会员信息
  // "com.cars.otsmobile.newHomePage.getWeatherByStationCode", // 天气信息
  "com.cars.otsmobile.newHomePage.initData", // 热门资讯
  "com.cars.otsmobile.newHomePageBussData" // 商品信息流
  // "com.cars.otsmobile.newHomePageRefresh",
  // "com.cars.otsmobile.travelPage.initData", // 出行服务
];

if (blockList?.includes(headopt)) {
  $done({status: "HTTP/1.1 204 No Content"});
} else {
  $done({});
}
