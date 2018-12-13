<script>
export default {
  data () {
    return {
      isAdd: false
    }
  }
}
</script>

<template>
  <div class="follow-div">
    <Poptip placement="bottom">
      <Button icon="md-add" @click="isAdd = false">关注</Button>
      <div class="title" slot="title">{{isAdd ? '新建分类': '添加到分类'}}</div>
      <div class="content" slot="content">
        <div v-if="!isAdd" class="select-item">
          <div class="class-item">World
          </div>
          <div class="class-item">Hello
            <div class="right-btn">
              <Button class="had-add-btn" type="success" size="small">已添加</Button>
              <Button class="remove-btn" type="warning" size="small">移除</Button>
            </div>
          </div>
          <Divider/>
          <div @click="isAdd = true" class="class-item new-class">
            <Icon type="md-add"/>新建分类
          </div>
        </div>
        <div v-if="isAdd" class="add-class">
          <div>
            <Input class="add-input" placeholder="分类名"/>
          </div>
          <Button class="control-btn">
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
      .class-item {
        cursor: pointer;
        padding: 10px;
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
        margin: 6px 5px 6px 0;
      }
    }
  }
}
</style>
