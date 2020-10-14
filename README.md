# WOWS Ship Fitting 战舰工坊

[![Build Status](https://travis-ci.com/mtmzorro/wows-ship-fitting.svg?branch=master)](https://travis-ci.com/mtmzorro/wows-ship-fitting)
![GitHub top language](https://img.shields.io/github/languages/top/mtmzorro/wows-ship-fitting?color=brightgreen)
![GitHub](https://img.shields.io/github/license/mtmzorro/wows-ship-fitting?)

> 一个帮助 World of Warships  玩家管理战舰和舰长技能装配方案的 App 小程序
> 
> 打开「战舰工坊」管理自己的方案并分享给需要的战友们把

![preview](https://cdn.jsdelivr.net/gh/mtmzorro/wows-ship-fitting-site@0.0.1/images/preview.jpg)

## 安装方式

打开「微信」扫描上方图像中小程序码即可

## 主要功能

- **命名创建自己的装配方案**，从现有版本400多艘战舰和对应指挥官中可视化选择搭配
- **舰长技能模拟器**，在装配方案中管理存储舰长技能
- **云端存储和分享**，在云端存储管理自己装配方案并快捷分享给微信好友
- **云端近期方案浏览**，浏览近期云端用户们所创建的方案

## 更新日志

### 1.0.1

- Bug Fix 修复 舰长技能模拟器 4-05 「进阶射击训练」本地化错误显示为「基础射击训练」相关技能信息

## 开发相关

### 基础相关

- **Node.js **实际项目开发中使用版本 12.18.1，符合 Taro、React 等要求即可

- **Taro** 使用 Taro@3.0.7 ，需要安装对应 @tarojs/cli@3.0.7 或者使用 npx ，[参考 Taro 文档](https://taro-docs.jd.com/taro/docs/GETTING-STARTED)

~~~bash
$ yarn global add @tarojs/cli@3.0.7
$ yarn install
~~~

~~~bash
# ENV development 运行
$ yarn dev:weapp
# ENV production 运行 用以减少生成 dist 体积真机预览
$ yarn dev:weapp:prod
# build
$ yarn build:weapp
~~~

打开微信开发者工具，导入编译生成的`dist`目录

> 因涉及到微信登录相关，如使用测试 AppID异常请申请一个正常 AppID

### LeanCloud 结构化存储和微信登录相关配置

项目服务端使用了 [LeanCloud](https://leancloud.cn/) 的 ServerLess 解决方案，需要自行申请开发版。

1. 打开 **应用设置** > **应用 Keys** 获取 AppID 和 AppKey

2. 将 AppID 和 AppKey 配置在`.travis\leancloudApp.json`中，或者直接在`src\config\config.ts`修改（不建议）。因其涉及到**项目安全**，故当前项目的`leancloudApp.json`已经被添加至 .gitignore 忽略，需要手动在``.travis\`下创建如下结构：

    ~~~json
    {
        "appId": "yourAppID",
        "appKey": "yourAppKey"
    }
    ~~~

3. 配置微信登录相关
   1. 登录 [微信公众平台](https://mp.weixin.qq.com/)，在 **设置** > **开发设置** 中获得小程序 AppID 与 AppSecret
   2. 前往 LeanCloud 控制台 > 存储 > 用户 > 设置 > 第三方集成，启用「微信小程序」后填写 AppID 与 AppSecret

**LeanCloud相关文档**

- [LeanCloud JavaScript SDK 安装指南](https://leancloud.cn/docs/sdk_setup-js.html#hash3552618)
- [LeanCloud 微信体系登录相关](https://leancloud.cn/docs/weapp.html#hash632531944)
- [LeanCloud 数据存储开发指南 · JavaScript](https://leancloud.cn/docs/leanstorage_guide-js.html)

### E2E 测试相关

项目使用 **Jest** / **miniprogram-automator** 来实现小程序 E2E 测试

> 测试相关目录 `__test__\e2e`

1. 在微信开发者工具设置， **设置** > **通用设置** > **安全**中把服务端口打开
2. 注意 win 下大部分人修改了开发者工具路径，需要重新设置 cliPath ，Mac 下大部分为默认
   - cliPath 路径设置：`__test__\e2e\helpers\miniProgramCreator.ts`
   - *cli Path 问题参考 https://developers.weixin.qq.com/miniprogram/dev/devtools/auto/automator.html 结尾*
3. **项目需要在开发者工具中已创建，并且开发者账号已经扫码登录**，否则运行 E2E 测试后无法调起开发者工具

~~~bash
# 运行 E2E 测试，自动运行 build:weapp 并 jest --runInBand 模式运行
$ yarn e2e
~~~

> 根据不同电脑性能调用起微信开发者工具 build 然后加载时间可能过长 jest 报超时
>
> 可自行修改每个测试用例文件中 beforeAll 的等待时间，当前为 40000 

**相关案例和文档**

- [miniprogram-automator 官方示例和文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/auto/demo.html)
- [尝鲜小程序自动化测试工具](https://juejin.im/post/6844903962345209864)
- [京喜前端自动化测试之路(小程序篇)](https://aotu.io/notes/2020/07/13/jx-automated-testing-weapp/index.html)

**Commit Hook**

项目已经使用 husky 配置 pre-commit hook ，会自动运行 Eslint 和 E2E 测试检查，保证提交代码质量。

配置在 `package.json`中如下：

~~~json
"husky": {
    "hooks": {
        "pre-commit": "yarn lint && yarn e2e"
    }
}
~~~

### 小程序持续集成、发布相关

项目使用 **Travis CI** 和 **miniprogram-ci** 实现如下流程：

- 远端 master 分支 commit 或 PR 合并时自动发布至微信小程序**体验版**
- 远端 develop 分支 commit 时自动发布至微信小程序**开发版**

**相关配置**：

1. 获取**上传密钥**，打开[微信公众平台](https://mp.weixin.qq.com/) > 开发 > 开发设置，下载密钥妥善保管，暂时关闭白名单（如在公司部署使用安全起见设置白名单）
2. **使用 Travis CI 的 CLI 工具加密密钥**，相关教程可以参考[Travis CI 教程 - 5.3 加密文件](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)或[官网文档](https://docs.travis-ci.com/user/encrypting-files/)，注意以下要点：
   - [登录](https://github.com/travis-ci/travis.rb#login) Travis CI  `$ travis login --com`（**注意一定要登录到 Travis CI.com，不添加会默认登录 org 将不会自动添加 com 下项目加密环境变量**）
   - 执行完加密命令后到 Travis CI.com 项目中右上角 More options > Settings 检查是否已经有 Environment Variables `encrypted_0xxxxxxx`类似的环境变量
3. **修改`.travis.yml`中上传密钥相关环境变量和路径**
   
   1. 将`$encrypted_0fb5a69e10c8_key`和`$encrypted_0fb5a69e10c8_iv `修改为你的环境变量
   2. 加密生成的`private.key.enc`存储在`.travis/`下，（如文件名不同修改下，`-out .travis/private.key` 请勿修改，后续流程依赖）
   3. 原有的密钥存储可以重命名为`private.key`存储在`.travis/private.key`，因密钥也涉及**项目安全**已被添加至 .gitignore 忽略，请确保不被提交。放在本地可以使用`yarn preview:weapp`直接将本地 dist 目录发布至微信小程序**开发版**
   
    ~~~bash
    before_install:
    - openssl aes-256-cbc -K $encrypted_0fb5a69e10c8_key -iv $encrypted_0fb5a69e10c8_iv -in .travis/private.key.enc -out .travis/private.key -d
    ~~~
   
1. **配置 leancloudApp 相关 AppID 和 AppKey**，前面因安全已经忽略了本地`.travis\leancloudApp.json`的提交，需要流程中自动再创建一个
   
   1. 打开 Travis CI  对应的项目，右上角 More options > Settings
   2. 添加 Environment Variables `leancloud_AppID`和`leancloud_AppKey`，并填写对应的值

至此，Travis CI 相关设置已经OK。

#### miniprogram-ci 本地化使用

> 如果你在参考这个文档配置自己的 CI 流程，如不需要在本地运行 miniprogram-ci 则可以将 miniprogramCI\cli.js 所负责的操作移至  .travis.yml  before_install 中，然后安装并直接调用 miniprogram-ci

为方便本地项目也可以通过命令行快速发布预览版本，故将 miniprogram-ci 进行了一层封装`miniprogramCI\cli.js`，自动获取`project.config.json`中版本号、appID等相关信息，并在`package.json`中已经预设了一条命令：

~~~json
{
  "scripts": {
    "preview:weapp": "node ./miniprogramCI/cli.js preview --robot 3 --desc LocalPreview --keyPath ./.travis/private.key"
  }
}
~~~

如需在本地发布开发版预览直接执行：

~~~bash
$ yarn preview:weapp
~~~

**相关文档文章**

- [使用Coding持续集成部署微信小程序](https://cloud.tencent.com/developer/article/1627514)
- [miniprogram-ci 官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html)
- [小程序的持续集成方案](https://juejin.im/post/6844903649055866894)
- [使用 GitHub Actions 为 Taro 项目添加持续集成](https://github.com/harrisoff/harrisoff.github.io/blob/d3b3035cfa96a28027dae21913d45a70c876e8e2/_posts/2020-05-20-%E4%BD%BF%E7%94%A8-GitHub-Actions-%E4%B8%BA-Taro-%E9%A1%B9%E7%9B%AE%E6%B7%BB%E5%8A%A0%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90.md)

## 相关资源版权声明

All copyright materials provided by Wargaming.net are owned by Wargaming.net.