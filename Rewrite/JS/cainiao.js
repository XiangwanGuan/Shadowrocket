const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);
if (url.includes(".guoguo.nbnetflow.ads.mshow")) {
  if (obj?.data) {
    const items = [
      "10",
      "498",
      "328",
      "366",
      "369",
      "615",
      "616",
      "727",
      "793",
      "954",
      "1275",
      "1308",
      "1316",
      "1332",
      "1340",
      "1391",
      "1410",
      "1428",
      "1524",
      "1525",
      "1638",
      "1910"
    ];
    for (let i of items) {
      if (obj.data?.[i]) {
        delete obj.data[i];
      }
    }
  }
} else if (url.includes(".guoguo.nbnetflow.ads.show")) {
  if (obj?.data?.result?.length > 0) {
    obj.data.result = obj.data.result.filter(
        (i) =>
            !(
                i?.materialContentMapper?.adItemDetail ||
                (i?.materialContentMapper?.bgImg && i?.materialContentMapper?.advRecGmtModifiedTime) ||
                ["common_header_banner", "entertainment", "interests", "kuaishou_banner"]?.includes(
                    i?.materialContentMapper?.group_id
                ) ||
                ["29338", "29339", "32103", "33927", "36649"]?.includes(i?.id)
            )
    );
    for (let i of obj.data.result) {
      if (i?.materialContentMapper?.show_tips_content) {
        i.materialContentMapper.show_tips_content = "";
      }
    }
  }
} else if (url.includes(".nbfriend.message.conversation.list")) {
  if (obj?.data?.data?.length > 0) {
    obj.data.data = obj.data.data.filter((i) => i?.conversationId?.includes("logistic_message"));
  }
} else if (url.includes(".nbpresentation.pickup.empty.page.get")) {
  if (obj?.data?.result) {
    let ggContent = obj.data.result.content;
    if (ggContent?.middle?.length > 0) {
      ggContent.middle = ggContent.middle.filter(
          (i) =>
              ![
                "guoguo_pickup_empty_page_relation_add",
                "guoguo_pickup_helper_feedback",
                "guoguo_pickup_helper_tip_view"
              ]?.includes(i?.template?.name)
      );
    }
  }
} else if (url.includes(".nbpresentation.protocol.homepage.get")) {
  if (obj?.data?.result?.dataList?.length > 0) {
    let newLists = [];
    for (let item of obj.data.result.dataList) {
      if (item?.type?.includes("kingkong")) {
        if (item?.bizData?.items?.length > 0) {
          for (let i of item.bizData.items) {
            i.rightIcon = null;
            i.bubbleText = null;
          }
        }
      } else if (item?.type?.includes("icons_scroll")) {
        if (item?.bizData?.items?.length > 0) {
          let newBizs = [];
          for (let i of item.bizData.items) {
            const lists = [
              "618cjhb",
              "bgxq",
              "cncy",
              "cngy",
              "cngreen",
              "cnhs",
              "dtxb",
              "gjjf",
              "jkymd",
              "ljjq",
              "ttlhb",
              "xybg"
            ];
            if (lists?.includes(i?.key)) {
              continue;
            }
            newBizs.push(i);
          }
          item.bizData.items = newBizs;
          for (let i of item.bizData.items) {
            i.rightIcon = null;
            i.bubbleText = null;
          }
        }
      } else if (item?.type?.includes("banner_area")) {
        continue;
      } else if (item?.type?.includes("promotion")) {
        continue;
      }
      newLists.push(item);
    }
    obj.data.result.dataList = newLists;
  }
}
$done({body: JSON.stringify(obj)});
