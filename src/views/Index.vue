<template>
  <div class="index-page">
    <Row type="flex" justify="center">
      <Col span="16">
        <title-bar
          class="index-title"
          title-en="Top Article"
          title-cn="热门文章"
          @on-refresh="refresh"
          title-color="#d67b30"
        />
        <content-list
          v-if="contents.length !== 0"
          ref="contentList"
          :contents="contents"
          @load-more="loadMore"
          :has-more="hasMore"
          :show-later="false"
        />
        <div v-if="contents.length === 0" class="nothing-box">
          <img src="../assets/nothing.svg">
          <p>还没有东西呢🐷</p>
        </div>
      </Col>
      <Col class="source-col" span="6">
        <Affix :offset-top="90">
          <div class="source-title">
            <p>热门阅读源</p>
          </div>
          <source-card
            v-for="sourceData in sourceDatas"
            :key="sourceData.publicId"
            :source-data="sourceData"
          />
        </Affix>
      </Col>
    </Row>
    <BackTop></BackTop>
  </div>
</template>

<style lang="scss">
.index-page {
  .nothing-box {
    font-size: 14px;
  }
  .spin-load {
    margin: 60px !important;
    display: inline-block;
    margin: auto;
  }
  .index-title {
    margin-top: 36px;
  }
  .source-col {
    max-width: 260px;
    margin-left: 20px;
    margin-top: 70px;
    .source-title {
      border-left: 3px solid rgb(139, 138, 58);
      padding-left: 10px;
      text-align: left;
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
}
</style>

<script>
import ContentList from '../components/Content/ContentList'
import SourceCard from '../components/FeedSource/SourceCard'
import TitleBar from '../components/TitleBar'
import { setTimeout } from 'timers'
export default {
  components: {
    ContentList, SourceCard, TitleBar
  },
  methods: {
    async refresh () {
      this.currentPage = 1
      this.$Loading.start()
      this.isLoading = this.$Message.loading({
        content: '获取数据...',
        duration: 0
      })

      await this.$service.articles.popular.call(this, {
        page: 1,
        numPerPage: 7
      }, (result) => {
        this.$Loading.finish()
        setTimeout(() => {
          this.isLoading()
          setTimeout(() => {
            this.$Message.success('已获取最新文章数据')
          }, 300)
        }, 300)
        this.contents = result.data.popularArticles
      })
      await this.$service.feed.popular.call(this, {
        page: 1,
        numPerPage: 7
      }, (result) => {
        this.sourceDatas = result.data.popularFeeds
      })
    },

    async loadMore () {
      this.currentPage++
      await this.$service.articles.popular.call(this, {
        page: this.currentPage,
        numPerPage: 7
      }, (result) => {
        this.contents.push(...result.data.popularArticles)
        if (result.data.popularArticles.length !== 7) {
          this.hasMore = false
        }
        this.$refs.contentList.loadDone()
      })
    }
  },
  data () {
    return {
      isLoading: {},
      hasMore: true,
      contents: [],
      sourceDatas: [],
      currentPage: 1
    }
  },
  async mounted () {
    await this.$service.category.update.call(this, {}, () => { }, () => { })
    this.refresh()
  }
}
</script>
