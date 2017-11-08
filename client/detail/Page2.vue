<style lang='less'>
  .page2 {
    color: #ccf;
  }
</style>

<template lang="pug">
  transition(name="fade" mode="in-out")
    .page2 this is {{ text }}
      br
      input(v-model:value.trim="text")
      button(class="btn" @click="showText") click
</template>

<script>
  export default {
    name: 'detailpage2',
    data() {
      return {
        text: 'page2'
      };
    },
    methods: {
      showText() {
        console.log(this.text);
      }
    }
  };
</script>
