<style lang='less'>
  .home {
    color: #fcc;
  }
</style>

<template lang="pug">
  .home this is {{ text }}&nbsp;
    label {{ msg }}

    header(class="header")
      nav(class="inner")
        router-link(:to="{ name: 'detailpage1', params: { id: 123 }}") DetailPage1
        router-link(to="/detail/page2") DetailPage2

      router-view(class="child-view")
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'detail',
    data() {
      return {
        text: 'detail home'
      };
    },
    computed: {
      ...mapState('detail', {
        count: (state) => state.count,
        msg: (state) => state.msg
      })
    },
    asyncData({ store }) {
      return store.dispatch('detail/getData', { num: 33 });
    }
  };
</script>
