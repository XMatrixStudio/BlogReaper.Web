<template>
  <div class="index-page">
    <Row type="flex" justify="center">
      <Col span="16">
        <title-bar
          class="index-title"
          title-en="Top Article"
          title-cn="热门文章"
          @on-refresh="refresh"
          title-color="#d67b30"
        />
        <content-list :contents="contents"/>
      </Col>
      <Col class="source-col" span="6">
        <Affix :offset-top="90">
          <div class="source-title">
            <p>热门阅读源</p>
          </div>
          <source-card
            v-for="sourceData in sourceDatas"
            :key="sourceData.id"
            :source-data="sourceData"
          />
        </Affix>
      </Col>
    </Row>
  </div>
</template>

<style lang="scss">
.index-page {
  .index-title {
    margin-top: 36px;
  }
  .source-col {
    margin-left: 20px;
    margin-top: 70px;
    .source-title {
      border-left: 3px solid rgb(139, 138, 58);
      padding-left: 10px;
      text-align: left;
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
}
</style>

<script>
import ContentList from '../components/ContentList'
import SourceCard from '../components/SourceCard'
import TitleBar from '../components/TitleBar'
export default {
  components: {
    ContentList, SourceCard, TitleBar
  },
  methods: {
    refresh () {

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
      }],
      sourceDatas: [{
        id: 123,
        image: undefined, // 'http://7x2wdd.com2.z0.glb.qiniucdn.com/b87aa0fb55c9b63ea85ee6a03b4a649e?imageMogr2/thumbnail/500%3E',
        name: 'Zhenly'
      }, {
        id: 345,
        image: 'http://7x2wdd.com2.z0.glb.qiniucdn.com/b87aa0fb55c9b63ea85ee6a03b4a649e?imageMogr2/thumbnail/500%3E',
        name: 'Icytown'
      }]
    }
  },
  mounted () {
  }
}
</script>
