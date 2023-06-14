<template>
  <div id="allLesson">
    <div>
      <iframe style="width: 100%;height: 1000px" name="iframeLinux" id='iframeId' v-if='load'
              :src='this.$route.query.jupterUrl' frameborder='0' scrolling='auto'></iframe>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ToWebIDEPage',
  data() {
    return {
      load: true,
    }
  },
}
</script>

<style scoped>
#allLesson {
  width: 80%;
  height: 100%;
  margin-left: 15%;

}
</style>
