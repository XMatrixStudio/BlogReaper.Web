<template>
  <div class="home-page">
    <Layout>
      <Sider class="sider" hide-trigger>
        <silde-menu/>
      </Sider>
      <div class="content">
        <router-view/>
      </div>
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
  .sider {
    background: #fff;
  }
  .content {
    width: 100%;
    min-height: 240px;
    background: #ffffffc0;
    padding: 0 30px;
  }
}
</style>

<script>
import gql from 'graphql-tag'
import SildeMenu from '../components/Content/SildeMenu'
export default {
  components: {
    SildeMenu
  },
  data () {
    return {
    }
  },

  async mounted () {
    try {
      const result = await this.$apollo.query({
        query: gql`query {
          categories {
            id
            name
            feeds {
              id
              title
            }
          }
        }`
      })
      this.$store.commit('updateCategory', result.data)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
