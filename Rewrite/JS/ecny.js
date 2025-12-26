const url = $request.url;
const header = $request.headers;
const headopt = header["Operation-Type"] || header["operation-type"];
const blockList = [
    "alipay.client.updateVersion",
    "alipay.client.switches.all.get.afterloginPb",
    "com.dcep.walletapp.api.securityEnvDetect"
];
if (blockList?.includes(headopt)) {
    $done({status: "HTTP/1.1 404 Not Found", body: "", headers: ""});
} else {
    $done({});
}
