<script>
import TitleBar from '../../components/TitleBar'
import ContentList from '../../components/Content/ContentList'
export default {
  components: { ContentList, TitleBar },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  watch: {
    categories () {
      this.updateName()
    },
    $route () {
      this.updateName()
    }
  },
  mounted () {
    this.updateName()
  },
  data () {
    return {
      name: '全部',
      contents: [],
      isFeed: false,
      hasMore: true,
      currentPage: 1
    }
  },
  methods: {
    updateName () {
      if (this.$route.query.category === '0') {
        this.name = '全部'
      } else {
        for (let i in this.categories) {
          if (this.categories[i].id === this.$route.query.category && this.$route.query.feed === undefined) {
            this.name = this.categories[i].name
            this.isFeed = false
            this.currentPage = 1
            this.hasMore = true
            break
          }
          for (let feed of this.categories[i].feeds) {
            if (feed.id === this.$route.query.feed) {
              this.name = feed.title
              this.isFeed = true
              this.currentPage = 1
              this.hasMore = true
              // this.refreshFeed()
              break
            }
          }
        }
      }
      this.refreshData()
    },

    async refresh () {
      this.isLoading = this.$Message.loading({
        content: '获取数据...',
        duration: 0
      })
      this.refreshData(() => {
        setTimeout(() => {
          this.isLoading()
          setTimeout(() => {
            this.$Message.success('已获取最新文章数据')
          }, 300)
        }, 300)
      })
    },

    async refreshData (callback) {
      this.contents = []
      this.currentPage = 1
      this.$Loading.start()
      if (this.$route.query.category === '0') {
        await this.$service.articles.getAll.call(this, {
          page: 1,
          numPerPage: 3
        }, (result) => {
          for (let feed of result.data.user.categories) {
            for (let i in feed.feeds) {
              this.contents.push(...feed.feeds[i].articles)
            }
          }
          this.contents.sort((a, b) => {
            return new Date(b.published).getTime() - new Date(a.published).getTime()
          })
          this.$Loading.finish()
          if (callback !== undefined) callback()
        })
      } else if (this.$route.query.feed !== undefined) { // 加载Feed
        await this.$service.feed.getById.call(this, {
          feedId: this.$route.query.feed,
          page: 1,
          numPerPage: 5
        }, (result) => {
          for (let feed of result.data.user.categories) {
            if (feed.feeds.length !== 0) {
              this.contents.push(...feed.feeds[0].articles)
              break
            }
          }
          this.$Loading.finish()
          if (callback !== undefined) callback()
        })
      } else { // 加载Category
        await this.$service.category.getById.call(this, {
          id: this.$route.query.category,
          page: 1,
          numPerPage: 4
        }, (result) => {
          for (let feed of result.data.user.categories[0].feeds) {
            for (let i in feed.articles) {
              feed.articles[i].feedTitle = feed.title
            }
            this.contents.push(...feed.articles)
          }
          this.$Loading.finish()
          if (callback !== undefined) callback()
        })
      }
    },

    async remove () {
      if (this.$route.query.feed === undefined) {
        await this.$service.category.remove.call(this, {
          id: this.$route.query.category
        }, async () => {
          this.$Notice.success({
            title: '删除分类成功'
          })
          this.$router.push({ name: 'feed', query: { category: '0' } })
          await this.$service.category.update.call(this)
        })
      } else {
        await this.$service.feed.remove.call(this, {
          id: this.$route.query.feed
        }, async () => {
          this.$Notice.success({
            title: '删除阅读源成功'
          })
          this.$router.push({ name: 'feed', query: { category: '0' } })
          await this.$service.category.update.call(this)
        })
      }
    },

    rename (name) {
      this.name = name
    },

    gotoAdd () {
      this.$router.push({ name: 'add' })
    },

    async loadMore () {
      this.currentPage++
      this.$Loading.start()
      if (this.$route.query.category === '0') {
        await this.$service.articles.getAll.call(this, {
          page: this.currentPage,
          numPerPage: 3
        }, (result) => {
          this.hasMore = false
          for (let feed of result.data.user.categories) {
            for (let i in feed.feeds) {
              if (feed.feeds[i].articles.length !== 0) {
                this.hasMore = true
              }
              this.contents.push(...feed.feeds[i].articles)
            }
          }
          this.$Loading.finish()
          this.$refs.contentList.loadDone()
        })
      } else if (this.$route.query.feed !== undefined) {
        await this.$service.feed.getById.call(this, {
          feedId: this.$route.query.feed,
          page: this.currentPage,
          numPerPage: 5
        }, (result) => {
          for (let feed of result.data.user.categories) {
            if (feed.feeds.length !== 0) {
              this.contents.push(...feed.feeds[0].articles)
              if (feed.feeds[0].articles.length !== 5) {
                this.hasMore = false
              }
              break
            }
          }
          this.$Loading.finish()
          this.$refs.contentList.loadDone()
        })
      } else {
        await this.$service.category.getById.call(this, {
          id: this.$route.query.category,
          page: this.currentPage,
          numPerPage: 4
        }, (result) => {
          this.hasMore = false
          for (let feed of result.data.user.categories[0].feeds) {
            this.contents.push(...feed.articles)
            if (feed.articles.length !== 0) {
              this.hasMore = true
            }
          }
          this.$Loading.finish()
          this.$refs.contentList.loadDone()
        })
      }
    }
  }
}
</script>

<template>
  <div class="feed-comp">
    <title-bar
      title-en="Reaper list"
      :title-cn="name"
      @on-refresh="refresh"
      @on-remove="remove"
      @on-rename="rename"
      :is-feed="isFeed"
      title-color="#50bf72"
      :show-menu="true"
    />
    <div v-if="contents.length === 0" class="nothing-box">
      <img src="../../assets/nothing.svg">
      <p>暂时还没有东西，不如先去添加一点？</p>
      <Button type="success" icon="md-add" size="large" @click="gotoAdd">添加</Button>
    </div>
    <content-list
      ref="contentList"
      v-else
      :contents="contents"
      :has-more="hasMore"
      @load-more="loadMore"
    />
  </div>
</template>

<style lang="scss">
.feed-comp {
  text-align: center;
  width: 100%;
  margin: 20px auto;
  display: inline-block;
  .nothing-box {
    font-size: 18px;
    p {
      user-select: none;
      margin: 20px;
    }
  }
}
</style>
