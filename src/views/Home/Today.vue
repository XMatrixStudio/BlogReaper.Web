<template>
  <div class="today-comp">
    <title-bar title-en="Today" title-cn="今日阅读" @on-refresh="refresh" title-color="#50bf72"/>
    <content-list :contents="contents"/>
  </div>
</template>

<style lang="scss">
.today-comp {
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
  components: { ContentList, TitleBar },
  methods: {
    refresh () {

    }
  },
  data () {
    return {
      contents: []
    }
  }
}
</script>
