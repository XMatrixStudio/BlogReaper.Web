<template>
  <div class="source-draw">
    <div class="drawer-control">
      <span class="drawer-title">{{sourceData.title}}</span>
      <source-follow
        class="drawer-btn"
        :current-data="isFollow(sourceData.publicId)"
        :public-id="sourceData.publicId"
      />
    </div>
    <content-list
      ref="contentList"
      :contents="contents"
      :has-more="hasMore"
      @load-more="loadMore"
      :show-later="false"
    />
  </div>
</template>

<style lang="scss">
.source-draw {
  .drawer-control {
    border-left: 4px solid rgb(206, 66, 66);
    padding-left: 10px;
    .drawer-title {
      user-select: none;
      font-size: 20px;
      font-weight: bold;
    }
    .drawer-btn {
      float: right;
    }
  }
}
</style>

<script>
import SourceFollow from '../FeedSource/SourceFollow'
import ContentList from '../Content/ContentList'
export default {
  components: {
    ContentList, SourceFollow
  },
  props: ['sourceData'],
  methods: {
    isFollow (id) {
      let followed = []
      for (let i in this.categories) {
        for (let feed of this.categories[i].feeds) {
          if (feed.publicId === id) {
            followed.push({
              categoryId: this.categories[i].id,
              feedId: feed.id
            })
          }
        }
      }
      return followed
    },

    async loadMore () {
      this.currentPage++
      this.$Loading.start()
      await this.$service.feed.getByPublicId.call(this, {
        id: this.sourceData.publicId,
        page: this.currentPage,
        numPerPage: 4
      }, (result) => {
        this.hasMore = result.data.feeds[0].articles.length === 4
        this.contents.push(...result.data.feeds[0].articles)
        this.$Loading.finish()
        this.$refs.contentList.loadDone()
      })
    },

    async loadData () {
      this.currentPage = 1
      await this.$service.feed.getByPublicId.call(this, {
        id: this.sourceData.publicId,
        page: 1,
        numPerPage: 4
      }, (result) => {
        this.hasMore = result.data.feeds[0].articles.length === 4
        this.contents = result.data.feeds[0].articles
      })
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },

  data () {
    return {
      contents: [],
      hasMore: true,
      currentPage: 1
    }
  }
}
</script>
