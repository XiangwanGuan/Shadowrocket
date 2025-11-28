/********************************
BabyTree Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/B/宝宝树/rewrite/babytree.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/B/宝宝树/babytree.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
if (url.includes("/api/app_index/get_app_tab")) {
	if (obj?.data.selected_list?.length > 0) {
		let tabs = [];
		const items = [
			"首页",
			"消息",
			"我",
		];
		for (let tab of obj.data.selected_list) {
			if (items?.includes(tab?.name)) {
				tabs.push(tab);
			}
		}
		obj.data.selected_list = tabs;
	}
} else if (url.includes("/api/cms_column")) {
	if (obj?.data.list?.length > 0) {
		obj.data.bucket_id = '';
		obj.data.test_id = '';
		obj.data.log_content = '';
		obj.data.list = [];
	}
}
body = JSON.stringify(obj);
$done({body});
