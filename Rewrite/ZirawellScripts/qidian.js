/********************************
Qidian Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/Q/起点读书/rewrite/qidian.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/Q/起点读书/qidian.sgmodule
********************************/

let url = $request.url;
let method = $request.method;
if (!$response.body) {
    console.log(`$response.body为undefined:${url}`);
    $done({});
}

let body = JSON.parse($response.body);

const noticeTitle = "起点App脚本错误";
const getMethod = "GET";
const postMethod = "POST";

if (!body.Data) {
    console.log(`body:${$response.body}`);
    $notification.post(noticeTitle, "起点", "Data为空");
} else {
    if (url.includes("/deeplink/geturl") && method === getMethod) {
        //不跳转精选页
        if (body.Data.ActionUrl === 'QDReader://Bookstore') {
            body.Data = null;
        }
    } else if (url.includes("/dailyrecommend/getdailyrecommend") && method === getMethod) {
        //每日导读
        if (body.Data.Items?.length) {
            body.Data.Items = [];
        }
    } else if (url.includes("/user/getaccountpage") && method === getMethod) {
        //我的界面
        body.Data.Member = null;
        //福利中心
        if (body.Data.BenefitButtonList?.length) {
            body.Data.BenefitButtonList = [];
        }
        //我发布的
        if (body.Data.FunctionButtonList?.length) {
            body.Data.FunctionButtonList = [];
        }
        //帮助与客服
        if (body.Data.BottomButtonList?.length) {
            body.Data.BottomButtonList = [];
        }
        if (body.Data.AccountBalance?.Hints?.length) {
            body.Data.AccountBalance.Hints = [];
        }
    } else if (url.includes("/assembly/toolbar") && method === getMethod) {
        //活动按钮
        if (body.Data.Toolbar.Adv) {
            body.Data.Toolbar.Adv = {};
        }
    } else if (url.includes("/bookshelf/getHoverAdv") && method === getMethod) {
        //书架悬浮广告
        if (body.Data.ItemList?.length) {
            body.Data.ItemList = [];
        }
    } else if (url.includes("/client/getconf") && method === postMethod) {
        // 精选 和 发现 中间的活动配置
        if (!body.Data.ActivityPopup?.Data) {
            $notification.post(noticeTitle, "起点-getconf", "ActivityPopup/Data字段为空");
        } else {
            body.Data.ActivityPopup = null;
        }
        if (body.Data.WolfEye === 1) {
            // 使5.9.196版本 tcp强制走https
            body.Data.WolfEye = 0;
        }
        // QDReader://Bookshelf 书架右下角悬浮活动
        if (body.Data.ActivityIcon?.Type !== 0) {
            $notification.post(noticeTitle, "起点-getconf", "ActivityIcon/Type字段错误");
        } else {
            // 无活动icon的情况下为{"EndTime":0,"StartTime":0,"Type":0}
            if (body.Data.ActivityIcon.EndTime === 0) {
            } else {
                body.Data.ActivityIcon.StartTime = 0;
                body.Data.ActivityIcon.EndTime = 0;
                delete body.Data.ActivityIcon.Actionurl;
                delete body.Data.ActivityIcon.Icon;
            }
        }

        // 功能增强:搜索页可以搜索用户
        if (body.Data.EnableSearchUser === "1") {
        } else {
            body.Data.EnableSearchUser = "1";
        }

        // if (body.Data.hasOwnProperty('EnableClipboardReading')) {
        //     if (body.Data.EnableClipboardReading === 1) {
        //         body.Data.EnableClipboardReading = 0;
        //         console.log('不允许读取剪切板');
        //     } else {
        //         console.log('无需修改剪切板配置');
        //     }
        // } else {
        //     console.log("body:" + $response.body);
        //     $notification.post(notifiTitle, "起点-getconf", "EnableClipboardReading字段错误");
        // }
        // QDReader://UserCenter   我
        // QDReader://Bookshelf    书架
        // QDReader://Bookstore    精选
    } else {
        $notification.post(noticeTitle, "起点App路径/请求方法匹配错误:", method + "," + url);
    }
}
body = JSON.stringify(body);

$done({
    body
});

