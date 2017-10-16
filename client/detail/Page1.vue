<style lang='less'>
  .home {
    color: #cfc;
  }
</style>

<template lang="pug">
  .home this is {{ text }}
    p userid is {{ userid }}
</template>

<script>
export default {
  name: 'page1',
  props: ['text', 'userid']
};
</script>
