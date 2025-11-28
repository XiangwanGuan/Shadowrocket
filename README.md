## [项目简介](#项目简介)
本[项目](https://github.com/XiangwanGuan/Shadowrocket)由[向晚](https://t.me/xiangwanguan)维护，提供[Shadowrocket](https://apps.apple.com/app/shadowrocket/id932747118)的多款[配置文件](#配置文件)、一款[融合模块](#融合模块)，及多款[独立模块](#独立模块)；<br>
如果此项目对您有帮助，欢迎给予Star；若有其他需求或问题，请提交Issues！<br>

---

### [重要声明](#重要声明)
禁止在中国大陆的任何平台传播此项目！<br>
禁止将本项目中的任何内容用于违法活动或用于盈利目的！<br>
本项目仅供学习交流及测试，使用本项目中的内容所造成的一切后果，均由使用者承担！<br>

---

### [配置文件](#配置文件)
默认使用加密的**DoH**与**DoT**进行域名解析，并对未加密的DNS请求进行加密转发；<br>
苹果、微软、谷歌等**系统服务**已单独建立专属分流策略，避免与通用规则冲突；<br>
海外主流**AI平台**已独立分流，保障访问速度与稳定性；<br>
**微信**与**电报**已单独分流，降低因策略调整导致封号或异常的风险；<br>
针对**国内**与**国外**的**媒体**及**规则**，分别使用独立的分流策略，实现更灵活的控制；<br>

本项目所使用的**规则集**源自[blackmatrix7](https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Shadowrocket)的仓库，由[GitHub Actions](https://github.com/XiangwanGuan/Shadowrocket/blob/main/.github/workflows/Sync-RuleFiles.yml)**每日自动同步**；<br>
本项目所使用的**GeoLite2数据库**源自[MaxMind](https://www.maxmind.com)提供的免费版本，由[GitHub Actions](https://github.com/XiangwanGuan/Shadowrocket/blob/main/.github/workflows/Sync-GeoLite2Files.yml)**每日自动同步**；<br>

如何安装：<br>
使用安装Shadowrocket的手机访问此页面，点击安装链接，一键跳转安装；<br>
如无法加载配置，请将**全局路由**切换至**代理**模式，或自行检查网络；<br>

修改分流：<br>
仅适用于包含**代理分组**的配置；<br>
打开Shadowrocket首页，下拉进入**代理分组**，选择你想要修改的代理分组，选择对应的**策略**即可；<br>

---

#### [基础配置](#基础配置)
[基础配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/Rules.conf)的默认策略既是完善的策略，如无特殊需求，无需自行调整；<br>
代理分组内的策略**自动分流**，自动测试节点的可用性，优先选择**延迟较低**的节点，无需手动切换节点；<br>
你所使用的节点，尽量包含**港美新**这三项；<br>
如**不完全包含**这三个地区的节点，则需要自行修改代理分组/正则，或使用[完整配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/RulesFull.conf)或[精简配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/RulesLite.conf)；<br>
基础配置默认规则如下：<br>
Telegram使用**新加坡节点**，Google、AI工具使用**美国节点**；<br>
国内应用直接连接，其他规则及未匹配到的规则使用**香港节点**；<br>
为了保证完全接管流量，本配置默认使用**代理分组**进行兜底，首页的节点选择将被分组替代，完全失效；<br>
此配置是最适合**搭配机场使用**的配置，添加后无需调整，如节点包含**港美新**，建议首选此配置！<br>

[![一键安装 基础配置](https://img.shields.io/static/v1?label=一键安装&message=基础配置&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://xiangwanguan.github.io/Shadowrocket/Static/Redirect.html?url=shadowrocket://config/add/https://xiangwanguan.github.io/Shadowrocket/Release/Rules.conf)<br>

---

#### [完整配置](#完整配置)
[完整配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/RulesFull.conf)基于[基础配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/Rules.conf)构建，包含更多代理分组：**港台日新美**，默认使用**首页节点**进行代理，可更自由的配置代理分组，其余配置完全相同；<br>
如需要**更自由的代理分组**，建议使用此配置！<br>

[![一键安装 完整配置](https://img.shields.io/static/v1?label=一键安装&message=完整配置&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://xiangwanguan.github.io/Shadowrocket/Static/Redirect.html?url=shadowrocket://config/add/https://xiangwanguan.github.io/Shadowrocket/Release/RulesFull.conf)<br>

---

#### [精简配置](#精简配置)
[精简配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/RulesLite.conf)基于[基础配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/Rules.conf)构建，除不包含代理分组以外，其余配置完全相同；<br>
如**不需要代理分组**，建议使用此配置！<br>

[![一键安装 精简配置](https://img.shields.io/static/v1?label=一键安装&message=精简配置&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://xiangwanguan.github.io/Shadowrocket/Static/Redirect.html?url=shadowrocket://config/add/https://xiangwanguan.github.io/Shadowrocket/Release/RulesLite.conf)<br>

---

#### [回国配置](#回国配置)
[回国配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/RulesBackCN.conf)基于[精简配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/RulesLite.conf)构建，适用于外国华侨使用，国内域名代理，其余域名直连；<br>
此配置需搭配**回国机场**使用，**不适合国内用户使用！**<br>

[![一键安装 回国配置](https://img.shields.io/static/v1?label=一键安装&message=回国配置&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://xiangwanguan.github.io/Shadowrocket/Static/Redirect.html?url=shadowrocket://config/add/https://xiangwanguan.github.io/Shadowrocket/Release/RulesBackCN.conf)<br>

---

#### [全球配置](#全球配置)
[全球配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/RulesGlobal.conf)基于[精简配置](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/RulesLite.conf)构建，适用于非大陆地区，全局直连，可单独指定部分服务使用代理；<br>
此配置需搭配**国外机场**使用，**不适合国内用户使用！**<br>

[![一键安装 全球配置](https://img.shields.io/static/v1?label=一键安装&message=全球配置&color=grey&logo=googledocs&logoColor=white&labelColor=orange&messageColor=white)](https://xiangwanguan.github.io/Shadowrocket/Static/Redirect.html?url=shadowrocket://config/add/https://xiangwanguan.github.io/Shadowrocket/Release/RulesGlobal.conf)<br>

---

### [融合模块](#融合模块)
[融合模块](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Release/Module.sgmodule)由[GitHub Actions](https://github.com/XiangwanGuan/Shadowrocket/blob/main/.github/workflows/Generate-ModuleFiles.yml)调用[生成器](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Generator/Builder.py)依据[规则列表](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Generator/Generate.conf)而构建，随规则变化，不定期更新；<br>
规则构成：以[向晚](https://t.me/xiangwanguan)基于[*@fmz200*](https://github.com/fmz200/wool_scripts) [*@QingRex*](https://github.com/QingRex/LoonKissSurge) [*@zirawell*](https://github.com/zirawell/R-Store)的项目定制，并持续手动维护的[重写合集](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/XiangwanConfig/Collection.conf)为基础，融合了[小红书](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/XiangwanConfig/Rednote.conf)、[哔哩哔哩](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/XiangwanConfig/Bilibili.conf)、[YouTube](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/XiangwanConfig/YouTube.conf)、[高德地图](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/XiangwanConfig/Amap.js)、[一汽大众](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/XiangwanConfig/FAWVW.conf)的专用规则；<br>
所有[远程资源](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/JSInventory.md)由[GitHub Actions](https://github.com/XiangwanGuan/Shadowrocket/blob/main/.github/workflows/Sync-RewriteFiles.yml)依据[构建列表](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Rewrite/JSGenerator.conf)每日自动构建&监测&清理，所有列表内指向的资源已重定向至[当前项目](https://github.com/XiangwanGuan/Shadowrocket/tree/main/Rewrite/JavaScript)；<br>

使用须知：使用融合模块，**必须开启MitM**，教程参考下方的[推荐设置](#推荐设置)；<br>
特别警告：融合模块**已移除“解锁类”功能**，请支持开发者！<br>
如果本项目侵犯了您的利益，或不希望我收集您的规则，请提交Issues，我会第一时间进行移除，谢谢！<br>

[![一键安装 融合模块](https://img.shields.io/static/v1?label=一键安装&message=融合模块&color=grey&logo=googledocs&logoColor=white&labelColor=blue&messageColor=white)](https://xiangwanguan.github.io/Shadowrocket/Static/Redirect.html?url=shadowrocket://install?module=https://xiangwanguan.github.io/Shadowrocket/Release/Module.sgmodule)<br>

### [独立模块](#独立模块)
[独立模块](https://github.com/XiangwanGuan/Shadowrocket/tree/main/Release/Modules)由[生成器](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Generator/Builder.py)同步构建，请使用[模块助手](https://github.com/XiangwanGuan/Shadowrocket/blob/main/Static/ModuleHelper.html)进行查询与安装，助手同时提供**反解密模块制作**、**查看原始模块**等功能；<br>

使用须知：[融合模块](#融合模块)已包含[独立模块](#独立模块)的所有功能，**请勿重复使用**！

[![一键跳转 模块助手](https://img.shields.io/static/v1?label=一键跳转&message=模块助手&color=grey&logo=googledocs&logoColor=white&labelColor=blue&messageColor=white)](https://xiangwanguan.github.io/Shadowrocket/Static/ModuleHelper.html)<br>

---

### [推荐设置](#推荐设置)
如需使用[融合模块](#融合模块)来净化应用，**必须开启HTTPS解密**，否则模块将不能正常工作；<br>
建议添加**证书模块**，避免因配置变化导致HTTPS解密功能失效；<br>
证书信任之后，**请勿在设置中移除证书**，否则HTTPS解密功能将会失效；<br>
证书模块启用后，HTTPS解密功能默认**强制开启**，配置中的“HTTPS解密开关”将不再生效；<br>

证书模块制作办法：<br>
**配置** > 点击**配置文件**的 **ⓘ图标** > **HTTPS解密** > **证书** > **生成新的CA证书** > **安装证书**；<br>
**系统设置** > **已下载描述文件** > **安装**；<br>
**系统设置** > **通用** > **关于本机** > **证书信任设置** > **启用**此证书的根证书完全信任；<br>
**配置** > **模块** > **新建模块** > **修改**并**保存为**以下内容：<br>
```ini
#!name = 证书模块
[MITM]
enable=true

# 请在"ca-passphrase="后面填写证书密码；
ca-passphrase=

# 请在"ca-p12="后面粘贴证书内容；
ca-p12=
```
**配置** > 点击**已安装证书的配置文件**后面的**ⓘ图标** > **HTTPS解密** > 证书后面的**ⓘ图标** > **复制**；<br>
**配置** > **模块** > **证书模块**后面的**ⓘ图标** > 在**ca-p12=**后面粘贴**证书内容**并**保存**；<br>
**配置** > 点击**已安装证书的配置文件**后面的**ⓘ图标** > **HTTPS解密** > **密码** > **复制内容**；<br>
**配置** > **模块** > **证书模块**后面的**ⓘ图标** > 在**ca-passphrase=**后面粘贴**密码**并**保存**；<br>
开启iCloud同步的多设备用户，其他设备**请勿重新生成新的证书**，可在**复制证书内容**后，通过隔空投送或者其他方式传送内容，然后在新设备上点击**证书** > 后面的**ⓘ图标**，选择**粘贴** ，输入**证书密码** > **安装证书**，否则原设备的证书将会失效，同时请确认证书模块保持同步；<br>

软件配置：<br>
首页-全局路由：
选择**配置**；<br>
首页-全局路由：
**关闭**启用回退；<br>
设置-按需求连接：
**开启**始终开启；<br>
设置-代理：
代理类型选择**HTTP**，代理地址选择**127.0.0.1**；<br>
设置-配置：
**关闭**自动后台更新；<br>
设置-订阅：
**开启**自动后台更新，间隔选择**24**；<br>
设置-GeoLite2数据库：
**开启**自动后台更新，间隔选择**7**；<br>
设置-GeoLite2数据库：
拷贝链接：[Country.mmdb](https://xiangwanguan.github.io/Shadowrocket/GeoLite2/Country.mmdb) & [ASN.mmdb](https://xiangwanguan.github.io/Shadowrocket/GeoLite2/ASN.mmdb)，粘贴至对应的**URL输入框**中 ，并点击**更新**；<br>
设置-温和策略机制：
选择**开启**；<br>
设置-排除路由0.0.0.0/31：
选择**关闭**；<br>

更多使用说明，可参阅：[Shadowrocket使用手册](https://github.com/LOWERTOP/Shadowrocket)<br>

---

### [特别鸣谢](#特别鸣谢)
[*@001ProMax*](https://github.com/001ProMax)
[*@app2smile*](https://github.com/app2smile)
[*@blackmatrix7*](https://github.com/blackmatrix7)
[*@fmz200*](https://github.com/fmz200)
[*@godalming123*](https://github.com/godalming123)
[*@iab0x00*](https://github.com/iab0x00)
[*@iKeLee*](https://github.com/luestr)
[*@Keywos*](https://github.com/Keywos)
[*@kokoryh*](https://github.com/kokoryh)
[*@LOWERTOP*](https://github.com/LOWERTOP)
[*@Maasea*](https://github.com/Maasea)
[*@MaxMind*](https://github.com/maxmind)
[*@NobyDa*](https://github.com/NobyDa)
[*@QingRex*](https://github.com/QingRex)
[*@Sliverkiss*](https://github.com/Sliverkiss)
[*@zirawell*](https://github.com/zirawell)
[*@zZPiglet*](https://github.com/zZPiglet)<br>
