<style lang="less">
  div {
    color: #ccc;

    p {
      color: #999;
    }
  }
</style>

<template lang="pug">
  .hello
    p(class="title") Hello World!
    p By Emiya
    p page say: {{text}}
</template>

<script>
  export default {
    name: 'hello',
    props: ['text']
  };
</script>
