const url = $request.url;
if (!$response.body) $done();
let body = $response.body;
let obj = JSON.parse(body);
if (url.includes("/UCenterConf")) {
  const showPattern = [
    "活动中心",
    "个性装扮",
    "我的已购",
    "超漫俱乐部",
  ];
  if (obj.data.confs?.length > 0) {
    let newConfs = [];
    for (let conf of obj.data.confs) {
      if (showPattern.includes(conf?.title)) {
        newConfs.push(conf);
      }
    }
    obj.data.confs = newConfs;
  }
  obj.data.show_welfare = false;
  obj.data.show_all_welfare = false;
} else if (url.includes("/GetInitInfo")) {
  if (obj?.data) {
    obj.data.had_follow_offcial = true;
  }
} else if (url.includes("/HomeFeed")) {
  if (obj?.data?.feeds?.length > 0) {
    obj.data.feeds = obj.data.feeds.filter(feed => !feed.image.includes("/mall/"));
    obj.data.feeds = obj.data.feeds.filter(feed => feed.inline_pv_card.bvid === "");
  }
} else if (url.includes("Comment/Main")) {
  if (typeof obj?.data?.metainfo !== "undefined") {
    let metainfo = JSON.parse(obj.data.metainfo);
    if (typeof metainfo?.top !== "undefined") {
      delete metainfo.top;
    }
    if (metainfo.top_replies?.length > 0) {
      metainfo.top_replies = [];
    }
    obj.data.metainfo = JSON.stringify(metainfo);
  }
}
body = JSON.stringify(obj);
$done({body});
