<template>
  <div class="add-comp">
    <title-bar title-en="Add Sources" title-cn="添加阅读源" title-color="#7f27e4" :show-refresh="false"/>
    <div class="search-div">
      <Input size="large" class="search-input" search placeholder="主题，网站或者RSS链接"/>
      <div class="result-card">
        <p class="result-title">搜索结果：</p>
        <Card>
          <div class="result">
            <div class="base-info">
              <Avatar shape="square" size="large">Z</Avatar>
              <span class="result-name">Zhenly</span>
              <span class="result-url">blog.zhenly.cn</span>
              <Poptip class="follow-btn" placement="bottom">
                <Button icon="md-add">关注</Button>
                <div class="title" slot="title">添加到分类</div>
                <div class="content" slot="content">
                  <div class="select-item">
                    <div class="class-item">Hello</div>
                    <Divider/>
                    <div class="class-item new-class">
                      <Icon type="md-add"/>新建分类
                    </div>
                  </div>
                  <div class="add-class">

                  </div>
                </div>
              </Poptip>
              <Button class="follow-btn" icon="md-eye" @click="showDetail = true">查看</Button>
            </div>
            <div class="recent">最近文章:</div>
          </div>
        </Card>
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
    margin: 20px 40px 20px 40px;
    .result-card {
      margin-top: 40px;
      .result-title {
        text-align: left;
        font-size: 16px;
        margin: 20px auto;
      }
      .result {
        text-align: left;
        .recent {
          font-size: 14px;
          margin-top: 20px;
        }
        .base-info {
          .ivu-avatar {
            user-select: none;
          }
          .result-name {
            vertical-align: middle;
            font-size: 18px;
            font-weight: bold;
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
            .title {
              font-size: 14px;
            }
            .content {
              min-width: 160px;
              .select-item {

              }
              .add-class {

              }
              .ivu-divider-horizontal {
                margin: 10px 0;
              }
              .class-item {
                padding: 10px;
                border-radius: 3px;
                user-select: none;
                font-size: 14px;
                transition: all 0.4s;
                &:hover {
                  background: rgba(192, 192, 192, 0.377);
                }
              }
              .new-class {
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<script>
import TitleBar from '../../components/TitleBar'
import SourceDraw from '../../components/FeedSource/SourceDraw'
export default {
  components: { TitleBar, SourceDraw },
  data () {
    return {
      showDetail: false,
      sourceData: {
        name: 'Zhenly'
      }
    }
  }
}
</script>
