<template>
  <el-row class="head">
    <img src="@/assets/icon.jpg" alt="">
    <span class="title">气象雷达智能技术应用实训系统</span>
    <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        background-color="#274B9F"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="margin-top: 0;width: 100%;"
        router
    >
      <el-menu-item index="/index/mainPage" style="margin-left: 25%">首页</el-menu-item>
      <el-menu-item index="/index/allLesson">全部课程</el-menu-item>
      <el-menu-item index="/index/teachTool">教学工具</el-menu-item>
      <el-menu-item index="/index/onlineIDE">在线编码工具</el-menu-item>
<!--      <el-avatar :src="myHeader" style="position: absolute;margin-left:30%;margin-top: 10px"></el-avatar>-->
      <el-dropdown style="position: absolute;margin-left: 34%;margin-top: 20px" class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link" style="color: white;font-size: 15px">
            {{ name }}
            <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided command="personInfo">个人主页</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      myHeader: '',
      name: 'jxl'
    }
  },
  created() {
    this.name = localStorage.getItem("name")
    this.myHeader = localStorage.getItem("avatar_image")
  },
  props: {
    activeIndex: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {

    },
    handleCommand(command) {
      if (command === 'logout') {
        localStorage.clear()
        this.$router.push('/login')
      }

      if (command === 'personInfo') {
        this.$router.push('/index/personInfo')
      }
    }
  }
}
</script>

<style>
.head {
  width: 100%;
  background-color: #545c64
}

.title {
  position: absolute;
  margin-top: 19px;
  margin-left: 100px;
  z-index: 1;
  font-size: 17px;
  color: white;
}
</style>