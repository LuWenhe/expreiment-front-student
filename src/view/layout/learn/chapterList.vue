<template>
  <el-row class="chapter-container">
    <el-row class="son-chapter-box" v-for="(item, index) in chapter" :key="index">
      <!-- 章节标题 -->
      <el-row class="chapter-title">
        <span class='chapter-number'>{{ item.chapter_no }}</span>
        <span><b>{{ item.name }}</b></span>
      </el-row>
      <!-- 章节内容 -->
      <el-row v-if='item.sonChapterList.length > 0' class="son-chapter">
        <el-row class="son-chapter-item" v-for="(sonItem, index) in item.sonChapterList" :key="index">
          <el-row class="left">
            <span>{{ sonItem.son_no }} {{ sonItem.name }}</span>
          </el-row>
          <el-row class="right">
            <el-button size="small" @click="toPlayVideo(sonItem.mp4)"> <i class="el-icon-video-play">视频</i> </el-button>
            <el-button size="small" @click="downPPT(sonItem.ppt)"> <i class="el-icon-download">PPT</i> </el-button>
            <el-button size="small" @click="toJupyterPage(sonItem.id)">
              <i class="el-icon-edit">jupyter实验</i>
            </el-button>
          </el-row>
        </el-row>
      </el-row>
      <el-row v-else class='son-chapter'>
        <span>无数据</span>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import {getDynamicExpUrl} from "@/network/api/jupyter"
import {getChapterInfo} from "@/network/api/lesson"

export default {
  name: 'chapterList',
  props: ['lessonId'],
  data() {
    return {
      lesson_id: this.lessonId,    // 把传过来的值赋值给新的变量
      chapter: [],
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
    toPlayVideo(mp4) {
      this.$router.push({name: 'playVideo', query: {mp4: mp4}})
    },
    downPPT(ppt) {
      window.open(ppt)
    },
    toWebIDEPage(exp_url, son_id) {
      this.$router.push({name: "ToWebIDEPage", query: {isHasUrl: false, jupterUrl: exp_url, sonId: son_id}});
    },
    toJupyterPage(son_id) {
      let sonUserExpObj = {
        user_id: localStorage.getItem("user_id"),
        son_id: son_id,
        lessonId: this.lesson_id
      }

      console.log(son_id)

      // getDynamicExpUrl(sonUserExpObj).then(res => {
      //   let dataObj = res.data
      //   let jupyterUrl = dataObj.exp_url
      //   let id = dataObj.id
      //
      //   this.$router.push({
      //     name: 'ToJupyterPage',
      //     query: {
      //       jupyterUrl: jupyterUrl,
      //       id: id,
      //       sonId: son_id
      //     }
      //   })
      // })
    },
    getChapterInfoByLessonId() {
      getChapterInfo(this.lesson_id).then(res => {
        if (res.status === '200') {
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
.chapter-container {
  display: flex;
  flex-direction: column;
}

.chapter-title {
  display: flex;
  height: 50px;
  align-items: center;
}

.chapter-number {
  display: inline-block;
  line-height: 30px;
  text-align: center;
  background-color: #fdf5e6;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 10px;
}

.son-chapter {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.son-chapter-item {
  display: flex;
  height: 35px;
  align-items: center;
}

.son-chapter-item .left {
  flex: 0.7;
}

.son-chapter-item .right {
  flex: 0.4;
}
</style>
