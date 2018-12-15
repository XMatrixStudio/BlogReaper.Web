export default {
  wrapper: function (fn) {
    return async function (data, success, failed) {
      try {
        let result = await fn.call(this, data)
        if (success !== undefined) {
          success(result)
        }
      } catch (error) {
        if (failed !== undefined) {
          failed(error)
        } else {
          if (error.message === 'GraphQL error: not_login') {
            this.$router.push({ name: 'index' })
            this.$store.commit('logout')
          } else {
            this.$Notice.error({
              title: '发生错误',
              desc: error
            })
          }
        }
      }
    }
  }
}
