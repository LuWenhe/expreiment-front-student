<template>
  <el-container class="container-box">
    <!-- 主页导航栏 -->
    <el-header class="container-box-head">
      <NavigationBar :activeIndex="activeIndex2"></NavigationBar>
    </el-header>
    <!-- 主页内容 -->
    <el-main>
      <router-view/>
    </el-main>
    <!-- 主页尾部 -->
    <el-footer style="background-color:#274B9F;height: 100px">
      <span style="margin-left: 36%;color: #94BDC0;font-size: 20px">Copyright©2022-2023 南京信息工程大学</span>
      <br><span style="margin-left: 45%;color: #94BDC0;font-size: 20px">中国气象局气象干部培训学院</span>
    </el-footer>
  </el-container>
</template>

<script>
import NavigationBar from "@/components/common/NavigationBar"

export default {
  name: 'index',
  components: {NavigationBar},
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {

    },
    handleCommand(command) {
      if (command === 'loginout') {
        localStorage.clear()
        this.$router.push('/login')
      }

      if (command === 'personInfo') {
        this.$router.push('/index/personInfo')
      }
    }
  },
  mounted() {
    let index = this.$route.path.replace("/", "")

    if (index === '/index/mainPage') {
      this.activeIndex2 = '1';
    } else if (index === '/index/allLesson') {
      this.activeIndex2 = '2';
    } else if (index === '/index/teachTool') {
      this.activeIndex2 = '3'
    } else if (index === '/index/OnlineIDE') {
      this.activeIndex2 = '5'
    }
  }
}
</script>

<style>
.container-box {
  height: 100%;
}

.container-box-head {
  display: flex;
  justify-content: space-around;
  padding: 0;
}

.head {
  width: 100%;
  background-color: #545c64
}

.head img {
  width: 40px;
  height: 40px;
  position: absolute;
  margin-top: 10px;
  margin-left: 30px;
  z-index: 1;
  font-size: 20px;
  color: white

}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

</style>


