<template>
  <Header class="nav-bar">
    <Menu
      mode="horizontal"
      theme="dark"
      :active-name="menuSelect"
      @on-select="selectMenu"
      ref="menuBar"
      :open-names="openName"
    >
      <div class="layout-logo">
        Blog
        <span class="logo-reaper">Reaper</span>
        <span class="logo-reader">Reader</span>
      </div>
      <MenuItem name="index">
        <Icon type="md-home"></Icon>首页
      </MenuItem>
      <MenuItem name="home">
        <Icon type="md-person"></Icon>个人
      </MenuItem>
      <div v-if="!isLogin" class="right-menu" @click="onClickLogin">登陆</div>
      <div v-if="isLogin" class="right-menu">
        <Submenu name="user">
          <template slot="title">
            <Avatar class="user-avatar" :src="avatar"/>
            {{name}}
          </template>
          <div class="user-info">
            <Avatar :src="avatar" size="large"/>
            <div class="user-name">
              <div class="sub-text sub-name">{{name}}</div>
              <div class="sub-text">{{email}}</div>
            </div>
          </div>
          <!-- <div class="ivu-menu-item">个人设置</div> -->
          <div class="ivu-menu-item" @click="gotoManger">管理阅读源</div>
          <div class="ivu-menu-item" @click="logout">退出登陆</div>
        </Submenu>
      </div>
    </Menu>
  </Header>
</template>

<style lang="scss">
.nav-bar {
  z-index: 999;
  position: fixed;
  width: 100%;
  .layout-logo {
    color: #f5f7f9;
    border-radius: 3px;
    float: left;
    font-size: 22px;
    margin-right: 30px;
    user-select: none;
    .logo-reaper {
      display: inline;
    }
    .logo-reader {
      display: none;
    }
    &:hover {
      .logo-reaper {
        display: none;
      }
      .logo-reader {
        display: inline;
      }
    }
  }
  .right-menu {
    color: rgba(255, 255, 255, 0.7);
    float: right;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 2px;
    &:hover {
      color: #fff;
    }
    .user-avatar {
      margin-right: 10px;
      .ivu-icon {
        margin-right: 0 !important;
      }
    }
    .user-info {
      padding: 10px;
      color: #222;
      margin-bottom: 10px;
      user-select: none;
      cursor: auto;
      .user-name {
        transform: translateY(-10px);
        .sub-text {
          height: 24px;
        }
        .sub-name {
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
}
</style>

<script>
import { mapState } from 'vuex'
import gql from 'graphql-tag'
export default {
  data () {
    return {
      menuSelect: 'index',
      openName: []
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      email: state => state.email,
      name: state => state.info.name,
      avatar: state => state.info.avatar,
      gender: state => state.info.gender
    })
  },
  methods: {
    gotoManger () {
      this.menuSelect = 'home'
      this.openName = []
      this.$nextTick(() => {
        this.$refs.menuBar.updateOpened()
      })
      this.$router.push({ name: 'manger' })
    },

    async logout () {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation {
              logout
            }
          `
        })
        this.$store.commit('logout')
        this.$router.push({ name: 'index' })
      } catch (error) {

      }
    },

    async onClickLogin () {
      try {
        const result = await this.$apollo.mutate({
          mutation: gql`
            mutation ($routeName: String!) {
              createLoginUrl(backUrl: $routeName)
            }
          `,
          variables: {
            routeName: this.$route.name
          }
        })
        window.location.href = result.data.createLoginUrl
      } catch (e) {
        this.$Notice.error({
          title: '发生错误',
          desc: e
        })
        console.log(e)
      }
    },

    selectMenu (name, e) {
      // console.log(name, e)
      if (name === '-1') {
        this.menuSelect = 'home'
        return
      }
      this.$router.push({ name: name })
    }
  },
  mounted () {
    if (this.$route.name === 'index') {
      this.menuSelect = 'index'
    } else {
      this.menuSelect = 'home'
    }
    // if (['home', 'index'].indexOf(this.$route.name) !== -1) {
    //   this.menuSelect = this.$route.name
    // }
  }
}
</script>
