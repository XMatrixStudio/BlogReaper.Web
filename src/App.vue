<template>
  <div id="app">
    <Layout>
      <nav-bar/>
      <router-view class="router"/>
    </Layout>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'app',
  components: {
    NavBar
  },
  mounted () {
    if (this.$route.name !== 'login') {
      this.$service.user.getInfo.call(this, {},
        (result) => {
          this.$store.commit('login', result.data.user)
        }, () => {
          this.$store.commit('logout')
          this.$router.push({ name: 'index' })
        })
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router {
  margin-top: 60px;
  min-height: calc(100vh - 60px);
}
.ivu-layout {
  background: #fefefe!important;
}
</style>
