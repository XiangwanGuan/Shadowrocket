let url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);
const search_hot = "/search/hot_keywords";
const recommend = "/resource_preload/list_h5_resource";
const adv = "/advertisement/v1";
if (url.indexOf(search_hot) != -1) {
  obj.data = [];
  body = JSON.stringify(obj);
  $done({body});
}
if (url.indexOf(recommend) != -1) {
  obj.data = obj.data.filter(item => item.filename !== "RecommendProduct.29e31893.js");
  body = JSON.stringify(obj);
  $done({body});
}
if (url.indexOf(adv) != -1) {
  obj.data = obj.data.filter(item => ![30,50,90,320,100,770].includes(item.region_code));
  obj.data = obj.data.map(item => {
    if (item.region_code === 2) {
      item.positions = item.positions.filter(position => ![890, 60, 2, 240, 2503].includes(position.component_code));
    }
    return item;
  });
  body = JSON.stringify(obj);
  $done({body});
}
if (url.indexOf("/search_box/products") != -1) {
  obj.data.feed_banner_cards = [];
  body = JSON.stringify(obj);
  $done({body});
}
if (url.indexOf("/order_settlement/detail") != -1) {
  obj.data.member_card_v2 = {};
  body = JSON.stringify(obj);
  $done({body});
}
if (url.indexOf("/orders/list") != -1) {
  if (obj && obj.data) {
    obj.data.forEach(item => {
      if (item) {
        delete item.just_in_time_comment;
      }
    });
  }
  body = JSON.stringify(obj);
  $done({body});
}
body = JSON.stringify(obj);
$done({body});
