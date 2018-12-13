<script>
import TitleBar from '../../components/TitleBar'
import SourceDraw from '../../components/FeedSource/SourceDraw'
import SourceFollow from '../../components/FeedSource/SourceFollow'
export default {
  components: { TitleBar, SourceDraw, SourceFollow },
  data () {
    return {
      showDetail: false,
      sourceData: {
        name: 'Zhenly'
      },
      searchResult: [{
        id: 1,
        name: 'Zhenly',
        url: 'blog.zhenly.cn',
        recent: [{ name: '很菜', url: 'https://www.baidu.com' }, { name: '很菜', url: 'https://www.baidu.com' }]
      }, {
        id: 2,
        name: 'Icytown',
        url: 'blog.zhenly.cn',
        recent: [{ name: '很强', url: 'https://www.baidu.com' }, { name: '很强', url: 'vwww.baidu.com' }]
      }]
    }
  },
  methods: {
    showDrawer (i) {
      this.showDetail = true
      this.sourceData.name = this.searchResult[i].name
    }
  }
}
</script>

<template>
  <div class="add-comp">
    <title-bar title-en="Add Sources" title-cn="添加阅读源" title-color="#7f27e4" :show-refresh="false"/>
    <div class="search-div">
      <Input size="large" class="search-input" search placeholder="主题，网站或者RSS链接"/>
      <div v-if="searchResult.length != 0" class="result-card">
        <p class="result-title">搜索结果：</p>
        <Card class="result-card-box" v-for="(item, index) in searchResult" :key="item.id">
          <div class="result">
            <div class="base-info">
              <Avatar shape="square" size="large">{{item.name[0]}}</Avatar>
              <span class="result-name">{{item.name}}</span>
              <span class="result-url">{{item.url}}</span>
              <source-follow class="follow-btn"/>
              <Button class="follow-btn" icon="md-eye" @click="showDrawer(index)">查看</Button>
            </div>
            <div class="recent">最近文章:</div>
            <ul class="recent-list">
              <li v-for="(post, index) in item.recent" :key="index">
                <a target="blank" :href="post.url">{{post.name}}</a>
              </li>
            </ul>
          </div>
        </Card>
        <Page :total="searchResult.length"/>
      </div>
    </div>
    <Drawer title="阅读源" width="550" :closable="true" v-model="showDetail">
      <source-draw :source-data="sourceData"/>
    </Drawer>
  </div>
</template>

<style lang="scss">
.add-comp {
  text-align: center;
  width: 100%;
  margin: 20px auto;
  display: inline-block;
  .search-div {
    max-width: 600px;
    margin: 20px auto;
    .result-card {
      margin-top: 40px;
      .result-card-box {
        margin-bottom: 20px;
      }
      .result-title {
        text-align: left;
        font-size: 16px;
        margin: 20px auto;
      }
      .result {
        text-align: left;
        .recent {
          font-size: 14px;
          margin: 20px 0 10px 0;
        }
        .recent-list {
          margin-left: 20px;
        }
        .base-info {
          .ivu-avatar {
            user-select: none;
          }
          .result-name {
            font-size: 18px;
            font-weight: bold;
            vertical-align: middle;
            margin-left: 20px;
          }
          .result-url {
            color: rgb(117, 117, 117);
            vertical-align: middle;
            font-size: 14px;
            margin-left: 20px;
          }
          .follow-btn {
            margin-left: 10px;
            float: right;
          }
        }
      }
    }
  }
}
</style>
