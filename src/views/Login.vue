<template>
  <div class="login-page">
    <Spin size="large" fix></Spin>
  </div>
</template>

<style lang="scss">
.login-page {
  display: inline-block;
  position: relative;

  min-height: calc(100vh - 62px);
  text-align: center;
  font-size: 16px;
}
</style>

<script>
import gql from 'graphql-tag'
export default {
  methods: {
    loginError (e) {
      // this.$router.push({ name: 'index', params: { error: true } })
      this.$Notice.error({
        title: '登陆失败',
        desc: e || ''
      })
    }
  },
  async mounted () {
    if (this.$route.query.code === undefined || this.$route.query.state === undefined) {
      this.loginError()
      return
    }
    try {
      const result = await this.$apollo.mutate({
        mutation: gql`
            mutation ($code: String!, $state: String!) {
              login(code: $code, state: $state) {
                email
                info {
                  name
                  avatar
                  gender
                }
              }
            }
          `,
        variables: {
          code: this.$route.query.code,
          state: this.$route.query.state
        }
      })
      console.log(result)
      this.$store.commit('login', result.data.login)
      if (this.$route.query.redirectUrl) {
        this.$router.push({ name: this.$route.query.redirectUrl })
      } else {
        this.$router.push({ name: 'home' })
      }
    } catch (e) {
      this.loginError(e)
    }
  }
}
</script>
