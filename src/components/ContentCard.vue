<template>
  <div class="content-comp">
    <div class="title-text">{{content.title}}</div>
    <div class="info-text">{{content.source}} {{content.date}} <a target="blank" :href="content.url">阅读原文</a></div>
    <div class="div-image">
      <img class="image" :src="content.image">
    </div>
    <div class="div-text">{{content.text}}</div>
  </div>
</template>

<style lang="scss">
.content-comp {
  display: inline-block;
  max-width: 500px;
  text-align: left;
  color: rgb(44, 44, 44);
  .title-text {
    font-size: 18px;
    font-weight: bold;
    margin: 15px 0 0 0;
  }
  .info-text {
    margin: 5px 0 5px 0;
  }
  .div-image {
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
  .div-text{
    margin: 5px 0 0 160px;
    font-size: 14px;
    height: 100px;
    overflow: hidden;
  }
}
</style>

<script>
export default {
  data () {
    return {
      content: {
        title: 'Python面向对象基础：编码细节和注意事项',
        date: new Date(new Date().getTime() - 1008611),
        source: '博客园',
        image: 'http://7x2wdd.com2.z0.glb.qiniucdn.com/b87aa0fb55c9b63ea85ee6a03b4a649e?imageMogr2/thumbnail/500%3E',
        text: '【摘要】在前面，我用了3篇文章解释python的面向对象： 1. "面向对象：从代码复用开始" 2. "面向对象：设置对象属性" 3. "类和对象的名称空间" 本篇是第4篇，用一个完整的示例来解释面向对象的一些细节。 例子的模型是父类Employe和子类Manager，从类的定义开始，一步步完善直到类变得完',
        url: 'http://www.cnblogs.com/f-ck-need-u/p/10099735.html'
      }
    }
  }
}
</script>
