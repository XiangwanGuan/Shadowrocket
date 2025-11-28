/********************************
DDXQ Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/D/叮咚买菜/rewrite/ddxq.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/D/叮咚买菜/ddxq.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
// 底部状态栏去除AI及右下侧边广告
if (url.includes("/homeApi/bottomNavi")) {
	if (obj.data?.adId) {
		delete obj.data.adId;
	}
	if (obj.data?.bottom_list?.length > 0) {
		obj.data.bottom_list = obj.data.bottom_list.filter(item => item.type !== 'eatwhat');
	}
// 首页推荐流优化
} else if (url.includes("/homeApi/homeFlowDetail")) {
	if (obj.data?.list?.length > 0) {
		obj.data.list = obj.data.list.map(item => {
            if (item.multi_advertise_data_list?.length > 0) {
                return null;
            } else if (item.small_image?.includes("ddfs-public.ddimg.mobi")) {
                return null;
            } else if (item.ads?.length > 0) {
                return null;
            }
            return item;
        }).filter(Boolean);
	}
// 右下角AI角标
} else if (url.includes("/tool/getConfig")) {
	if (obj.data?.ai_enter_config){
		delete obj.data.ai_enter_config;
	}
// 我的页-营销栏及工具栏简化
} else if (url.includes("/user/queryMyPage")) {
	if (obj.data?.advertList?.length > 0) {
		obj.data.advertList = obj.data.advertList.filter(e => e.title?.match(/福利中心|叮咚榜单|查添加剂|好货百科/));
	}
	if (obj.data?.links?.length > 0) {
		obj.data.links.splice(10);
	}
}
body = JSON.stringify(obj);
$done({body});
