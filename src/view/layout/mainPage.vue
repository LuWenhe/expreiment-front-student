<template>
<div id="mainPage">
  <el-row>
    <el-col  style="width:100%;">
      <!--div居中设置 -->
      <div class="lunbo_box" style="margin:0 auto;width:1200px;margin-top:50px" >
        <el-carousel class="lunbo" style="width: 1200px;height: auto;border-radius: 20px;">
          <el-carousel-item v-for="(item,index) in bannerlist" :key="index">
            <img class="lunboimg" :src=item.banner_url alt="" style="width: 100%;height: 100%;">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
  </el-row>
  <div class="zhanwei" style="height: 50px"></div>
  <div class="lesson_info" style="margin:0 auto; width: 1200px;height: auto" >
  <el-row>
    <div class="contain_title">
      <div class="titleInnerAidLine1"></div>
      <div class="mainTitle">精品课程</div>
    </div>
    <el-col   :xs="14" :sm="14" :md="14" :lg="6" :xl="6" :span="6" v-for="(item,index)  in lesson_list" :key="index">

          <el-card style="width: 250px;height: 350px;margin-bottom: 25px; " shadow="hover" >
            <router-link :to="{name:'lessonInfo',query:{'lessonId':item.lessonId}}">
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
  <router-view/>
</div>
</template>
<script>
// import axios from 'axios';
import {get,post} from '../../utils/index'

export default {
  data() {
    return {
      currentDate: new Date(),
      bannerlist: [
        {
          banner_url: 'http://124.232.152.147:4005/banner-01.png'
        }, {
          banner_url: 'http://124.232.152.147:4005/banner-02.png'
        }, {
          banner_url: 'http://124.232.152.147:4005/banner-03.png'
        },
      ],
      lesson_list: [

      ]
    };
  },
  created() {
    this.getLessonList();
    this.getBannerList();
  },
  methods: {
     getLessonList() {
       post(this.$root.URL+"/front/getAllLessons",{activeName:"all"}).then((res) => {
        console.log(JSON.stringify(res))

          this.lesson_list = res.data;

      }).catch((err) => {

        console.log(err)
      })



    },
     getBannerList(){
      const url = this.$root.URL+"/front/getAllBanners";
       get(url).then(res=>{

        this.bannerlist = res.data;

      });
    }
  }
}

</script>
<style>
#mainPage{
  width: 100%;
  height: 100%;
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

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>


