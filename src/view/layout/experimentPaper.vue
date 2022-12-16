<template>
  <video autoplay controls width="100%" height="500" id="videoElement"></video>


</template>

<script>
import flvjs from 'flv.js'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    this.$nextTick(() => {
      this.createVideo()
    })
  },
  methods: {
    createVideo() {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: 'http://127.0.0.1:8000/live/home' //你的url地址
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    }
  }

}
</script>

<style scoped>

</style>
