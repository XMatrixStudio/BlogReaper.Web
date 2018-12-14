<script>
import TitleBar from '../../components/TitleBar'
import ContentList from '../../components/Content/ContentList'
export default {
  components: { ContentList, TitleBar },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  watch: {
    categories () {
      this.updateName()
    },
    $route () {
      this.updateName()
    }
  },
  mounted () {
    this.updateName()
  },
  data () {
    return {
      name: '全部',
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
  },
  methods: {
    updateName () {
      if (this.$route.query.category === '0') {
        this.name = '全部'
      } else {
        for (let i in this.categories) {
          if (this.categories[i].id === this.$route.query.category) {
            this.name = this.categories[i].name
            break
          }
        }
      }
    },

    refresh () {

    },

    remove () {

    },

    rename (name) {
      this.name = name
    },

    gotoAdd () {
      this.$router.push({ name: 'add' })
    }
  }
}
</script>

<template>
  <div class="feed-comp">
    <title-bar
      title-en="Reaper list"
      :title-cn="name"
      @on-refresh="refresh"
      @on-remove="remove"
      @on-rename="rename"
      title-color="#50bf72"
      :show-menu="true"
    />
    <div v-if="contents.length === 0" class="nothing-box">
      <img src="../../assets/nothing.svg">
      <p>暂时还没有东西，不如先去添加一点？</p>
      <Button type="success" icon="md-add" size="large" @click="gotoAdd">添加</Button>
    </div>
    <content-list v-else :contents="contents"/>
  </div>
</template>

<style lang="scss">
.feed-comp {
  text-align: center;
  width: 100%;
  margin: 20px auto;
  display: inline-block;
  .nothing-box {
    font-size: 18px;
    p {
      user-select: none;
      margin: 20px;
    }
  }
}
</style>
