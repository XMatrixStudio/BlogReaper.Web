const userService = require('./modules/user.js')
const categoryService = require('./modules/category.js')
const feedService = require('./modules/feed.js')
const articlesService = require('./modules/articles.js')

const service = {
  install: function (Vue, options) {
    Vue.prototype.$service = {
      user: userService.default,
      category: categoryService.default,
      feed: feedService.default,
      articles: articlesService.default
    }
  }
}
export default service
