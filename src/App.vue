<template>
  <div id="app">
    <router-view v-if="isRouterAlive" ></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style>

*{
  padding: 0;
  margin: 0;

}
html,body,#app{
  height: 100%;
  width: 100%;

}
/* #app{
  background-color: rgb(237, 239, 242);
} */
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>
