<style lang='less'>
  .home {
    color: #fcc;
  }
</style>

<template lang="pug">
  .home this is {{ text }}
</template>

<script>
export default {
  name: 'home',
  props: ['text']
};
</script>
