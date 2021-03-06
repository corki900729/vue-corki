const path = require('path')
module.exports = {
    // 部署应用包时的基本 URL
    publicPath: process.env.NODE_ENV === 'production'   ? '/'     : '/',
      
    // 运行 vue-cli-service build 时生成的生产环境构建文件的目录
    // 默认构建前清除文件夹(构建时传入 --no-clean 可关闭该行为
    outputDir: process.env.NODE_ENV==='production' ? 'dist' :'devdist',
  
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    // assetsDir: 'static',
  
    // 指定生成的 index.html 的输出路径 (相对于 outputDir),也可以是一个绝对路径
    // indexPath: 'index.html',
  
    // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    // filenameHashing: true,

    // 当在 multi-page 模式下构建时，webpack 配置会包含不一样的插件
    // (这时会存在多个 html-webpack-plugin 和 preload-webpack-plugin 的实例)。
    // 如果你试图修改这些插件的选项，请确认运行 vue inspect
    // pages: {
    //   index: {
    //     // page 的入口
    //     entry: 'src/pages/index/index.js',
    //     // 模板来源
    //     template: 'src/pages/index/index.html',
    //     // 在 dist 的输出为 index.html
    //     filename: 'index.html',
    //     // 当使用 title 选项时，
    //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //     title: '首页',
    //     // 在这个页面中包含的块，默认情况下会包含
    //     // 提取出来的通用 chunk 和 vendor chunk。
    //     chunks: ['chunk-vendors', 'chunk-common', 'index']
    //   },
    //   // 当使用只有入口的字符串格式时，
    //   // 模板会被推导为 `public/subpage.html`
    //   // 并且如果找不到的话，就回退到 `public/index.html`。
    //   // 输出文件名会被推导为 `subpage.html`。
      
    //   // 多入口时，接着写子页面
    //   //subpage: 'src/subpage/main.js'
    // },
    
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
  
    // 是否使用包含运行时编译器的Vue核心的构建
    // runtimeCompiler: false,
  
    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules，
    // 想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
    // transpileDependencies: [],
  
    // 生产环境 sourceMap
    productionSourceMap: false,
    
    // 跨域设置 
    // 可取值参考： https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes
    // crossorigin: undefined,
    
    // 构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性, 默认false
    // integrity: false,
    
    // webpack 配置，键值对象时会合并配置，为方法时会改写配置
    // https://cli.vuejs.org/guide/webpack.html#simple-configuration
    chainWebpack: (config) => {
      const svgRule = config.module.rule("svg");
      svgRule.uses.clear();
      svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
        .options({
          symbolId: "icon-[name]",
          include: ["./src/icons"]
        });
    },
    configureWebpack: (config) => {
      config.resolve = {
        //配置别名 添加文件名后缀
        extensions: ['.js','.json','.vue'],
        alias: {
          "vue": "vue/dist/vue.js",
          '@': path.resolve(__dirname,'./src'),
          'public': path.resolve(__dirname,'./public'),
          '@c': path.resolve(__dirname,'./src/components'),
          'common': path.resolve(__dirname,'./src/common'),
          'api': path.resolve(__dirname,'./src/api'),
          'views': path.resolve(__dirname,'./src/views'),
          'data': path.resolve(__dirname,'./src/data')
        }
      }
    },


    // 配置高于chainWebpack中关于 css loader 的配置
    css: {
      // false 时只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
      // true 时可以去掉文件名中的 .module， 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块
      requireModuleExtension: false,
      
       // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
      // 生产环境下是 true，开发环境下是 false  
      extract: false,
  
      // 是否构建样式地图，设置为 true 之后可能会影响构建的性能
      sourceMap: false,
  
      // css预设器配置项
      loaderOptions: {
          // 这里的选项会传递给 css-loader
        sass: {
          prependData: '@import"./src/styles/main.scss";'
        }
        // postcss: {
        //   // 这里的选项会传递给 postcss-loader
        // }
      }
    },
    // 所有 webpack-dev-server 的选项都支持
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
      open: false,
  
      host: '0.0.0.0',
  
      port: 8080,
  
      https: false,
      hot: true,
      hotOnly: false,
  
      // 将任何未知请求 (没有匹配到静态文件的请求) 代理到该字段指向的地方 
      // proxy: null,
      proxy: {
        '/devapi':{
          target: "http://api.dcat.test/api",  //api服务器地址
          // target: "http://www.web-jshtml.cn/productapi",
          changeOrigin: true,
          pathRewrite: {
            '^/devapi': ''
          }
        }
      },
  
      before: app => {
      },
        overlay: {
            warnings: true,
            errors: true
        }
    },
    // 构建时开启多进程处理 babel 编译
    // 是否为 Babel 或 TypeScript 使用 thread-loader
    parallel:require('os').cpus().length > 1,
  
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
  
    // 第三方插件配置
    pluginOptions: {}
  };