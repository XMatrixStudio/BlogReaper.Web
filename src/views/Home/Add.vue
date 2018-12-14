<script>
import TitleBar from '../../components/TitleBar'
import SourceDraw from '../../components/FeedSource/SourceDraw'
import SourceFollow from '../../components/FeedSource/SourceFollow'
export default {
  components: { TitleBar, SourceDraw, SourceFollow },
  data () {
    return {
      showDetail: false,
      searchText: '',
      sourceData: {
        name: 'Zhenly'
      },
      searchResult: [{
        'id': '',
        'publicId': '5c13a9cc94fa356eec73cd52',
        'url': 'https://icytown.com/atom.xml',
        'title': '冰镇',
        'subtitle': '千万世界的一个小小埃希镇',
        'follow': 0,
        'articles': [
          {
            'title': 'LeetCode | 135 Candy',
            'url': 'https://icytown.com/leetcode/135-candy/'
          },
          {
            'title': 'LeetCode | 97 Interleaving String',
            'url': 'https://icytown.com/leetcode/97-interleaving-string/'
          },
          {
            'title': 'LeetCode | 87 Scramble String',
            'url': 'https://icytown.com/leetcode/87-scramble-string/'
          },
          {
            'title': 'Go | Muxie，一个路由框架的源码分析',
            'url': 'https://icytown.com/go/muxie-analysis/'
          },
          {
            'title': 'LeetCode | 72 Edit Distance',
            'url': 'https://icytown.com/leetcode/72-edit-distance/'
          }]
      }]
    }
  },
  methods: {
    showDrawer (i) {
      this.showDetail = true
      this.sourceData.name = this.searchResult[i].name
    },

    async onSearch () {
      if (this.searchText.indexOf('http') !== -1) {
        await this.$service.feed.addPublicFeedOrNot.call(this, {
          url: this.searchText
        },
        (result) => {
          console.log(result.data.addPublicFeedOrNot)
        })
      } else {
        // 搜索关键字
      }
    },

    parseUrl (url) {
      let host = url.substr(url.indexOf('//') + 2).split('/')[0]
      return host
    }
  }
}
</script>

<template>
  <div class="add-comp">
    <title-bar title-en="Add Sources" title-cn="添加阅读源" title-color="#7f27e4" :show-refresh="false"/>
    <div class="search-div">
      <Input
        size="large"
        class="search-input"
        search
        v-model="searchText"
        placeholder="主题，网站或者RSS链接"
        :autofocus="true"
        @on-search="onSearch"
      />
      <div v-if="searchResult.length != 0" class="result-card">
        <p class="result-title">搜索结果：</p>
        <Card class="result-card-box" v-for="(item, index) in searchResult" :key="item.publicId">
          <div class="result">
            <div class="base-info">
              <Avatar>{{item.title[0]}}</Avatar>
              <div class="result-name">
                {{item.title}}
                <a
                  :title="item.url"
                  target="blank"
                  :href="item.url"
                  class="result-url"
                >{{parseUrl(item.url)}}</a>
                <div v-if="item.subtitle !== undefined" class="sub-title">{{item.subtitle}}</div>
              </div>
              <source-follow class="follow-btn"/>
              <Button class="follow-btn" icon="md-eye" @click="showDrawer(index)">查看</Button>
            </div>
            <div class="recent">
              <div class="follow">关注人数：{{item.follow}}</div>
              <Divider orientation="left">最近文章</Divider>
              <ul class="recent-list">
                <li v-for="post in item.articles" :key="post.title">
                  <a target="blank" :href="post.url">{{post.title}}</a>
                </li>
                <li>
                  <a target="blank" :href="item.url">...</a>
                </li>
              </ul>
            </div>
          </div>
        </Card>
        <!-- <Page :total="searchResult.length"/> -->
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
        min-width: 460px;
        margin-bottom: 20px;
      }
      .result-title {
        text-align: left;
        font-size: 16px;
        margin: 20px auto;
      }
      .result {
        text-align: left;
        .sub-title {
          color: rgb(126, 126, 126);
          font-size: 12px;
          font-weight: normal;
        }
        .recent {
          user-select: none;
          font-size: 14px;
          .follow {
            margin-top: 16px;
          }
        }
        .recent-list {
          display: inline-block;
          max-width: 400px;
          margin-left: 20px;
        }
        .base-info {
          .ivu-avatar {
            user-select: none;
          }
          .result-name {
            display: inline-block;
            font-size: 18px;
            font-weight: bold;
            vertical-align: middle;
            margin-left: 20px;
          }
          .result-url {
            color: rgb(117, 117, 117);
            vertical-align: middle;
            font-size: 14px;
            margin-left: 5px;
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
