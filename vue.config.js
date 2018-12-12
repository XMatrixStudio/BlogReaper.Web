module.exports = {
  baseUrl: '/',
  devServer: {
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://localhost:30038/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
