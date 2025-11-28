/********************************
AMDC - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/#/广告联盟/rewrite/adUnion.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/#/广告联盟/adUnion.sgmodule
********************************/

const url = $request.url;
const header = $request.headers;
const ua = header["User-Agent"] || header["user-agent"];

if (url.includes("/amdc/mobileDispatch")) {
  // 高德地图
  if (ua.includes("AMapiPhone") ||
      // 阿里巴巴
      ua.includes("Alibaba") ||
      // 菜鸟
      ua.includes("Cainiao4iPhone") ||
      // 飞猪旅行
      ua.includes("%E9%A3%9E%E7%8C%AA%E6%97%85%E8%A1%8C") ||
      // 盒马
      ua.includes("Hema4iPhone") ||
      // 闲鱼
      //ua.includes("%E9%97%B2%E9%B1%BC") ||
      // 淘宝
      ua.includes("%E6%B7%98%E5%AE%9D")
  ) {
    $done({status: "HTTP/1.1 404 Not Found"});
  } else {
    $done({});
  }
} else {
  $done({});
}
