const url = $request.url;
const header = $request.headers;
const headopt = header["Operation-Type"] || header["operation-type"];
const blockList = [
  "com.cars.otsmobile.memberInfo.getMemberQa",
  "com.cars.otsmobile.newHomePage.initData",
  "com.cars.otsmobile.newHomePageBussData"
];
if (blockList?.includes(headopt)) {
  $done({status: "HTTP/1.1 204 No Content"});
} else {
  $done({});
}
