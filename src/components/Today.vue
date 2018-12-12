<template>
  <div class="today-comp">
    <div class="title-box">
      <div class="title-top">Today</div>
      <div class="title">今日阅读
        <div class="list-control">
          <Icon class="btn-refresh" type="md-refresh"/>
          <Icon class="btn-refresh" type="ios-more"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.today-comp {
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
}
</style>
