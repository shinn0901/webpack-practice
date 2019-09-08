## 入口与输出
了解npm的小伙伴，肯定知道，package.json里有一个main属性，代表整个包的输出口，通过main指向的js文件，得到一个对象（或类或函数）。

我们通过**CommonJS**规范语法:

```js
const XXX = require('XXX')'
```

来引入该模块，并使用它。

---

而webpack的入口与输出，与这个非常的类似。当我们使用webpack进行打包时，需要指定至少一个入口，并设置其对应的输出配置。比如：

```js
    const path = require('path')

    module.exports = {
        entry: "./src/main", // string | object | array  // 默认为 './src'
        // 这里应用程序开始执行
        // webpack 开始打包
        output: {
            // webpack 如何输出结果的相关选项
            path: path.resolve(__dirname, "dist/assets"), // string
            // 所有输出文件的目标路径
            // 必须是绝对路径（使用 Node.js 的 path 模块）
            filename: "/[name].js", // string    // 「入口分块(entry chunk)」的文件名模板
        },
    }
```

当我们配置好这些后，只需要命令webpack开始打包即可。

```bash
npx webpack
```

> 注意，此处因为我们并没有全局安装 webpack 和 webpack-cli ，所以我们无法直接使用 webpack 命令来进行打包，而使用了 npx 命令再转而使用 webpack 命令，此处只是为了向大家展示，是可以使用 webpack 命令直接进行打包的，但往往在实际项目开发的过程中，我们并不会这样使用。所以在后面的学习中，我们将只使用，package.json 中的 scripts 脚本命令，来进行打包的命令操作。而在 package.json 中的脚本命令，是不需要全局安装 webpack 的，在本地安装即可。也就是下面的配置：

> package.json
```json
{
    "scripts": {
        "build":"webpack --config webpack.config.js"
    }
}
```

然后使用npm run 脚本名称即可运行

```bash
npm run build
```

![build结果](https://github.com/shinn0901/webpack-practice/blob/master/assets/images/03-01.png?raw=true)

在打包的过程中我们指定一个入口（entry），告诉webpack具体从哪个文件开始打包，并找到这个文件相关所有的依赖的模块，再根据依赖的模块去找其他依赖的模块，一层层找下去。并将具有依赖关系的模块生成为一颗依赖树，并封装为一个chunk。chunk字面的意思是代码块，在webpack中则可以理解成被抽象和包装过后的一些模块。

webpack会从入口文件开始检索，并将具有依赖关系的模块生成为一颗依赖树，最终得到一个chunk，由这个chunk打包的产物，一般被称为bundle。entry与chunk与bundle某种意义上讲，它们是一种对应关系，
