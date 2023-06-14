<template>
  <div>
    <div v-for="(item,index) in chapter" :key="index">
      <div class='secondCard'>
        <br>
        <div>
          <div style='float: left;margin-left: 20px'><span class='chapter-index'>{{ item.chapter_no }}</span> &nbsp;<span><b>{{item.chapter_name}}</b></span></div>
          <br>
        </div>
        <br>
        <hr>
        <br>
        <div style='margin-left: 20px'>
          <span>{{item.description}}</span>
          <br>
          <br>
          <div v-for="(item1,index) in item.sonChapterList" :key="index">
            <div style='float: left;'>
              <span> {{item1.son_no}} &nbsp;{{item1.son_name}} &nbsp;&nbsp; <button @click="toPlayVideo(item1.mp4)"> <i class="el-icon-video-play">视频</i> </button>
              <button @click="downPPT(item1.ppt)"> <i class="el-icon-download">PPT</i> </button>
              </span>
            </div>
              <div style='float: right'>
                <el-button  @click="toJupyterPage(item1.son_id)"><i class="el-icon-edit">jupyter实验</i></el-button>
              </div>
            <br>
            <br>
          </div>
          <br>
          <br>
        </div>
      </div>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import {getDynamicExpUrl} from "@/network/api/jupyter"
import {getChapterInfo} from "@/network/api/lesson"

export default {
  name: 'chapterList',
  props: ['lessonId'],
  data() {
    return {
      lesson_id : this.lessonId,    // 把传过来的值赋值给新的变量
      chapter:[],
    }
  },
  created() {
    this.getChapterInfoByLessonId()
  },
  watch: {
    lessonId(val) {
      this.lesson_id = val //对父组件传过来的值进行监听，如果改变也对子组件内部的值进行改变
    }
  },
  methods: {
    toPlayVideo(mp4){
      this.$router.push({name:'playVideo',query:{mp4:mp4}})
    },
    downPPT(ppt){
      window.open(ppt)
    },
    toWebIDEPage(exp_url,son_id){
      this.$router.push({name: "ToWebIDEPage", query: {isHasUrl: false, jupterUrl: exp_url, sonId: son_id}});
    },
    toJupyterPage(son_id){
      let sonUserExpObj = {
        user_id: localStorage.getItem("user_id"),
        son_id: son_id,
        lessonId: this.lesson_id
      }

      getDynamicExpUrl(sonUserExpObj).then(res => {
        let dataObj = res.data
        let jupyterUrl = dataObj.exp_url
        let id = dataObj.id

        this.$router.push({
          name: 'ToJupyterPage',
          query: {
            jupyterUrl: jupyterUrl,
            id: id,
            sonId: son_id
          }
        })
      })
    },
    getChapterInfoByLessonId(){
      getChapterInfo(this.lesson_id).then(res => {
        if (res.code === '200') {
          this.chapter = res.data
        } else {
          this.$message.error("加载失败")
        }
      })
    }
  }
};
</script>

<style scoped>
.secondCard{
  background-color: white;
  height: auto;
  width: 60%;
  margin-left: 20px;
}
.chapter-index{
  display: inline-block;
  line-height: 30px;
  text-align: center;
  background-color: #fdf5e6;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 12px;
}
</style>
