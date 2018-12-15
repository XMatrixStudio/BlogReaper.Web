<template>
  <div class="read-later">
    <title-bar title-en="Read later" title-cn="稍后阅读" @on-refresh="refresh" title-color="#c75454"/>
    <content-list
      ref="contentList"
      v-if="contents.length !== 0"
      :contents="contents"
      :has-more="hasMore"
      @load-more="loadMore"
    />
    <div v-if="contents.length === 0" class="nothing-box">
      <img src="../../assets/nothing.svg">
      <p>暂时还没有东西，不如先去添加一点？</p>
    </div>
  </div>
</template>

<style lang="scss">
.read-later {
  text-align: center;
  width: 100%;
  margin: 20px auto;
  display: inline-block;
}
</style>

<script>
import TitleBar from '../../components/TitleBar'
import ContentList from '../../components/Content/ContentList'
export default {
  components: { TitleBar, ContentList },
  methods: {
    async refreshData (callback) {
      this.$Loading.start()
      this.hasMore = true
      this.currentPage = 1
      await this.$service.articles.getLater.call(this, {
        page: 1,
        numPerPage: 5
      }, (result) => {
        this.hasMore = result.data.user.laterArticles.length === 5
        this.contents = result.data.user.laterArticles
        this.$Loading.finish()
        if (callback !== undefined) callback()
      })
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

    async loadMore () {
      this.$Loading.start()
      this.currentPage++
      await this.$service.articles.getLater.call(this, {
        page: this.currentPage,
        numPerPage: 5
      }, (result) => {
        this.hasMore = result.data.user.laterArticles.length !== 5
        this.contents.push(...result.data.user.laterArticles)
        this.$Loading.finish()
        this.$refs.contentList.loadDone()
      })
    }
  },
  data () {
    return {
      contents: [],
      hasMore: true,
      currentPage: 1
    }
  },
  mounted () {
    this.refreshData()
  }
}
</script>
