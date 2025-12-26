const url = $request.url;
const header = $response.headers;
const contType = header["Content-Type"];
const contLength = header["Content-Length"];
if ((contType == "image/jpeg" || contType == "image/jpg") && contLength > 100000) {
  $done({body: "", headers: "", status: "HTTP/1.1 204 No Content"});
} else {
  $done({});
}
