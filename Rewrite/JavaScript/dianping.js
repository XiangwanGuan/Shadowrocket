/********************************
Dianping Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.
Works for version 11.28.3 and below. Version ID: 870198258

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/D/大众点评/rewrite/dianping.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/D/大众点评/dianping.sgmodule
********************************/

const url = $request.url;
if (url.includes("/dpmobile") || url.includes("/goodsawardpic")) {
  const header = $request.headers;
  const resp = {};
  const traceKey1 = Object.keys(header).find(key => /^m-(shark-)?traceid$/i.test(key));
  const traceKey2 = Object.keys(header).find(key => /^(ai|dt|al|u)$/i.test(key));
  const headopt1 = traceKey1 ? header[traceKey1] : null;
  const headopt2 = traceKey2 ? header[traceKey2] : null;
  if (headopt1 && !headopt2) {
    $done({body: "", headers: "", status: "HTTP/1.1 404 Not Found"});
  } else if (url.includes(".gif")) {
    const hexString = "47494638396101000100800000000000ffffff21f90401000000002c000000000100010000020144003b";
    const header = {};
    header["Content-Type"] = "image/gif";
    header["Content-length"] = 42;
    header["Connection"] = "close";
    $done({bodyBytes: hexStringToArrayBuffer(hexString),headers: header, status: "HTTP/1.1 200 OK"});
  } else {
    $done({});
  }
} else if (url.includes("/picassovc")) {
  if (!$response.body) $done({});
  let body = $response.body;
  body = body.replace(/function WedgetCard/g, 'function WedgetCard0');
  $done({body});
}


function debug(url,traceKey1,traceKey2,headopt1,headopt2) {
  console.log("url:" + url);
  console.log("traceKey1:" + traceKey1);
  console.log("traceKey2:" + traceKey2);
  console.log("headopt1:" + headopt1);
  console.log("headopt2:" + headopt2);
}

function hexStringToArrayBuffer(hexString) {
  const cleanHex = hexString.replace(/[^0-9A-Fa-f]/g, '');
  const buffer = new ArrayBuffer(cleanHex.length / 2);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < cleanHex.length; i += 2) {
      view[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
  }
  return buffer;
}
