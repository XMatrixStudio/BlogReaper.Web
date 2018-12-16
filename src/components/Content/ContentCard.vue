<script>
export default {
  props: {
    content: {
      require: true
    },
    showLater: {
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    publishedDate () {
      return new Date(this.content.published)
    },
    htmlText () {
      if (this.content === undefined || this.content.summary === undefined) return ''
      let text = this.content.summary !== '' ? this.content.summary : this.content.content
      return text.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/\s+/g, ' ')
    },
    imageUrl () {
      let pictureUrl = this.content.pictureUrl
      if (pictureUrl === '' || pictureUrl === undefined) return require('../../assets/icon.svg')
      if (pictureUrl.indexOf('http') === -1) {
        let url = this.content.url
        let host = url.substr(0, url.substr(url.indexOf('//') + 2).indexOf('/') + url.indexOf('//') + 2)
        return host + pictureUrl
      }
      return pictureUrl
    }
  },
  methods: {
    ToText (HTML) {
      var input = HTML
      if (input === undefined) return ''

      return input
        .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '')
        .replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ')
        .replace(/>/g, ' ').replace(/&#39;/g, '').substr(0, 100)
    },

    async editLater (later) {
      await this.$service.articles.setLater.call(this, {
        url: this.content.url,
        feedId: this.content.feedId,
        later: later
      }, () => {
        this.content.later = later
        if (later === true) {
          this.$Notice.success({
            title: '已添加到稍后阅读'
          })
        }
      })
    }
  }
}
</script>

<template>
  <div class="content-comp">
    <div class="title-text">
      {{content.title}}
      <div class="control-box" v-if="showLater">
        <div class="btn-bookmark" title="稍后阅读">
          <Icon
            @click="editLater(false)"
            v-if="content.later"
            class="has-later"
            type="ios-bookmark"
          />
          <Icon
            @click="editLater(true)"
            v-if="!content.later"
            class="no-later"
            type="ios-bookmark"
          />
        </div>
      </div>
    </div>
    <div class="info-text">
      <span v-if="content.feedTitle !== ''">{{content.feedTitle}} /</span>

      <Time :time="publishedDate"/>
      <a target="blank" :href="content.url">阅读原文</a>
    </div>
    <div class="div-image">
      <img class="image" :src="imageUrl">
    </div>
    <div class="div-text">{{ToText(content.summary)}}</div>
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
  transition: all 0.4s;
  &:hover {
    .title-text > .control-box > .btn-bookmark > .no-later {
      opacity: 1;
    }
    .title-text {
      transform: translateX(4px);
    }
  }
  .title-text {
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    margin: 15px 0 0 0;
    transition: all 0.4s;
    .control-box {
      float: right;
      color: rgb(133, 133, 133);
      .btn-bookmark {
        font-size: 24px;
        transition: all 0.4s;
        &:hover {
          display: inline-block;
          color: #52c071;
        }
        .has-later {
          color: #52c071;
        }
        .no-later {
          opacity: 0;
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    max-height: 140px;
  }
}
</style>
