const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config =>{
    config.plugin('html')
      .tap(args => {
        args[0].title = "校园二手交易";
        return args;
      })
  }
})