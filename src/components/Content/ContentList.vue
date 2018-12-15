<script>
import ContentCard from './ContentCard'
export default {
  props: {
    contents: {
      require: true
    },
    hasMore: {
      require: true
    },
    showLater: {
      default: true
    }
  },
  components: {
    ContentCard
  },
  data () {
    return {
      showSpin: false
    }
  },
  methods: {
    loadMore () {
      this.showSpin = true
      this.$emit('load-more')
    },
    loadDone () {
      this.showSpin = false
    }
  }
}
</script>

<template>
  <div class="content-list">
    <div class="content-box" v-for="content in contents" :key="content.id">
      <content-card :content="content" :show-later="showLater"/>
    </div>
    <Card v-if="hasMore" @click.native="loadMore" class="load-more">
      <p>加载更多</p>
      <Spin v-if="showSpin" fix></Spin>
    </Card>
    <Divider class="no-more" v-if="!hasMore">这就是秀秀的底线</Divider>
    <!-- <Page class="paging" :total="contents.length"/> -->
  </div>
</template>

<style lang="scss">
.content-list {
  margin-bottom: 40px;
  .paging {
    margin: 20px;
  }
  .content-box {
    margin: 16px auto;
  }
  .load-more {
    margin: auto;
    max-width: 600px;
    user-select: none;
    cursor: pointer;
  }
  .no-more {
    padding: 30px 0;
    user-select: none;
  }
}
</style>
