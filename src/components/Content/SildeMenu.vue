<script>
export default {
  name: 'sildePage',
  data () {
    return {
      activeName: 'home',
      menuItem: {
        id: 0,
        name: '全部',
        expand: true
      },
      expands: [true]
    }
  },
  methods: {
    gotoAdd () {
      this.$router.push({ name: 'add' })
      this.activeName = ''
    },

    gotoManger () {
      this.$router.push({ name: 'manger' })
      this.activeName = ''
    },

    selectMenu (name) {
      let names = name.split('-')
      if (name === 'later' || name === 'home') {
        this.$router.push({ name: name })
      } else if (name.indexOf('-') !== -1) {
        if (names.length > 2) {
          this.$router.push({ name: 'feed', query: { category: names[1], feed: names[2] } })
        } else {
          this.$router.push({ name: 'feed', query: { category: names[1] } })
        }
      }
    },
    menuDown (e, num, i) {
      e.stopPropagation()
      if (i === -1) {
        this.menuItem.expand = !this.menuItem.expand
      } else {
        this.$set(this.expands, i, !this.expands[i])
      }
    },

    updateRoute (name) {
      this.activeName = ''
      this.$nextTick(() => {
        if (['later', 'home'].indexOf(name) !== -1) {
          this.activeName = name
        }
        if (['add', 'manger'].indexOf(name) !== -1) {
          this.activeName = ''
        }
        if (name === 'feed') {
          if (this.$route.query.category) {
            if (this.$route.query.feed !== undefined) {
              this.activeName = 'feed-' + this.$route.query.category + '-' + this.$route.query.feed
            } else {
              this.activeName = 'feed-' + this.$route.query.category
            }
          } else {
            this.activeName = 'feed-0'
          }
        }
      })
    },

    updateExpands (categories) {
      let newExpand = []
      categories.forEach(() => {
        newExpand.push(true)
      })
      this.expands = newExpand
    }
  },
  watch: {
    '$route' (to, from) {
      this.updateRoute(to.name)
    }
  },
  computed: {
    categories () {
      let newCategories = this.$store.state.categories
      this.updateExpands(newCategories)
      this.updateRoute(this.$route.name)
      return newCategories
    }
  },
  async mounted () {
    this.updateRoute(this.$route.name)
  }
}
</script>

<template>
  <div class="home-sider">
    <Menu
      class="menu-this"
      :active-name="activeName"
      theme="light"
      width="auto"
      @on-select="selectMenu"
    >
      <!-- <MenuItem class="menu-first" name="home">
        <Icon type="md-clock"></Icon>今日
      </MenuItem> -->
      <MenuItem name="home">
        <Icon type="md-bookmark"></Icon>稍后阅读
      </MenuItem>

      <div class="menu-title">Reaper
        <Icon
          ref
          @click="gotoManger"
          :class="[{'select-icon' : $route.name === 'manger'},'right-icon']"
          type="md-settings"
        />
        <Icon
          @click="gotoAdd"
          :class="[{'select-icon' : $route.name === 'add'},'right-icon']"
          type="md-add"
        />
      </div>

      <MenuItem class="menu-all" :name="'feed-' + menuItem.id">{{menuItem.name}}</MenuItem>
      <div v-for="(item, index) in categories" :key="item.id">
        <MenuItem class="menu-sub" :name="'feed-' + item.id">
          <Icon
            class="menu-down"
            v-show="expands[index]"
            @click="menuDown($event, item.id, index)"
            type="md-arrow-dropdown"
          />
          <Icon
            class="menu-down"
            v-show="!expands[index]"
            @click="menuDown($event, item.id, index)"
            type="md-arrow-dropright"
          />
          {{item.name}}
        </MenuItem>
        <transition name="fade">
          <div v-show="expands[index]">
            <MenuItem
              v-for="feed in item.feeds"
              :key="feed.id+item.id"
              :name="'feed-'+item.id + '-' + feed.id"
              class="menu-sub-sub"
            >{{feed.title}}</MenuItem>
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
  // border-right: 1px solid #dbdde1;
  .menu-this {
    min-height: calc(100vh - 62px);
    padding-top: 16px;
    height: 100%;
  }
  .menu-title {
    padding: 20px 0 20px 16px;
    text-align: left;
    color: #a6a9ac;
    user-select: none;
    .select-icon {
      color: rgb(22, 22, 22);
    }
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
