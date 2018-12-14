const userService = require('./modules/user.js')
const categoryService = require('./modules/category.js')

const service = {
  install: function (Vue, options) {
    Vue.prototype.$service = {
      user: userService.default,
      category: categoryService.default,
      errorHandle: this.errorHandle
    }
  },
  errorHandle: function (error, callback) {
    console.error(error)
    if (error.response && error.response.status === 400) {
      if (callback) {
        callback(error.response.data)
      } else {
        this.$Notice.error({
          title: '发生错误',
          desc: error.response.data
        })
      }
    } else {
      this.$Notice.error({
        title: '发生错误',
        desc: error
      })
    }
  }
}
export default service
