const url = $request.url;
const resp = {};
const header = $request.headers;
const proc = header["procedure"];
const blockList = [
  "queryOpenScreenAd",
  "hasUpgrade",
  "getLocalHomePage",
  "getExternalHomePage",
  "queryImportantList",
];
if (blockList.includes(proc)) {
  resp.headers = $request.headers;
  $done(resp);
} else {
  $done({});
}
