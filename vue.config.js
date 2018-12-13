module.exports = {
  baseUrl: '/',
  devServer: {
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://localhost:30003/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
