<style lang='less'>
  .index {
    color: #fcc;
  }
</style>

<template lang="pug">
  .index
    Hello(text="index")
    | this is {{ text }}&nbsp;
    label {{ count }}
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Hello                    from 'component/Hello';

  export default {
    name: 'home',
    components: { Hello },
    data() {
      return {
        text: 'index'
      };
    },
    computed: {
      ...mapState('home', {
        count: (state) => state.count,
        msg: (state) => state.msg
      })
    },
    created() {
      // console.log(this.count);
      // console.log(this.msg);
    },
    mounted() {
      // this.getData({ num: 21 });
      console.log('mounted');
    },
    asyncData({ store }) {
      return store.dispatch('home/getData', { num: 21 });
    },
    methods: {
      ...mapActions('home', ['getData'])
    }
  };
</script>
