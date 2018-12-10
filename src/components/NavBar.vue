<template>
    <Header class="nav-bar">
      <Menu mode="horizontal" theme="dark" :active-name="menuSelect" @on-select="selectMenu">
        <div class="layout-logo">Blog Reaper</div>
        <MenuItem name="index">
          <Icon type="md-home"></Icon>首页
        </MenuItem>
        <MenuItem name="home">
          <Icon type="md-person"></Icon>个人
        </MenuItem>
        <div v-if="isLogin" class="right-menu">登陆</div>
        <div v-if="!isLogin" class="right-menu">
          <Submenu name="user">
            <template slot="title">
              <Avatar class="user-avatar" icon="ios-person"/>MegaShow
            </template>
            <div class="user-info">
              <Avatar icon="ios-person" size="large"/>
              <div class="user-name">
                <div class="sub-text sub-name">MegaShow</div>
                <div class="sub-text">a@zhenly.cn</div>
              </div>
            </div>
            <div class="ivu-menu-item">个人设置</div>
            <div class="ivu-menu-item">管理阅读源</div>
            <div class="ivu-menu-item">退出登陆</div>
          </Submenu>
        </div>
      </Menu>
    </Header>
</template>

<style lang="scss">
.nav-bar {
  z-index: 10086;
  position: fixed;
  width: 100%;
  .layout-logo {
    color: #f5f7f9;
    border-radius: 3px;
    float: left;
    font-size: 22px;
    margin-right: 30px;
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
export default {
  data () {
    return {
      menuSelect: 'index'
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  methods: {
    selectMenu (name, e) {
      console.log(name, e)
      if (name === '-1') {
        this.menuSelect = 'home'
        return
      }
      this.$router.push({ name: name })
    }
  },
  mounted () {
    if (['home', 'index'].indexOf(this.$route.name) !== -1) {
      this.menuSelect = this.$route.name
    }
  }
}
</script>
