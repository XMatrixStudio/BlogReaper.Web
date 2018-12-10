<template>
  <div class="read-later">
    <content-card/>
  </div>
</template>

<style lang="scss">
.read-later {
  text-align: center;
  width: 100%;
  margin: 20px auto;
  display: inline-block;
}
</style>

<script>
import ContentCard from './ContentCard'
export default {
  components: { ContentCard }
}
</script>
