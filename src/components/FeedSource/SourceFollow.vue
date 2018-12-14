<script>
export default {
  data () {
    return {
      isAdd: false,
      newCategoryName: '',
      visible: false
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  mounted () {

  },
  methods: {
    async addCategory () {
      await this.$service.category.add.call(this, this.newCategoryName,
        (result) => {
          console.log(result)
          this.isAdd = false
        },
        (error) => {
          console.log(error.message)
          if (error.message.indexOf('repeat_name') !== -1) {
            this.$Notice.error({
              title: '重复的分类'
            })
          }
        })
      await this.$service.category.update.call(this)
      this.newCategoryName = ''
    },
    switchAdd () {
      this.isAdd = true
      this.$nextTick(() => {
        this.$refs.newNameInput.focus()
      })
    }
  }
}
</script>

<template>
  <div class="follow-div">
    <Poptip placement="bottom" v-model="visible">
      <Button icon="md-add" @click="isAdd = false">关注</Button>
      <div class="title" slot="title">{{isAdd ? '新建分类': '添加到分类'}}</div>
      <div class="content" slot="content">
        <div v-if="!isAdd" class="select-item">
          <div class="list-item">
            <div
              class="class-item"
              v-for="category in categories"
              :key="category.id"
            >{{category.name}}</div>
          </div>
          <div v-if="false" class="class-item">Hello
            <div class="right-btn">
              <Button class="had-add-btn" type="success" size="small">已添加</Button>
              <Button class="remove-btn" type="warning" size="small">移除</Button>
            </div>
          </div>
          <Divider/>
          <div @click="switchAdd" class="class-item new-class">
            <Icon type="md-add"/>新建分类
          </div>
        </div>
        <div v-if="isAdd" class="add-class">
          <div>
            <Input
              ref="newNameInput"
              v-model="newCategoryName"
              @on-enter="addCategory"
              class="add-input"
              placeholder="分类名"
              :autofocus="true"
            />
          </div>
          <Button class="control-btn" @click="addCategory">
            <Icon type="md-add"/>新建分类
          </Button>
          <Button class="control-btn" @click="isAdd = false">取消</Button>
        </div>
      </div>
    </Poptip>
  </div>
</template>

<style lang="scss">
.follow-div {
  display: inline-block;
  .title {
    user-select: none;
    font-size: 14px;
  }
  .content {
    min-width: 160px;
    .select-item {
      .list-item {
        max-height: 140px;
        overflow-y: auto;
      }
      .class-item {
        cursor: pointer;
        padding: 8px;
        border-radius: 6px;
        user-select: none;
        font-size: 14px;
        transition: all 0.4s;
        &:hover {
          background: rgba(192, 192, 192, 0.377);
          .right-btn {
            .remove-btn {
              display: inline;
            }
            .had-add-btn {
              display: none;
            }
          }
        }
        .right-btn {
          float: right;
          .had-add-btn {
            display: inline;
          }
          .remove-btn {
            display: none;
          }
        }
      }
      .new-class {
        font-weight: bold;
      }
      .ivu-divider-horizontal {
        margin: 10px 0;
      }
    }
    .add-class {
      .control-btn {
        margin: 10px 5px 6px 0;
      }
    }
  }
}
</style>
