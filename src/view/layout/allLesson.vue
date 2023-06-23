<template>
  <el-row class="lesson-container">
    <el-row class="input-group">
      <el-select v-model="value" placeholder="请选择" @change="getLessonOptions()">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          style="width: 200px;margin-left: 50px"
          v-model="searchName">
      </el-input>
      <el-button style="margin-left: 50px" type="primary" @click="searchLesson()">搜索</el-button>
    </el-row>
    <el-row class="lesson-box">
      <el-row class="lesson-list">
        <el-row class="lesson-item" v-for="(item,index) in lesson_list" :key="index">
          <el-card class="lesson-item-card">
            <router-link :to="{name:'lessonInfo',query:{lessonId:item.lessonId}}">
              <img :src="item.pic_url" class="image" style="width: 100%;height: 250px">
            </router-link>
            <div style="padding: 14px;">
              <span>{{ item.lesson_name }}</span>
              <br>
              <span style="font-size: 15px">授课老师：{{ item.teacher_name }}</span>
            </div>
          </el-card>
        </el-row>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import {getAllLessons, getLessonsByName} from "@/network/api/lesson"

export default {
  name: "allLesson",
  data() {
    return {
      activeName: 'all',
      lesson_list: [],
      options: [
          {
            value: 'all',
            label: '所有'
          },
          {
            value: 'meteo',
            label: '气象'
          },
          {
            value: 'ai',
            label: '人工智能'
          }
      ],
      value: 'all',
      searchName: '',
    };
  },
  created() {
    this.getLessonList()
  },
  methods: {
    searchLesson() {
      getLessonsByName(this.searchName).then(res => {
        this.lesson_list = res.data.data
      })
    },
    // Todo
    getLessonOptions() {

    },
    getLessonList() {
      let activeName = 'all'

      getAllLessons(activeName).then(res => {
        if (res.status === '200') {
          this.lesson_list = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
#allLesson {
  width: 80%;
  height: 100%;
  margin-left: 15%;
  margin-top: 1%;
}

.lesson-container {
  width: 100%;
  height: 100%;
}

.input-group {
  display: flex;
  justify-content: left;
}

.lesson-box {
  margin-top: 10px;
}

.lesson-list {
  display: flex;
  flex-wrap: wrap;
}

.lesson-item {
  margin-left: 45px;
}

.lesson-item-card {
  width: 250px;
  height: 350px;
  margin-bottom: 25px;
}
</style>
