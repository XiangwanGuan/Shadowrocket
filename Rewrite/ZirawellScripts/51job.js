/********************************
51Job Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/Q/前程无忧51job/rewrite/51job.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/Q/前程无忧51job/51job.sgmodule
********************************/

const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
let obj = JSON.parse(body);
// 首页信息流净化
if (url.includes("job-tab-dynamic")) {
	if (obj.resultbody?.adsTabFeeds && obj.resultbody.adsTabFeeds.length > 0) {
		delete obj.resultbody.adsTabFeeds;
	}
// 我的页净化
} else if (url.includes("my-page")) {
	// VIP开通栏
	if (obj.resultbody?.vipInfo) {
		obj.resultbody.vipInfo.isVip = true;
	}
	if (obj.resultbody?.rightsGuidanceCopy) {
		delete obj.resultbody.rightsGuidanceCopy;
	}
	// 求职工具
	if (obj.resultbody?.jobToolInfoList && obj.resultbody.jobToolInfoList.length > 0) {
		delete obj.resultbody.jobToolInfoList;
	}
}
body = JSON.stringify(obj);
$done({body});
