<template>
  <el-row class="lesson-info-container">
    <!-- 课程概述 -->
    <el-row class="lesson-title">
      <el-row class="title">
        <h1>{{ lesson.lesson_name }}</h1><br>
        <span class="font_type">导师：{{ lesson.teacher_name }}</span> <br>
        <span class="font_type">导师简介：xxxx</span> <br>
        <span class="font_type">适用：{{ lesson.suitablePerson }}</span> <br>
        <span class='font_type' style="float: left ">评分: </span>
        <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
      </el-row>
    </el-row>
    <!-- 课程内容 -->
    <el-row class="lesson-content">
      <!-- 左侧内容 -->
      <el-row class="left-content">
        <el-row class="lesson-description">
          <el-row class="description-title">
            <el-row class="title-left"></el-row>
            <el-row class="title-right"><span>课程简介</span></el-row>
          </el-row>
          <el-row class="description">
            <el-row v-html="lesson.htmlDescription"></el-row>
          </el-row>
          <el-row class="description-title">
            <el-row class="title-left"></el-row>
            <el-row class="title-right">课程内容</el-row>
          </el-row>
          <chapter-list :lessonId="this.lessonId"></chapter-list>
        </el-row>
      </el-row>
      <el-row class="right-content">
        <el-row>
          <el-row class="description-title">
            <el-row class="title-left"></el-row>
            <el-row class="title-right">学习成员</el-row>
          </el-row>
          <el-col :span="14">
            <el-avatar> user</el-avatar>
            <el-avatar> user</el-avatar>
            <el-avatar> user</el-avatar>
          </el-col>
        </el-row>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import chapterList from "@/view/layout/learn/chapterList"
import {getLessonInfo} from "@/network/api/lesson"

export default {
  name: "lessonInfo",
  components: {
    chapterList
  },
  data() {
    return {
      tutor: 'nxd',
      tutor_info: 'nxd',
      meet: '',
      value: 3.7,
      lessonId: '',
      lesson: {}
    }
  },
  created() {
    this.lessonId = this.$route.query.lessonId
    this.loadLessonInfo()
  },
  methods: {
    loadLessonInfo() {
      getLessonInfo(this.lessonId).then(res => {
        if (res.status === '200') {
          this.lesson = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
.lesson-info-container {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  background-color: #F3F4F6;
  display: flex;
  flex-direction: column;
}

.lesson-title {
  background-color: #C0C4CC;
  height: 230px;
}

.title {
  margin-left: 10%;
  margin-top: 50px;
  width: 600px;
}

.lesson-content {
  display: flex;
  margin: 8px 0;
}

.lesson-description {
  margin-left: 10px;
  background-color: #FFFFFF;
}

.description {
  width: 95%;
  margin: 10px auto;
}

.text_fill {
  margin: 0 auto;
}

.font_type {
  color: azure;
}

.description-title {
  display: flex;
  height: 35px;
}

.title-left {
  width: 4px;
  margin-left: 5px;
  background: #409EFF;
}

.title-right {
  color: #409EFF;
  font-size: 18px;
  margin-left: 10px;
  line-height: 35px;
}

.left-content {
  flex: 0.7;
}

.right-content {
  flex: 0.3;
  background-color: #FFFFFF;
  margin: 0 5px;
}

.zhanwei {
  width: 100%;
  height: 2000px;

}
</style>
