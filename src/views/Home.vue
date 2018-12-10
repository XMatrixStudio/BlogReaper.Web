<template>
  <div class="home-page">
    <Layout>
      <Sider class="sider" hide-trigger>
        <silde-menu :menu-item="menuItem"/>
      </Sider>
      <div class="content">Content</div>
      <!-- <Content >Content</Content> -->
    </Layout>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  text-align: left;
  .sider{
    background: #fff;
  }
  .content {
    width: 100%;
    min-height: 240px;
    background: #ffffffc0;
    padding: 30px;
  }
}
</style>

<script>
import SildeMenu from '../components/SildeMenu'
export default {
  components: {
    SildeMenu
  },
  data () {
    return {
      split: 0.2,
      menuItem: {
        id: 0,
        title: '全部',
        expand: true,
        category: [
          {
            id: 1,
            title: '博客',
            expand: true,
            subItem: [{ id: 2, title: 'Icytowm' }, { id: 8, title: 'Icytowm' }, { id: 9, title: 'Icytowm' }, { id: 3, title: 'Zhenly' }]
          },
          {
            id: 4,
            title: '新闻',
            expand: false,
            subItem: [{ id: 5, title: 'IT Home' }, { id: 6, title: 'Github' }]
          }
        ]
      }
    }
  }
}
</script>
