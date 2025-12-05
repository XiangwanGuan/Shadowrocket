//  2025-05-24
//  树先生
//  当前文件内容仅供个人学习和研究使用，若使用过程中发生任何问题概不负责

let url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

if (url.includes("/gw/mtop.taobao.idlehome.home.nextfresh")) {
  // 可能存在的首页标签
  delete obj.data.widgetReturnDO;
  // 删除banner图
  delete obj.data.bannerReturnDO;
  // 信息流广告
  if (obj.data?.sections) {
    obj.data.sections = obj.data.sections.filter(section => {
      return !(section.data && (section.data.bizType === "AD" || section.data.bizType === "homepage"));
    });

    let excludeNames = ['fish_home_yunying_card_d3', 'idlefish_seafood_market', 'fish_home_chat_room'];
    obj.data.sections = obj.data.sections.filter(function(section) {  
      return !excludeNames.includes(section.template.name);  
    });
  }
  // 首页新的顶部图标菜单
  obj.data.homeTopList = [];
}

if (url.includes("/gw/mtop.taobao.idle.local.home")) {
  if (obj.data?.sections) {
    obj.data.sections = obj.data.sections.filter(section => {
      return !(section.data && section.data.bizType === "AD");
    });
  }
}

if (url.includes("/gw/mtop.taobao.idle.home.whale.modulet")) {
  delete obj.data.container.sections;
}

if (url.includes("/gw/mtop.taobao.idlemtopsearch.search.shade") || url.includes("/gw/mtop.taobao.idle.user.strategy.list")) {
  delete obj.data;
}

if (url.includes("/mtop.idle.user.page.my.adapter")) {
  //  "2": tips横幅 "3": 我买到的；"6"、"8": 底部图标菜单；"5": 横幅；"4":回收横幅广告
  const indexArr = ["2", "5", "6", "8"];
  obj.data.container.sections = obj.data.container.sections.filter(item => !indexArr.includes(item.index));

  //  "4"索引有多个元素，包含正常内容，需要特殊判断
  obj.data.container.sections = obj.data.container.sections.filter(section => 
    !(section.index === "4" && section.template.name === 'my_fy25_recycle')
  );

  obj.data.ability = [];

  //  个人等级
  obj.data.container.sections.forEach(section => {
    if (section.index === "1") {
        delete section.item.level;
    }
    if (section.index === "4") {
      if (section?.item?.shopTips !== undefined) {
       section.item.shopTips = {};
      }
    }
  });
  
  //  处理简历菜单item.tool.exContent.tools[]:13：我的帖子；1：安全中心；2：闲鱼体验官；20：闲鱼公约；34：宝贝上首页；14：借钱；11：淘宝转卖；26：简历认证
  //obj.data.container.sections = obj.data.container.sections.filter(item => item.index !== "5");
  obj.data.container.sections.forEach(section => {
    if (section.index === "7") {
      //section.item.tool.exContent.tools = section.item.tool.exContent.tools.filter(item => tools.includes(item.exContent.toolId));

      // 定义要筛选的 toolId 列表
      const targetToolIds = [20, 1, 13, 26];
      // 筛选并保留一层数组结构
      const filteredTools = [
          section.item.tool.exContent.tools.flatMap(subArray => 
              subArray.filter(tool => targetToolIds.includes(tool.exContent.toolId))
          )
      ];
      
      // 将筛选后的工具列表更新到 section 中
      section.item.tool.exContent.tools = filteredTools;
      
    }
  });
}

if (url.includes("/mtop.taobao.idlehome.home.circle.list")) {
  // 过滤 circleList 数组，只保留 circleId 为 1 和 2 的元素
  //obj.data.circleList = obj.data.circleList.filter(circle => circle.circleId === "1" || circle.circleId === "2");
  if (obj.data && obj.data.circleList) {
        obj.data.circleList.forEach(circle => {
            if (circle.showType) {
                circle.showType = "text";
            }
            if (circle.showInfo && circle.showInfo.titleImage) {
                delete circle.showInfo.titleImage;
            }
            if (circle.circleId === "2") {
              circle.showInfo.atmosphereImageUrl = "";
            }
        });
    }
}

//if (url.indexOf("/mtop.taobao.idlemtopsearch.search") != -1) {
  //obj.data.resultList = obj.data.resultList.filter(item => {  
    // 过滤掉表示为广告的项
    //return item.data.item.main.exContent.isAliMaMaAD !== "true";  
  //});
//}

// 过滤掉搜索结果表示为广告的项
if (url.includes("/gw/mtop.taobao.idlemtopsearch.search")) {
    if (obj.data && Array.isArray(obj.data.resultList)) {  
      // 使用filter方法遍历resultList数组，并过滤掉不符合条件的元素  
      obj.data.resultList = obj.data.resultList.filter(element => {  
          // 检查当前元素是否包含所需的嵌套属性  
          if (element.data && element.data.item && element.data.item.main && element.data.item.main.exContent) {  
              // 检查isAliMaMaAD的值  
              const isAliMaMaAD = element.data.item.main.exContent.isAliMaMaAD;  
              // 如果isAliMaMaAD是true或"true"，则返回false以过滤掉这个元素  
              return !(isAliMaMaAD === true || isAliMaMaAD === "true");  
          }  
          // 如果没有所需的嵌套属性，也可以返回true来保留这个元素（如果你希望的话）  
          // 或者你可以选择返回false来过滤掉没有这些属性的元素  
          // 这里我们假设没有这些属性的元素应该被保留  
          return true;  
      }); 
      
      //obj.data.resultList = obj.data.resultList.filter(element => {  
        //return element.data.template.name !== "idlefish_search_card_category_select";
      //});
      
      const excludeNames = ["idlefish_search_card_category_select", "idlefish_search_spu_market_publish"];
      obj.data.resultList = obj.data.resultList.filter(element => {
        return !excludeNames.includes(element.data.template.name);
      });
    }
    
    if (obj.data?.resultPrefixBar) {
      delete obj.data.resultPrefixBar;
    }
    
    if (obj.data?.topList) {
      obj.data.topList = [];
    }
}


if (url.includes("/mtop.taobao.idle.group.myself.banner")) {
    obj.data.bannerList = [];
}


if (url.includes("/mtop.taobao.idle.playboy.recommend")) {
    obj.data.recommends = [];
    obj.data.items = [];
    obj.data.next = false;
    //obj.ret = ["fail::"];
}


if (url.includes("/mtop.taobao.idle.item.recommend.list")) {
    //obj.data.windCard.itemList = "";
    obj.data.cardList = [];
}

if (url.includes("/mtop.taobao.idle.local.nearby.itemdetail.enter/1.0")) {
   obj.data.targetUrl = "";
   obj.data.trackParams.itemIds = "";
   obj.data.nearbyItemInfoList = [];
   obj.data.name = "";
   obj.data.desc = "";
   obj.data.poiName = "";
}

if (url.includes("/gw/mtop.taobao.idlemessage.session.sync/3.0")) {
    obj.data.sessions = obj.data.sessions.filter(session => session.session.sessionType !== "25");
}

if (url.includes("idle.fun.follow.feed.list")) {
    obj.data.sections = obj.data.sections.filter(session => session.cardType === 9999);
    obj.data.sections.forEach(section => {
    if (section.cardData?.subText) {
        section.cardData.subText = "";
    }
  });
}

if (url.includes("idle.fun.follow.often.visit")) {
    obj.data.sections = [];
}

if (url.includes("idle.circle.myself.banner/1.0")) {
    obj.data.bannerList = [];
}

if (url.includes("idle.circle.visited/1.0")) {
    obj.data.visitedCircleList = [];
}

if (url.includes("follow.recommend.feed.list")) {
  //if (obj.data?.sections) {
    //obj.data.sections = obj.data.sections.filter(section => {
      //return section.cardData.userInfo.attention;
    //});
  //}
  obj.data.needDecryptKeys = [];
  obj.data.nextPage = false;
  obj.data.fitRecommendAB = true;
}

if (url.includes("/mtop.taobao.idle.local.flow.plat.section")) {
  const keyArr = ["fish_home_activity_enter_cardV1"];
  obj.data.data.components = obj.data.data.components.filter(item => !keyArr.includes(item.key));
}

  
body = JSON.stringify(obj);
$done({body});
