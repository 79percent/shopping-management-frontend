const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  lintOnSave: false,
  publicPath: './',
  runtimeCompiler: true,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },
  devServer: {
    open: true,
    port: 8081
  }
}
