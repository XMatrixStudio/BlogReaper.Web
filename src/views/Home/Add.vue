<template>
  <div class="add-comp">
    <title-bar title-en="Add Sources" title-cn="添加阅读源" @on-refresh="refresh" title-color="#7f27e4" :show-refresh="false"/>
  </div>
</template>

<style lang="scss">
.add-comp {
  text-align: center;
  width: 100%;
  margin: 20px auto;
  display: inline-block;
}
</style>

<script>
import TitleBar from '../../components/TitleBar'
export default {
  components: { TitleBar },
  methods: {
    refresh () {

    }
  }
}
</script>
