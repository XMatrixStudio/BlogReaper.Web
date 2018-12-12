<template>
  <div class="manger-comp">
    <div class="title-box">
      <div class="title-top">Organize Sources</div>
      <div class="title">阅读源管理
        <div class="list-control">
          <Icon class="btn-refresh" type="md-refresh"/>
          <Icon class="btn-refresh" type="ios-more"/>
        </div>
      </div>
    </div>
    <Table size="large" class="source-table" :columns="columns" :data="data1"></Table>
  </div>
</template>

<style lang="scss">
.manger-comp {
  text-align: center;
  width: 100%;
  margin: 20px auto;
  display: inline-block;
  .title-box {
    .title-top {
      user-select: none;
      text-align: left;
      max-width: 600px;
      margin: 0 auto 10px auto;
      font-size: 16px;
      color: rgb(185, 184, 184);
    }
    .title {
      user-select: none;
      margin: 0 auto 35px auto;
      max-width: 600px;
      text-align: left;
      font-size: 28px;
      padding-left: 10px;
      font-weight: bold;
      border-left: 6px solid #34a1a5;
      i {
        vertical-align: middle;
        margin-right: 10px;
      }
      .list-control {
        float: right;
        .btn-refresh {
          cursor: pointer;
          color: #757575;
          border-radius: 6px;
          font-size: 24px;
          padding: 8px;
          transition: all 0.4s;
          &:hover {
            background: #f1f1f1;
          }
        }
      }
    }
  }
  .source-table {
    max-width: 600px;
    margin: 30px auto 10px auto;
  }
}
.source-box {
  margin-bottom: 10px;
  position: relative;
}
.head-image {
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 20px;
}
.source-name {
  display: inline-block;
  position: relative;
  bottom: 30px;
}
</style>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: 'Source Name',
          key: 'name',
          width: 300,
          render: (h, params) => {
            return h('div', [
              h('img', {
                class: {
                  'head-image': true
                },
                attrs: {
                  src: 'http://7x2wdd.com2.z0.glb.qiniucdn.com/b87aa0fb55c9b63ea85ee6a03b4a649e?imageMogr2/thumbnail/500%3E'
                }
              }),
              h('strong', {
                class: {
                  'source-name': true
                }
              }, params.row.name)
            ], {
              class: {
                'source-box': true
              }
            })
          }
        },
        {
          title: 'Stories',
          key: 'stories'
        },
        {
          title: 'Reads',
          key: 'reads'
        },
        {
          title: 'Action',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ],
      data1: [
        {
          name: 'Zhenly',
          stories: 1,
          reads: 2
        },
        {
          name: 'Haaa',
          stories: 2,
          reads: 0
        },
        {
          name: 'CTP',
          stories: 30,
          reads: 1
        },
        {
          name: '天王盖地虎',
          stories: 6,
          reads: 999
        }
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data1[index].name}<br>Age：${this.data1[index].age}<br>Address：${this.data1[index].address}`
      })
    },
    remove (index) {
      this.data1.splice(index, 1)
    }
  }
}
</script>
