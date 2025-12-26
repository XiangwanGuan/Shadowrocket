if (!$request.body) $done({});
let body = JSON.parse($request.body);
const action = body.action;
const blockIds = [
	"ydmbintegral.ydintegral.integral.event.sign",
	"ydmbaccount.ydaccount.queryAdinfosByGateway",
	"ydmbcommon.ydcommon.ad.guide.config",
	"ydmbcard.ydcard.activity.queryPopularize"
];
if (blockIds.includes(action)) {
	$done({status: "HTTP/1.1 404 Not Found", body: "", headers: ""});
} else {
	$done({});
}
