<template>
  <div class="source-comp">
    <div @click="openDraw">
      <Avatar shape="square" :src="sourceData.image" size="large">{{sourceData.title[0]}}</Avatar>
      <div class="source-info">{{sourceData.title}}</div>
    </div>
    <Drawer title="阅读源" width="550" :closable="true" v-model="showDetail">
      <source-draw :source-data="sourceData"/>
    </Drawer>
  </div>
</template>

<style lang="scss">
.source-comp {
  text-align: left;
  padding: 10px;
  margin: 4px 0;
  user-select: none;
  transition: all .3s;
  border-radius: 8px;
  &:hover {
    background: rgba(163, 163, 163, 0.13);
  }
  .source-icon {
    float: left;
    width: 30px;
    height: 30px;
  }
  .source-info {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>

<script>
import SourceDraw from './SourceDraw'
export default {
  props: ['sourceData'],
  components: {
    SourceDraw
  },
  methods: {
    openDraw () {
      this.showDetail = true
    }
  },
  data () {
    return {
      showDetail: false
    }
  }
}
</script>
