<template>
  <el-row class="lesson-container">
    <el-row class="input-group">
      <el-select v-model="value" placeholder="请选择" @change="changeSelect">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
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
      <el-row>
        <el-pagination
            @size-change='handleSizeChange'
            @current-change='handleCurrentChange'
            :current-page='pageInfo.pageNum'
            :page-sizes='[10, 50, 100, 500]'
            :page-size='pageInfo.pageSize'
            layout='total, sizes, prev, pager, next, jumper'
            :total='pageInfo.total'
        >
        </el-pagination>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import {getLessonsByName, getLessonsByUserIdAndTagId} from "@/network/api/lesson"
import {getTags} from "@/network/api/tag"

export default {
  name: "allLesson",
  data() {
    return {
      activeName: 'all',
      lesson_list: [],
      options: [],
      value: 0,
      searchName: '',
      userId: '',
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        size: 0,
        startRow: 0,
        endRow: 0,
        total: 0,
        pages: 0
      }
    };
  },
  created() {
    this.userId = localStorage.getItem("user_id")
    this.getLessonList()
    this.getLessonOptions()
  },
  methods: {
    getLessonOptions() {
      getTags().then(res => {
        if (res.status === '200') {
          let tagList = res.data
          let optionArray = []
          optionArray.push({label: 'all', 'value': 0})

          tagList.forEach(item => {
            let optionObj = {}

            optionObj.value = item.tag_id
            optionObj.label = item.tagName

            optionArray.push(optionObj)
          })

          this.options = optionArray
        }
      })
    },
    changeSelect(tagId) {
      let pageRequest = {
        userId: this.userId,
        tagId: tagId,
        currentPage: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }

      this.getLessons(pageRequest)
    },
    getLessonList() {
      let pageRequest = {
        userId: this.userId,
        tagId: this.value,
        currentPage: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize
      }

      this.getLessons(pageRequest)
    },
    getLessons(pageRequest) {
      getLessonsByUserIdAndTagId(pageRequest).then(res => {
        if (res.status === '200') {
          let tableData = res.data.list
          let data = res.data

          if (tableData != null && tableData.length > 0) {
            this.lesson_list = tableData

            this.pageInfo = {
              pageNum: data.pageNum,
              pageSize: data.pageSize,
              size: data.size,
              startRow: data.startRow,
              endRow: data.endRow,
              total: data.total,
              pages: data.pages
            }
          }
        }
      })
    },
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.getLessonList()
    },
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.getLessonList()
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
