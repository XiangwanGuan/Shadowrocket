const url = $request.url;
if (!$response.body) $done({});
let body = $response.body;
body = body.replace(/!function (e, t)/g, '!function0 (e, t)');
$done({body});
