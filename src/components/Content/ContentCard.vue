<template>
  <div class="content-comp">
    <div class="title-text">
      {{content.title}}
      <div class="control-box">
        <div class="btn-bookmark" title="稍后阅读">
          <Icon v-show="false" type="ios-bookmark-outline"/>
          <Icon type="ios-bookmark"/>
        </div>
        <!-- 删除功能暂时关闭
        <div class="btn-close">
          <Icon type="md-close"/>
        </div>
        -->
      </div>
    </div>
    <div class="info-text">
      {{content.source}} /
      <Time :time="content.date"/>
      <a target="blank" :href="content.url">阅读原文</a>
    </div>
    <div class="div-image">
      <img class="image" :src="content.image">
    </div>
    <div class="div-text">{{content.text}} ...</div>
  </div>
</template>

<style lang="scss">
.content-comp {
  margin-bottom: 16px;
  transition: all 0.4s;
  display: inline-block;
  max-width: 600px;
  text-align: left;
  color: rgb(44, 44, 44);
  &:hover {
    .title-text > .control-box {
      opacity: 1;
    }
  }
  .title-text {
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    margin: 15px 0 0 0;
    .control-box {
      opacity: 0;
      float: right;
      color: rgb(133, 133, 133);
      .btn-bookmark {
        transition: all 0.4s;
        &:hover {
          display: inline-block;
          color: #52c071;
        }
      }
      .btn-close {
        transition: all 0.4s;
        display: inline-block;
        margin-left: 10px;
        &:hover {
          color: rgb(255, 97, 97);
        }
      }
    }
  }
  .info-text {
    font-size: 14px;
    margin: 5px 0 10px 0;
    color: rgba(0, 0, 0, 0.534);
    a {
      margin-left: 20px;
    }
  }
  .div-image {
    cursor: pointer;
    float: left;
    width: 140px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .image {
      height: 100px;
      border-radius: 4px;
    }
  }
  .div-text {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.7);
    margin: 15px 0 0 150px;
    font-size: 14px;
    // height: 100px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
}
</style>

<script>
export default {
  props: ['content'],
  data () {
    return {
    }
  }
}
</script>
