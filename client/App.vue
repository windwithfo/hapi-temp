<style lang="less">
  .header {
    margin-bottom: 20px;
  }

  .inner {
    font-size: 20px;

    a {
      margin-right: 40px;
      color: #fcc;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .child-view {
    position: absolute;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>

<template lang="pug">
  #app
    header(class="header")
      nav(class="inner")
        router-link(to="/" exact)
        router-link(to="/index") Home
        router-link(to="/detail") Detail

    transition(name="slide-left")
      router-view(class="child-view")
</template>

<script>
  export default {
    name: 'app'
  };
</script>
