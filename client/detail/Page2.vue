<style lang='less'>
  .home {
    color: #ccf;
  }
</style>

<template lang="pug">
  .home this is {{ text }}
    input(:value=text)
    button(class="btn") click
</template>

<script>
export default {
  name: 'page2',
  props: ['text']
};
</script>
