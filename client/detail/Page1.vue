<style lang='less'>
  .page1 {
    color: #cfc;
  }
</style>

<template lang="pug">
  transition(name="fade" mode="out-in")
    .page1 this is {{ text }}
      p userid is {{ userid }}
</template>

<script>
  export default {
    name: 'detailpage1',
    created() {
      console.log('userId:', this.$route.params.id);
    },
    data() {
      return {
        text: 'page1',
        userid: this.$route.params.id
      };
    }
  };
</script>
