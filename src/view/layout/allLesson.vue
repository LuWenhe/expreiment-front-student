<template>
  <div>
    <div style="display: flex;justify-content: left;margin-left:150px;margin-top: 50px" >
      <el-select v-model="value" placeholder="请选择" @change="refreshLessons()">
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
    </div>
    <div style="height: 50px">

    </div>
<div style="width: 80%;margin: 0 auto">
      <el-row>
        <el-col   :xs="14" :sm="14" :md="14" :lg="6" :xl="6" :span="6" v-for="(item,index)  in lesson_list" :key="index">

            <el-card style="width: 250px;height: 350px;margin-bottom: 25px; " shadow="hover" >
              <router-link :to="{name:'lessonInfo',query:{lessonId:item.lessonId}}">
                <img :src="item.pic_url" class="image" style="width: 100%;height: 250px" >
              </router-link>
              <div style="padding: 14px;">
                <span>{{item.lesson_name}}</span>
                <br>
                <span style="font-size: 15px">授课老师：{{item.teacher_name}}</span>
              </div>
            </el-card>

        </el-col>
      </el-row>


</div>
  </div>
</template>
<script>
import { post} from '../../utils/index'

export default {
  name: "allLesson",
  data() {
    return {
      activeName: 'all',
      lesson_list: [
        {
          "lessonId":'',
          "pic_url":'',
          "lesson_name":'',
          "teacher_name":''
        }

      ],
      options: [{
        value: 'all',
        label: '所有'
      }, {
        value: 'meteo',
        label: '气象'
      }, {
        value: 'ai',
        label: '人工智能'
      }],
      value: 'all',
      searchName:'',
    };
  },
  created() {
    this.getLessonList();

  },
  methods: {

    searchLesson(){
      const url = this.$root.URL+"/front/getLessonByName";
      post(url,{searchName:this.searchName,}).then(res=>{
        this.lesson_list = [];
        this.lesson_list = res.data;
      });

    },
    refreshLessons(){

      const url = this.$root.URL+"/front/getAllLessons";
      post(url,{activeName:this.value}).then(res=>{
        this.lesson_list = [];
        this.lesson_list = res.data;
      });

    },
     async getLessonList() {
      const url = this.$root.URL+"/front/getAllLessons";
       post(url,{activeName:this.activeName}).then(res=>{
         this.lesson_list = [];
         this.lesson_list = res.data;
      });
    },

  },
  mounted(){
  },
};
</script>


<style scoped>
#allLesson{
  width: 80%;
  height: 100%;
  margin-left: 15%;
  margin-top: 1%;
}
</style>
