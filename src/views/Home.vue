<template>
  <div class="home-layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">Blog Reaper</div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="md-home"></Icon>首页
            </MenuItem>
            <MenuItem name="2">
              <Icon type="md-person"></Icon>个人
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider class="home-sider" hide-trigger :style="{background: '#fff'}">
          <Menu
            active-name="3-1"
            theme="light"
            width="auto"
            :open-names="['1']"
            @on-open-change="onOpenChange"
          >
            <MenuItem class="menu-first" name="0">
              <Icon type="md-clock"></Icon>今日
            </MenuItem>
            <MenuItem name="1">
              <Icon type="md-book"></Icon>稍后阅读
            </MenuItem>

            <div class="menu-title">Reaper
              <Icon class="right-icon" type="md-settings"/>
              <Icon class="right-icon" type="md-add"/>
            </div>

            <MenuItem class="menu-all" :name="menuItem.id">{{menuItem.title}}</MenuItem>
            <div v-for="(item, index) in menuItem.category" :key="item.id">
              <MenuItem class="menu-sub" :name="item.id">
                <Icon
                  class="menu-down"
                  v-show="item.expand"
                  @click="menuDown($event, item.id, index)"
                  type="md-arrow-dropdown"
                />
                <Icon
                  class="menu-down"
                  v-show="!item.expand"
                  @click="menuDown($event, item.id, index)"
                  type="md-arrow-dropright"
                />
                {{item.title}}
              </MenuItem>
              <MenuItem
                v-for="subItem in item.subItem"
                v-show="item.expand"
                :key="subItem.id"
                class="menu-sub-sub"
                :name="subItem.id"
              >{{subItem.title}}</MenuItem>
            </div>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">Content</Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      menuItem: {
        id: 0,
        title: '全部',
        expand: true,
        category: [
          {
            id: 1,
            title: '博客',
            expand: true,
            subItem: [{ id: 2, title: 'Icytowm' }, { id: 3, title: 'Zhenly' }]
          },
          {
            id: 4,
            title: '新闻',
            expand: false,
            subItem: [{ id: 5, title: 'IT Home' }, { id: 6, title: 'Github' }]
          }
        ]
      }
    }
  },
  methods: {
    onOpenChange (e) {
      console.log(e)
    },
    menuDown (e, num, i) {
      console.log(e)
      e.stopPropagation()
      console.log(num)
      if (i === -1) {
        this.menuItem.expand = !this.menuItem.expand
      } else {
        this.menuItem.category[i].expand = !this.menuItem.category[i].expand
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  text-align: left;
  height: 100vh;
  .layout-logo {
    color: #f5f7f9;
    border-radius: 3px;
    float: left;
    font-size: 22px;
    margin-right: 30px;
  }
  .layout-nav {
  }
  .home-sider {
    height: 100vh;
    .menu-first {
      margin-top: 16px;
    }
    .menu-title {
      // margin: 20px 0 10px 10px;
      padding: 20px 0 20px 16px;
      text-align: left;
      color: #a6a9ac;
      user-select: none;
      .right-icon {
        float: right;
        margin-top: 2px;
        font-size: 18px;
        margin-right: 16px;
        transition: all 0.5s;
        cursor: pointer;
        &:hover {
          color: rgb(50, 54, 54);
        }
      }
    }
    .menu-down {
      font-size: 18px;
    }
    .menu-all {
      // padding-left: 38px;
    }
    .menu-sub-sub {
      padding-left: 58px;
    }
  }
}
</style>
