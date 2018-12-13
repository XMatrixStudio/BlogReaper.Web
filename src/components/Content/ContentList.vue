<template>
  <div class="content-list">
    <div v-for="content in contents" :key="content.id">
      <content-card :content="content"/>
    </div>
    <Page class="paging" :total="contents.length"/>
  </div>
</template>

<style lang="scss">
.content-list {
  margin-bottom: 40px;
  .paging {
    margin: 20px;
  }
}
</style>

<script>
import ContentCard from './ContentCard'
export default {
  props: ['contents'],
  components: {
    ContentCard
  },
  data () {
    return {
    }
  }
}
</script>
