const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);
if (url.includes("functionId=deliverLayer") || url.includes("functionId=orderTrackBusiness")) {
  if (obj?.bannerInfo) {
    delete obj.bannerInfo;
  }
  if (obj?.floors?.length > 0) {
    obj.floors = obj.floors.filter((i) => !["banner", "jdDeliveryBanner"]?.includes(i?.mId));
  }
} else if (url.includes("functionId=getTabHomeInfo")) {
  if (obj?.result?.iconInfo) {
    delete obj.result.iconInfo;
  }
  if (obj?.result?.roofTop) {
    delete obj.result.roofTop;
  }
} else if (url.includes("functionId=myOrderInfo")) {
  if (obj?.floors?.length > 0) {
    let newFloors = [];
    for (let floor of obj.floors) {
      if (["bannerFloor", "bpDynamicFloor", "plusFloor"]?.includes(floor?.mId)) {
        continue;
      } else {
        if (floor?.mId === "virtualServiceCenter") {
          if (floor?.data?.virtualServiceCenters?.length > 0) {
            let newItems = [];
            for (let item of floor.data.virtualServiceCenters) {
              if (item?.serviceList?.length > 0) {
                let newCards = [];
                for (let card of item.serviceList) {
                  if (card?.serviceTitle === "精选特惠") {
                    continue;
                  }
                  newCards.push(card);
                }
                item.serviceList = newCards;
              }
              newItems.push(item);
            }
            floor.data.virtualServiceCenters = newItems;
          }
        }
        if (floor?.mId === "customerServiceFloor") {
          if (floor?.data?.moreText) {
            delete floor.data.moreIcon;
            delete floor.data.moreIcon_dark;
            floor.data.moreText = " ";
          }
        }
        newFloors.push(floor);
      }
    }
    obj.floors = newFloors;
  }
} else if (url.includes("functionId=personinfoBusiness")) {
  if (obj?.floors?.length > 0) {
    let newFloors = [];
    for (let floor of obj.floors) {
      const items = [
        "bigSaleFloor",
        "buyOften",
        "newAttentionCard",
        "newBigSaleFloor",
        "newStyleAttentionCard",
        "newsFloor",
        "noticeFloor",
        "recommendfloor",
        "newCardFloor"
      ];
      if (items?.includes(floor?.mId)) {
        continue;
      } else {
        if (floor?.mId === "basefloorinfo") {
          if (floor?.data?.commonPopup) {
            delete floor.data.commonPopup;
          }
          if (floor?.data?.commonPopup_dynamic) {
            delete floor.data.commonPopup_dynamic;
          }
          if (floor?.data?.commonTips?.length > 0) {
            floor.data.commonTips = [];
          }
          if (floor?.data?.commonWindows?.length > 0) {
            floor.data.commonWindows = [];
          }
          if (floor?.data?.floatLayer) {
            delete floor.data.floatLayer;
          }
        } else if (floor?.mId === "iconToolFloor") {
        } else if (floor?.mId === "orderIdFloor") {
          if (floor?.data?.commentRemindInfo?.infos?.length > 0) {
            floor.data.commentRemindInfo.infos = [];
          }
        } else if (floor?.mId === "userinfo") {
          if (floor?.data?.newPlusBlackCard) {
            delete floor.data.newPlusBlackCard;
          }
        }
        newFloors.push(floor);
      }
    }
    obj.floors = newFloors;
  }
  if (obj?.others?.floors?.length > 0) {
    let newFloors = [];
    for (let floor of obj.others.floors) {
      const items = [
        "bigSaleFloor",
        "buyOften",
        "newAttentionCard",
        "newBigSaleFloor",
        "newStyleAttentionCard",
        "newsFloor",
        "noticeFloor",
        "recommendfloor"
      ];
      if (items?.includes(floor?.mId)) {
        continue;
      } else {
        if (floor?.mId === "basefloorinfo") {
          if (floor?.data?.commonPopup) {
            delete floor.data.commonPopup;
          }
          if (floor?.data?.commonPopup_dynamic) {
            delete floor.data.commonPopup_dynamic;
          }
          if (floor?.data?.commonTips?.length > 0) {
            floor.data.commonTips = [];
          }
          if (floor?.data?.commonWindows?.length > 0) {
            floor.data.commonWindows = [];
          }
          if (floor?.data?.floatLayer) {
            delete floor.data.floatLayer;
          }
        } else if (floor?.mId === "iconToolFloor") {
        } else if (floor?.mId === "orderIdFloor") {
          if (floor?.data?.commentRemindInfo?.infos?.length > 0) {
            floor.data.commentRemindInfo.infos = [];
          }
        } else if (floor?.mId === "userinfo") {
          if (floor?.data?.newPlusBlackCard) {
            delete floor.data.newPlusBlackCard;
          }
        }
        newFloors.push(floor);
      }
    }
    obj.others.floors = newFloors;
  }
} else if (url.includes("functionId=start")) {
  if (obj?.images?.length > 0) {
    obj.images = [];
  }
  if (obj?.showTimesDaily) {
    obj.showTimesDaily = 0;
  }
} else if (url.includes("functionId=welcomeHome")) {
  if (obj?.floorList?.length > 0) {
    const delItems = [
      "bottomXview",
      "float",
      "photoCeiling",
      "ruleFloat",
      "searchIcon",
      "topRotate",
      "tabBarAtmosphere"
    ];
    obj.floorList = obj.floorList.filter((i) => !delItems?.includes(i?.type));
  }
  if (obj?.webViewFloorList?.length > 0) {
    obj.webViewFloorList = [];
  }
}
$done({body: JSON.stringify(obj)});
