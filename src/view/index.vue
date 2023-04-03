<template>

  <el-container>
      <el-row style="width:100%;display: flex;justify-content: space-around">
        <el-col :xs="24" :sm="20" :md="16" :lg="10" :xl="7" style="width:100%;background-color='#545c64';">
          <img style="width:40px;height:40px;position:absolute;margin-top: 10px;margin-left:30px;z-index: 1;font-size: 20px;color: white" src="../assets/icon.jpg" alt="">
          <span  style="position:absolute;margin-top: 19px;margin-left:100px;z-index: 1;font-size: 17px;color: white">气象雷达智能技术应用实训系统</span>
<!--          <span  style="position:absolute;margin-top: 19px;margin-left:100px;z-index: 1;font-size: 17px;color: white">在线实训平台</span>-->

          <el-menu
              :default-active="activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#274B9F"
              text-color="#fff"
              active-text-color="#ffd04b"
              style="margin-top: 0%;width: 100%;"
          >
<!--          <el-menu-->
<!--              :default-active="activeIndex2"-->
<!--              class="el-menu-demo"-->
<!--              mode="horizontal"-->
<!--              @select="handleSelect"-->
<!--              background-color="black"-->
<!--              text-color="#fff"-->
<!--              active-text-color="#ffd04b"-->
<!--              style="margin-top: 0%;width: 100%;"-->
<!--          >-->
            <el-menu-item index="1" style="margin-left: 25%;font-size: 15px" ><router-link to="/frontAdmin/mainPage">首页</router-link></el-menu-item>
            <el-menu-item index="2" style="font-size: 15px" >  <router-link to="/frontAdmin/allLesson">全部课程</router-link>  </el-menu-item>
            <el-menu-item index="3" style="font-size: 15px" >  <router-link to="/frontAdmin/teachTool">教学工具</router-link>  </el-menu-item>
            <el-menu-item index="5" style="font-size: 15px" > <router-link to="/frontAdmin/OnlineIDE">在线编码工具</router-link> </el-menu-item>

            <el-avatar :src="myHeader" style="position: absolute;margin-left:30%;margin-top: 10px"></el-avatar>

            <el-dropdown style="position: absolute;margin-left: 34%;margin-top: 20px" class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link" style="color: white;font-size: 15px">
                        {{name}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item divided command="personInfo">个人主页</el-dropdown-item>
                <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu>

        </el-col>
      </el-row>

    <router-view />
    <el-footer style="background-color:#274B9F;height: 100px">
      <span style="margin-left: 36%;color: #94BDC0;font-size: 20px">Copyright©2022-2023 南京信息工程大学</span>
      <br><span style="margin-left: 45%;color: #94BDC0;font-size: 20px">中国气象局气象干部培训学院</span>
    </el-footer>
    </el-container>


</template>
<script>
export default {
  name:'index',

  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      search_all:'',
      name:'jxl',
      myHeader:''
    };
  },
  created() {

    this.name = localStorage.getItem("name")
    this.myHeader = localStorage.getItem("avatar_image");
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {

      if (command == 'loginout') {

        localStorage.clear();
        this.$router.push('/frontAdmin/login');

      }
      if(command == 'personInfo'){

        this.$router.push('/frontAdmin/personInfo');

      }
    },
  },
  mounted() {
    let index = this.$route.path.replace("/", "");
//获取当前路由地址
    console.log('当前路由='+index);
    if(index === '/frontAdmin/mainPage'){
      this.activeIndex2 = '1';
    }else if(index === '/frontAdmin/allLesson'){
      this.activeIndex2 = '2';

    }else if(index === '/frontAdmin/teachTool'){
      this.activeIndex2 = '3'
    }else if(index === '/frontAdmin/OnlineIDE') {
      this.activeIndex2 = '5'
    }
  }
  // mounted() {
  //   this.$router.push({ path: '/mainPage' })
  // }

}
</script>
<style>
/*.header_list{*/
/*  width: 100%;*/
/*  height: 300px;*/
/*}*/
.main{
  width: 100%;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
  /*align-items: center;*/

  /*overflow: hidden;*/
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}

</style>


