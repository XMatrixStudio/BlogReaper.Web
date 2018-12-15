<template>
  <div class="source-draw">
    <div class="drawer-control">
      <span class="drawer-title">{{sourceData.title}}</span>
      <source-follow class="drawer-btn"
          :current-data="isFollow(sourceData.publicId)"
          :public-id="sourceData.publicId" />
    </div>
    <content-list :contents="contents"/>
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
      console.log(followed)
      return followed
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },

  data () {
    return {
      contents: [{
        id: 1,
        title: 'Python面向对象基础：编码细节和注意事项',
        date: new Date(new Date().getTime() - 1008611),
        source: '博客园',
        image: 'http://7x2wdd.com2.z0.glb.qiniucdn.com/b87aa0fb55c9b63ea85ee6a03b4a649e?imageMogr2/thumbnail/500%3E',
        text: '【摘要】在前面，我用了3篇文章解释python的面向对象： 1. "面向对象：从代码复用开始" 2. "面向对象：设置对象属性" 3. "类和对象的名称空间" 本篇是第4篇，用一个完整的示例来解释面向对象的一些细节。 例子的模型是父类Employe和子类Manager，从类的定义开始，一步步完善直到类变得完',
        url: 'http://www.cnblogs.com/f-ck-need-u/p/10099735.html'
      }, {
        id: 2,
        title: 'Python面向对象基础：编码细节和注意事项',
        date: new Date(new Date().getTime() - 1008611),
        source: '博客园',
        image: 'http://7x2wdd.com2.z0.glb.qiniucdn.com/b87aa0fb55c9b63ea85ee6a03b4a649e?imageMogr2/thumbnail/500%3E',
        text: '【摘要】在前面，我用了3篇文章解释python的面向对象： 1. "面向对象：从代码复用开始" 2. "面向对象：设置对象属性" 3. "类和对象的名称空间" 本篇是第4篇，用一个完整的示例来解释面向对象的一些细节。 例子的模型是父类Employe和子类Manager，从类的定义开始，一步步完善直到类变得完',
        url: 'http://www.cnblogs.com/f-ck-need-u/p/10099735.html'
      }, {
        id: 3,
        title: 'Python面向对象基础：编码细节和注意事项',
        date: new Date(new Date().getTime() - 1008611),
        source: '博客园',
        image: 'http://7x2wdd.com2.z0.glb.qiniucdn.com/b87aa0fb55c9b63ea85ee6a03b4a649e?imageMogr2/thumbnail/500%3E',
        text: '【摘要】在前面，我用了3篇文章解释python的面向对象： 1. "面向对象：从代码复用开始" 2. "面向对象：设置对象属性" 3. "类和对象的名称空间" 本篇是第4篇，用一个完整的示例来解释面向对象的一些细节。 例子的模型是父类Employe和子类Manager，从类的定义开始，一步步完善直到类变得完',
        url: 'http://www.cnblogs.com/f-ck-need-u/p/10099735.html'
      }, {
        id: 4,
        title: 'Python面向对象基础：编码细节和注意事项',
        date: new Date(new Date().getTime() - 1008611),
        source: '博客园',
        image: 'http://7x2wdd.com2.z0.glb.qiniucdn.com/b87aa0fb55c9b63ea85ee6a03b4a649e?imageMogr2/thumbnail/500%3E',
        text: '【摘要】在前面，我用了3篇文章解释python的面向对象： 1. "面向对象：从代码复用开始" 2. "面向对象：设置对象属性" 3. "类和对象的名称空间" 本篇是第4篇，用一个完整的示例来解释面向对象的一些细节。 例子的模型是父类Employe和子类Manager，从类的定义开始，一步步完善直到类变得完',
        url: 'http://www.cnblogs.com/f-ck-need-u/p/10099735.html'
      }]
    }
  }
}
</script>
