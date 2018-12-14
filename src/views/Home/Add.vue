<script>
import TitleBar from '../../components/TitleBar'
import SourceDraw from '../../components/FeedSource/SourceDraw'
import SourceFollow from '../../components/FeedSource/SourceFollow'
export default {
  components: { TitleBar, SourceDraw, SourceFollow },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  data () {
    return {
      showDetail: false,
      searchText: '',
      sourceData: {
        name: 'Zhenly'
      },
      searchResult: [],
      helpText: '快去搜索点东西吧'
    }
  },
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
      return followed
    },

    showDrawer (i) {
      this.showDetail = true
      this.sourceData.name = this.searchResult[i].name
    },

    async onSearch () {
      if (this.searchText.indexOf('http') !== -1) {
        await this.$service.feed.addPublicFeedOrNot.call(this, {
          url: this.searchText
        }, (result) => {
          this.searchResult = []
          this.searchResult.push(result.data.addPublicFeedOrNot)
        }, () => {
          this.helpText = '无法解析这个东西'
        })
      } else {
        // 搜索关键字h
        await this.$service.feed.search.call(this, {
          keyword: this.searchText
        }, (result) => {
          this.searchResult = []
          this.searchResult = result.data.feeds
          if (this.searchResult.length === 0) this.helpText = '找不到东西'
        }, () => {
          this.searchResult = []
          this.helpText = '快去搜点东西吧'
        })
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
      <div v-if="searchResult.length === 0" class="nothing-box">
        <img src="../../assets/nothing.svg">
        <p>{{helpText}}🐷</p>
      </div>
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
              <source-follow
                :current-data="isFollow(item.publicId)"
                :public-id="item.publicId"
                class="follow-btn"
              />
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

  .nothing-box {
    font-size: 18px;
    p {
      user-select: none;
      margin: 20px;
    }
  }
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
