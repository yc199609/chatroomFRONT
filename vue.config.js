const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    https: false, // https:{type:Boolean}
    proxy: {
      '/api': {
        // target: 'http://39.106.80.90:3000/',
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
      config.externals = {
        'vue': 'Vue',
        'element-ui': 'ELEMENT',
        'axios': 'axios',
        'nprogress': 'NProgress',
        'vue-router': 'VueRouter'
      }
    }
  }
}
