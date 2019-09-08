## 安装
在安装webpack之前，我们需要确保在本机上已经安装了Node.js。果没有安装，请去Node.js官网下载。（[https://nodejs.org/](https://nodejs.org)）

我们先初始化我们的项目文件夹。
```bash
    npm init -y
```

初始化完毕后，我们打开webpack的官网：https://webpack.js.org/，阅读英文有困难的小伙伴，可以选择右上方的语言切换按钮,选择中文阅览。切换好语言后，我们再次点击导航栏中的“文档”栏目，并点击二级导航的“指南”页面。这时，左侧的菜单中，就已经出现了webpack的基础指南。

![选择语言](https://github.com/shinn0901/webpack-practice/blob/master/assets/images/01-01.png?raw=true)

首先我们选择菜单-安装

出于学习的目的，大家可以选择全局安装。而如果出于项目制作的考虑，以及可能会用到Git进行版本控制和分享，我推荐大家进行本地安装本地化安装命令。使用本地安装，webpack会存于node_modules文件夹内与devDependencies属性内，更方便项目文件迁移以及协同开发等情况。

使用webpack需要安装3个包，分别是

> 1.webpack（核心包）<br>2.webpack-cli（脚手架）<br>3.webpack-dev-server（开发服务器）

webpack核心包，顾名思义，是基础，必须使用的包。

webpack-cli脚手架，是可以帮助我们在使用webpack的时候，减少一些需要手动配置的选项，更方便我们使用自定义配置的工具，从wepback v4.0开始必须安装

webpack-dev-server是我们在开发环境时，不可能每一次调试都重新构建一次。所以一个热重载的服务器就很有必要。

使用npm命令：

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server
```

![安装成功](https://github.com/shinn0901/webpack-practice/blob/master/assets/images/01-02.png?raw=true)

好的，安装成功。