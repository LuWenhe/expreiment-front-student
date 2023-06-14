<template>
  <div class="whole">

    <div class="lessonInfo">
      <div class="lessonTitle">
        <h1>{{ lesson.lesson_name }}</h1><br>
        <span class="font_type">导师:&nbsp; {{ lesson.teacher_name }}</span> <br>
        <span class="font_type">导师简介:&nbsp; xxxx</span> <br>
        <span class="font_type">适用:&nbsp; {{ lesson.suitablePerson }}</span> <br>
        <span class='font_type' style="float: left ">评分:&nbsp;  </span>
        <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
      </div>
    </div>
    <div class="son_whole">
      <div class="left_space">
        <div class="lesson_description">
          <div class="contain_title">
            <div class="titleInnerAidLine1"></div>
            <div class="mainTitle">课程简介</div>
          </div>
          <div class="text_box">
            <mavon-editor
                v-model=lesson.description
                ref="md"
                :editable="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                :subfield="false"
            />
          </div>
          <div class="space1"></div>
        </div>
        <div class="lesson_description">
          <div class="contain_title">
            <div class="titleInnerAidLine1"></div>
            <div class="mainTitle">课程内容</div>
          </div>
          <chapter-list :lessonId="this.lessonId"></chapter-list>
          <div class="space1"></div>
        </div>
        <div class="space1"></div>

      </div>
      <div class="right_space">
        <el-row>
          <div class="contain_title">
            <div class="titleInnerAidLine1"></div>
            <div class="mainTitle">学习成员</div>
          </div>
          <el-col :span="14">
            <el-avatar> user</el-avatar>
            <el-avatar> user</el-avatar>
            <el-avatar> user</el-avatar>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
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
        if (res.code === '200') {
          this.lesson = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
.whole {
  margin: 0 auto;
  background-color: #F3F4F6;
  height: 100%;
  width: 100%;
}

.son_whole {


}

.lessonInfo {
  margin: 0 auto;
  background-color: #C0C4CC;
  height: 230px;
}

.lessonTitle {
  margin-left: 10%;
  padding-top: 50px;
  width: 600px;

}

.lesson_description {
  width: 100%;
  margin-left: 10%;
  margin-top: 2%;
  background-color: #FFFFFF;


}

.text_box {
  width: 90%;
  margin: 0 auto;
}

.text_fill {
  margin: 0 auto;
}

.font_type {
  color: azure;
}

.titleInnerAidLine1 {
  display: inline-block;
  width: 4px;
  height: 1.6rem;
  margin-left: 5px;
  background: #409EFF;
}

.mainTitle {
  color: #409EFF;
  /* font-size: 1.5rem; */
  font-size: 18px;
  display: inline-block;
  position: relative;
  height: auto;
  line-height: normal;
  vertical-align: middle;
  padding-bottom: 20px;
  padding-left: 8px;
}

.left_space {
  float: left;
  width: 60%;
}

.right_space {
  height: 200px;
  width: 25%;
  background-color: #FFFFFF;
  float: right;
  margin-right: 100px;
  margin-top: 1%;

}

.space1 {
  height: 70px;
}

.zhanwei {
  width: 100%;
  height: 2000px;

}
</style>
