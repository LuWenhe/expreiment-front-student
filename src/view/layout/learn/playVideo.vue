<template>
  <div class="background">
    <div>
      <el-row>
        <el-col :span="14" :offset="6">
          <div class="video-box">
            <div class="video">
              <!--这里即是引用的组件，外层css可以修饰播放器的样式-->
              <video-js :options="videoOptions" class="video-css"/>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import VideoJs from "@/view/layout/learn/VideoJs";
import 'video.js/dist/video-js.css';

export default {
  name: "playVideo",
  components: {
    VideoJs,
  },
  data(){
    return{
      videoOptions: {
        controls: true,//开启交互，即是用户可控。
        muted: true,//开启视频时是否静音
        fluid: true,//根据外层css样式大小，自动填充宽高！比较实用，可搭配响应式
        reload: "auto",//重载
        //其余设置根据需求添加！
        poster: require('@/assets/icon.jpg'),//视频封面
        sources: [//视频播放源，建议本地
          {
            src: 'http://localhost:4040/10dced0c-5bd0-4002-baf7-c3d12da85a57.mp4',
            type: "video/mp4"
          }
        ]
      }
    }
  },
  created() {
    console.log(this.$route.query.mp4)
    this.videoOptions.sources[0].src = this.$route.query.mp4;
  },
  methods: {

  },

}
</script>

<style scoped>
.background{
  background: linear-gradient(to right, #c2e59c, #64b3f4);
  width: 100%;
  height: calc(100vh - 57px);
}
.welcome-row{
  width: 100%;
  text-align: center;
  margin-top: 36px;
}
.welcome{
  color: white;
  font-size: 64px;
  font-weight: 600;
  font-family: helveticaneuew01-75bold,sans-serif;
}

.video-box{
  width: 100%;
  min-width: 456px;
  height: 100%;
  border-radius: 20px;
  background-color: rgba(255,255,255,1);
  box-shadow: 0 2px 4px rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}
.video{
  width: 92%;
}
.video-css{
  width: 100%;
  height: 100%;
}
</style>

