<template>
  <div class="home-sider">
    <Menu class="menu-this" active-name="0" theme="light" width="auto" @on-select="selectMenu">
      <MenuItem class="menu-first" name="0">
        <Icon type="md-clock"></Icon>今日
      </MenuItem>
      <MenuItem name="later">
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
        <transition name="fade">
          <div v-show="item.expand">
            <MenuItem
              v-for="subItem in item.subItem"
              :key="subItem.id"
              :name="subItem.id"
              class="menu-sub-sub"
            >{{subItem.title}}</MenuItem>
          </div>
        </transition>
      </div>
    </Menu>
  </div>
</template>

<style lang="scss">
.home-sider {
  background: #fff !important;
  height: 100%;
  .menu-this {
    min-height: calc(100vh - 62px);
    padding-top: 16px;
  }
  .menu-title {
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
  .menu-sub-sub {
    padding-left: 52px !important;
  }
}
</style>

<script>

export default {
  name: 'sildePage',
  props: ['menuItem'],
  methods: {
    selectMenu (name) {
      if (name === 'later') {
        this.$router.push({ name: name })
      }
    },
    menuDown (e, num, i) {
      // console.log(e)
      e.stopPropagation()
      // console.log(num)
      if (i === -1) {
        this.menuItem.expand = !this.menuItem.expand
      } else {
        this.menuItem.category[i].expand = !this.menuItem.category[i].expand
      }
    }
  }
}
</script>
