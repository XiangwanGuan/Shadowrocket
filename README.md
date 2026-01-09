## [项目简介](#项目简介)
本[项目](https://github.com/XiangwanGuan/Shadowrocket)由[向晚](https://t.me/xiangwanguan)维护，提供[Shadowrocket](https://apps.apple.com/app/shadowrocket/id932747118)的[配置文件](#配置文件)与[融合模块](#融合模块)；  
如果此项目对您有帮助，欢迎给予Star；若有其他需求或问题，请提交Issues！  

---

### [重要声明](#重要声明)
**禁止在中国大陆的任何平台传播此项目！**  
**禁止将本项目中的任何内容用于违法活动或用于盈利目的！**  
**本项目仅供学习交流及测试，使用本项目中的内容所造成的一切后果，均由使用者承担！**  

---

### [配置文件](#配置文件)
使用加密的**DoH/DoT**解析域名，并加密转发未加密的DNS请求；  
**主流服务**、**AI平台**、**微信**和**电报**均已独立分流，保障访问稳定性；  
**国内**、**国外**的**媒体**及**规则**，使用独立分流策略，实现灵活控制；  

本项目使用的[规则集](https://github.com/XiangwanGuan/Shadowrocket/tree/main/Rules)源自[blackmatrix7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket)的仓库，[GeoLite2数据库](https://github.com/XiangwanGuan/Shadowrocket/tree/main/GeoLite2)源自[MaxMind](https://www.maxmind.com)提供的免费版本，**每日自动同步更新**；  

#### [基础配置](#基础配置)
[基础配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/Rules.conf)默认使用**首页节点**进行代理，配置轻量，不包含代理分组；  

[![一键安装 基础配置](https://img.shields.io/static/v1?label=一键安装&message=基础配置&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://xiangwanguan.github.io/Shadowrocket/Website/Redirect.html?url=shadowrocket://config/add/https://xiangwanguan.github.io/Shadowrocket/Release/Rules.conf)  

#### [完整配置](#完整配置)
[完整配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/RulesGroup.conf)基于[基础配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/Rules.conf)构建，内置代理分组：**港台日新美**，默认使用**首页节点**进行代理，可更自由的[修改分流](#修改分流)；  

[![一键安装 完整配置](https://img.shields.io/static/v1?label=一键安装&message=完整配置&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://xiangwanguan.github.io/Shadowrocket/Website/Redirect.html?url=shadowrocket://config/add/https://xiangwanguan.github.io/Shadowrocket/Release/RulesGroup.conf)  

#### [回国配置](#回国配置)
[回国配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/RulesBackCN.conf)基于[基础配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/Rules.conf)构建，适用于外国华侨使用，国内规则代理，其余规则直连；  
此配置需搭配**回国机场**使用，**不适合国内用户使用！**  

[![一键安装 回国配置](https://img.shields.io/static/v1?label=一键安装&message=回国配置&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://xiangwanguan.github.io/Shadowrocket/Website/Redirect.html?url=shadowrocket://config/add/https://xiangwanguan.github.io/Shadowrocket/Release/RulesBackCN.conf)  

#### [修改分流](#修改分流)
仅适用于包含**代理分组**的配置；  
打开Shadowrocket首页，下拉进入**代理分组**，选择你想要修改的**代理分组**，选择对应的**策略**即可；  

#### [更新提示](#更新提示)
如希望定期更新远程资源，且不希望自定义配置被覆盖，可点击**配置**-**编辑纯文本**，删除或注释**update-url**所在的行；  

---

### [融合模块](#融合模块)
使用须知：使用融合模块，**必须开启MitM**，教程参考下方的[推荐设置](#推荐设置)；  
如不希望本项目收集您的规则，请发表Issues，我会第一时间进行移除，谢谢！  

[融合模块](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/Module.sgmodule)由[向晚](https://t.me/xiangwanguan)基于[*@fmz200*](https://github.com/fmz200/wool_scripts) [*@QingRex*](https://github.com/QingRex/LoonKissSurge) [*@zirawell*](https://github.com/zirawell/R-Store) 的项目定制，随规则变化，不定期更新；  

[![一键安装 融合模块](https://img.shields.io/static/v1?label=一键安装&message=融合模块&color=grey&logo=googledocs&logoColor=white&labelColor=blue&messageColor=white)](https://xiangwanguan.github.io/Shadowrocket/Website/Redirect.html?url=shadowrocket://install?module=https://xiangwanguan.github.io/Shadowrocket/Release/Module.sgmodule)  

---

### [推荐设置](#推荐设置)
#### [证书模块](#证书模块)
如需使用[融合模块](#融合模块)来净化应用，**必须开启HTTPS解密**，否则模块将不能正常工作；  
建议添加**证书模块**，避免因配置变化导致HTTPS解密功能失效；  
证书信任之后，**请勿在设置中移除证书**，否则HTTPS解密功能将会失效；  

证书模块制作办法：  
**配置** > 点击**配置文件**的 **ⓘ图标** > **HTTPS解密** > **证书** > **生成新的CA证书** > **安装证书**；  
**系统设置** > **已下载描述文件** > **安装**；  
**系统设置** > **通用** > **关于本机** > **证书信任设置** > **启用**此证书的根证书完全信任；  
**配置** > **模块** > **新建模块** > **修改**并**保存为**以下内容：  
```ini
#!name = 证书模块
[MITM]
enable=true

# 请在"ca-passphrase="后面填写证书密码；
ca-passphrase=

# 请在"ca-p12="后面粘贴证书内容；
ca-p12=
```
**配置** > 点击**已安装证书的配置文件**后面的**ⓘ图标** > **HTTPS解密** > 证书后面的**ⓘ图标** > **复制**；  
**配置** > **模块** > **证书模块**后面的**ⓘ图标** > 在**ca-p12=**后面粘贴**证书内容**并**保存**；  
**配置** > 点击**已安装证书的配置文件**后面的**ⓘ图标** > **HTTPS解密** > **密码** > **复制内容**；  
**配置** > **模块** > **证书模块**后面的**ⓘ图标** > 在**ca-passphrase=**后面粘贴**密码**并**保存**；  
开启iCloud同步的多设备用户，其他设备**请勿重新生成新的证书**，可在**复制证书内容**后，通过隔空投送或者其他方式传送内容，然后在新设备上点击**证书** > 后面的**ⓘ图标**，选择**粘贴** ，输入**证书密码** > **安装证书**，否则原设备的证书将会失效，同时请确认证书模块保持同步；  

#### [软件配置](#软件配置)
首页-全局路由：
选择**配置**；  
首页-全局路由：
**关闭**启用回退；  
设置-按需求连接：
**开启**始终开启；  
设置-代理：
代理类型选择**HTTP**，代理地址选择**127.0.0.1**；  
设置-配置：
**开启**自动后台更新，间隔选择**7**；（开启前务必查看[更新提示](#更新提示)）  
设置-模块：
**开启**自动后台更新，间隔选择**7**；  
设置-订阅：
**开启**自动后台更新，间隔选择**24**；  
设置-GeoLite2数据库：
**开启**自动后台更新，间隔选择**7**；  
设置-GeoLite2数据库：
拷贝链接：[Country.mmdb](https://xiangwanguan.github.io/Shadowrocket/GeoLite2/Country.mmdb) & [ASN.mmdb](https://xiangwanguan.github.io/Shadowrocket/GeoLite2/ASN.mmdb)，粘贴至对应的**URL输入框**中 ，并点击**更新**；  
设置-温和策略机制：
选择**开启**；  
设置-排除路由0.0.0.0/31：
选择**关闭**；  

更多使用说明，可参阅：[Shadowrocket使用手册](https://github.com/LOWERTOP/Shadowrocket)  

---

### [特别鸣谢](#特别鸣谢)
[*@001ProMax*](https://github.com/001ProMax)
[*@app2smile*](https://github.com/app2smile)
[*@blackmatrix7*](https://github.com/blackmatrix7)
[*@fmz200*](https://github.com/fmz200)
[*@godalming123*](https://github.com/godalming123)
[*@iKeLee*](https://github.com/luestr)
[*@Keywos*](https://github.com/Keywos)
[*@kokoryh*](https://github.com/kokoryh)
[*@Maasea*](https://github.com/Maasea)
[*@MaxMind*](https://github.com/maxmind)
[*@QingRex*](https://github.com/QingRex)
[*@zirawell*](https://github.com/zirawell)  
