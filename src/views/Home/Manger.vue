<template>
  <div class="manger-comp">
    <title-bar title-en="Organize Sources" title-cn="阅读源管理" title-color="#e7a4c4" :show-refresh="false"/>
    <div class="search-box">
      <Button id="unfollow" class="btn" ref="unfollow"><Icon class="btn-icon" type="ios-trash-outline"/><span class="btn-text">UNFOLLOW</span></Button>
      <strong id="selected-text" ref="selectedText">{{selected_num}}</strong>
    </div>
    <Table ref="selection" size="large" class="source-table" :columns="columns" :data="data1"
            @on-selection-change="changeChose"
            @on-select="getTableChosedValue"
            @on-select-all="selectAll"></Table>
  </div>
</template>

<style lang="scss">
.manger-comp {
  text-align: center;
  width: 100%;
  margin: 20px auto;
  display: inline-block;
  .source-table {
    max-width: 600px;
    margin: 15px auto 10px auto;
  }
  .search-box {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
    text-align: left;
    .search {
      display: block;
      width: 200px;
    }
  }
}

.source-box {
  margin-bottom: 10px;
  position: relative;
}
.head-image {
  width: 50px;
  height: 50px;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-right: 20px;
}
.source-name {
  display: inline-block;
  position: relative;
  bottom: 30px;
}
.trash-icon {
  font-size: 20px;
}
.btn-icon {
  font-size: 15px;
  margin-right: 10px;
}
.btn-text {
  margin-top: 5px;
}
#selected-text {
  position: relative;
  top: 8px;
  font-size: 15px;
  display: inline-block;
  margin-left: 20px;
  opacity: 0;
}
#unfollow {
  display: inline-block;
  margin-top: 15px;
  opacity: 0;
}
</style>

<script>
import TitleBar from '../../components/TitleBar'
export default {
  components: { TitleBar },
  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: 'Source Name',
          key: 'name',
          width: 280,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('img', {
                class: {
                  'head-image': true
                },
                attrs: {
                  src: params.row.img
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
          key: 'stories',
          sortable: true
        },
        {
          title: 'Reads',
          key: 'reads',
          sortable: true
        },
        {
          title: ' ',
          key: 'action',
          align: 'center',
          width: 60,
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                class: {
                  'trash-icon': true
                },
                props: {
                  type: 'ios-trash-outline'
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
          reads: 2,
          img: 'http://img.hb.aicdn.com/007c910095e3cdc0293cebc1d84b08dbac01cb24159ce-JYDpS7_fw658'
        },
        {
          name: 'Haaa',
          stories: 2,
          reads: 0,
          img: 'http://img.hb.aicdn.com/aa38a6ac44345f733067c999a74be222fb4d979467660-jOoJUl_fw658'
        },
        {
          name: 'CTP',
          stories: 30,
          reads: 1,
          img: 'http://img.hb.aicdn.com/39460095a1be72702a8e104443fef79514fa7e1e4f3c-I19CMi_fw658'
        },
        {
          name: '天王盖地虎',
          stories: 6,
          reads: 999,
          img: 'http://img.hb.aicdn.com/c2e0966db1e7971f235019db59a279add0fef99a136e2-Sdjq1A_fw658'
        }
      ],
      selected_num: 'Select 0 of'
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
    },
    changeChose (selection) {
      this.selected_num = 'Select ' + selection.length + ' of ' + this.data1.length
      if (selection.length === 0) {
        this.$refs.unfollow.$el.style.opacity = 0
        this.$refs.selectedText.style.opacity = 0
      } else {
        this.$refs.unfollow.$el.style.opacity = 1
        this.$refs.selectedText.style.opacity = 1
      }
    },
    getTableChosedValue (selection, row) {

    },
    selectAll (selection) {

    }
  }
}
</script>
