/********************************
Freshippo Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/H/盒马/rewrite/freshippo.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/H/盒马/freshippo.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);
// 首页
if (url.indexOf("queryindexpage") != -1) {
  const sceneTemplateId = [
    "509",
    "738"
  ];
  const spmcCode = [
    "waterfall",          //瀑布流
    //"channelsite",      //推荐坑位
    //"growthhacking",    //用户增长
    "category"            //分类

  ];
  /************* App *************/
  // 首页栏目优化
  if (obj?.data?.scenes?.length > 0) {
    obj.data.scenes = obj.data.scenes.filter(scene => sceneTemplateId.includes(scene.sceneTemplateId));
  }
  // 首页顶屏
  if (obj.data?.secondFloor) {
    obj.data.secondFloor = {};
  }

  /******** Wechat Applet ********/
  // 首页栏目优化
  if (obj?.data?.model?.scenes?.length > 0) {
    obj.data.model.scenes = obj.data.model.scenes.filter(scene => spmcCode.includes(scene.spmc));
  }
// 我的页
} else if (url.indexOf("querymypage") != -1) {
  const sceneTemplateId = [
    "906",
    "907",
    "198",
    "286",
    "431",
    "185",
    "230",
    "978",
    "709",
    "432",
    "403",
    "350"
  ];
  if (obj?.data?.scenes?.length > 0) {
    obj.data.scenes = obj.data.scenes.filter(scene => sceneTemplateId.includes(scene.sceneTemplateId));
  }

} else if (url.indexOf("querytabfeedstream") != -1) {
  // 我的页及购物车页推荐信息流
  if (obj?.data?.pageName && obj.data.pageName.includes("盒马商家")) {
    obj.data = {};
  }
  // 首页顶屏
  if (obj.data?.scenes?.length > 0) {
    obj.data.scenes = obj.data.scenes.filter(item => item.sceneType !== "100004");
  }
} else {
  $done({});
}
$done({body: JSON.stringify(obj)});

