## 配置文件

webpack 默认提供了一套基础配置，以供新手使用者快速上手使用。webpack 会假定项目的入口起点为 src/index，然后会在 dist/main.js 输出结果，并且在生产环境开启压缩和优化。

但是通常情况下，我们在制作项目时，还需要 webpack 提供给我们各种各样的复杂功能。而此时我们可以在项目根目录下创建一个 webpack.config.js 文件，webpack 会自动使用它。

```js
const path = require('path');

module.exports = {
    mode: "production", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: "./app/entry", // string | object | array  // 默认为 './src'
    // 这里应用程序开始执行
    // webpack 开始打包
    output: {
        // webpack 如何输出结果的相关选项
        path: path.resolve(__dirname, "dist"), // string
        // 所有输出文件的目标路径
        // 必须是绝对路径（使用 Node.js 的 path 模块）
        filename: "bundle.js", // string    // 「入口分块(entry chunk)」的文件名模板
        publicPath: "/assets/", // string    // 输出解析文件的目录，url 相对于 HTML 页面
        library: "MyLibrary", // string,
        // 导出库(exported library)的名称
        libraryTarget: "umd", // 通用模块定义    // 导出库(exported library)的类型
        /* 高级输出配置（点击显示） */
    },
    module: {
        // 关于模块配置
        rules: [
            // 模块规则（配置 loader、解析器等选项）
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    path.resolve(__dirname, "app/demo-files")
                ],
                // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
                // test 和 include 具有相同的作用，都是必须匹配选项
                // exclude 是必不匹配选项（优先于 test 和 include）
                // 最佳实践：
                // - 只在 test 和 文件名匹配 中使用正则表达式
                // - 在 include 和 exclude 中使用绝对路径数组
                // - 尽量避免 exclude，更倾向于使用 include
                issuer: {
                    test,
                    include,
                    exclude
                },
                // issuer 条件（导入源）
                enforce: "pre",
                enforce: "post",
                // 标识应用这些规则，即使规则覆盖（高级选项）
                loader: "babel-loader",
                // 应该应用的 loader，它相对上下文解析
                // 为了更清晰，`-loader` 后缀在 webpack 2 中不再是可选的
                // 查看 webpack 1 升级指南。
                options: {
                    presets: ["es2015"]
                },
                // loader 的可选项
            },
            {
                test: /\.html$/,
                use: [
                    // 应用多个 loader 和选项
                    "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                            /* ... */
                        }
                    }
                ]
            },
            {
                oneOf: [ /* rules */ ]
            },
            // 只使用这些嵌套规则之一
            {
                rules: [ /* rules */ ]
            },
            // 使用所有这些嵌套规则（合并可用条件）
            {
                resource: {
                    and: [ /* 条件 */ ]
                }
            },
            // 仅当所有条件都匹配时才匹配
            {
                resource: {
                    or: [ /* 条件 */ ]
                }
            },
            {
                resource: [ /* 条件 */ ]
            },
            // 任意条件匹配时匹配（默认为数组）
            {
                resource: {
                    not: /* 条件 */
                }
            }
            // 条件不匹配时匹配
        ],
        /* 高级模块配置（点击展示） */
    },
    resolve: {
        // 解析模块请求的选项
        // （不适用于对 loader 解析）
        modules: [
            "node_modules",
            path.resolve(__dirname, "app")
        ],
        // 用于查找模块的目录
        extensions: [".js", ".json", ".jsx", ".css"],
        // 使用的扩展名
        alias: {
            // 模块别名列表
            "module": "new-module",
            // 起别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"
            "only-module$": "new-module",
            // 起别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"
            "module": path.resolve(__dirname, "app/third/module.js"),
            // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
            // 模块别名相对于当前上下文导入
        },
        /* 可供选择的别名语法（点击展示） */
        /* 高级解析选项（点击展示） */
    },
    performance: {
        hints: "warning", // 枚举    maxAssetSize: 200000, // 整数类型（以字节为单位）
        maxEntrypointSize: 400000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    devtool: "source-map", // enum  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
    // 牺牲了构建速度的 `source-map' 是最详细的。
    context: __dirname, // string（绝对路径！）
    // webpack 的主目录
    // entry 和 module.rules.loader 选项
    // 相对于此目录解析
    target: "web", // 枚举  // bundle 应该运行的环境
    // 更改 块加载行为(chunk loading behavior) 和 可用模块(available module)
    externals: ["react", /^@angular\//], // 不要遵循/打包这些模块，而是在运行时从环境中请求他们
    serve: { //object
        port: 1337,
        content: './dist',
        // ...
    },
    // 为 webpack-serve 提供选项
    stats: "errors-only", // 精确控制要显示的 bundle 信息
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        // ...
    },
    plugins: [
        // ...
    ],
    // 附加插件列表
    /* 高级配置（点击展示） */
}
```

以上文件是引用的 webpack 官网的“配置”一篇中的一个样例，通过上面的样例我们可以看出， webpack 的配置项真的是多如繁星，这也正是我们学习 webpack 的难点之一。我们会在后面的学习中，逐步弄明白每一个配置项具体有什么意义，能为我们干什么。

---

> 多配制文件

有时，我们会因为项目的不用需求，建立不同的配置文件，以供我们应对多种情况。这时，可以新建多个配置文件，如：build.conf.js、test.conf.js。并在package.json中进行这样的设置：

![配置文件](https://github.com/shinn0901/webpack-practice/blob/master/assets/images/02-01.png?raw=true)

这样，我们就可以通过使用不同的**npm**命令，来使用不同的配置文件，进行相应打包操作了。