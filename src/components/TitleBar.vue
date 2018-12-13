<script>
export default {
  props: {
    titleCn: {
      required: true
    },
    titleEn: {
      required: true
    },
    titleColor: {
      required: true
    },
    showRefresh: {
      default: true
    },
    showMenu: {
      default: false
    }
  },
  methods: {
    onClickRefresh () {
      this.$emit('on-refresh')
    },
    onClickRemove () {
      this.$emit('on-remove')
    },
    onClickRename () {
      this.$emit('on-rename')
    }
  },
  data () {
    return {
    }
  }
}
</script>

<template>
  <div class="title-bar">
    <div class="title-box">
      <div class="title-top">{{titleEn}}</div>
      <div class="title" :style="{borderLeft: '6px solid ' + titleColor}">
        {{titleCn}}
        <div class="list-control">
          <Tooltip content="刷新" placement="bottom">
            <Icon v-if="showRefresh" class="btn-refresh" type="md-refresh" @click="onClickRefresh"/>
          </Tooltip>

          <Tooltip content="重命名" placement="bottom">
            <Icon v-if="showMenu" class="btn-refresh" type="md-create" @click="onClickRename"/>
          </Tooltip>

          <Tooltip content="删除" placement="bottom">
            <Icon v-if="showMenu" class="btn-refresh" type="md-trash" @click="onClickRemove"/>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.title-bar {
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
      margin: 0 auto 10px auto;
      max-width: 600px;
      text-align: left;
      font-size: 28px;
      padding-left: 10px;
      font-weight: bold;
      border-left: 6px solid #52c071;
      i {
        vertical-align: middle;
      }
      .list-control {
        float: right;
        .btn-refresh {
          margin-left: 10px;
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
}
</style>
