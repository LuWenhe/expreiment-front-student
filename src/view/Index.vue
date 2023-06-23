<template>
  <el-container class="index-container">
    <!-- 主页导航栏 -->
    <el-header class="index-header">
      <NavigationBar :activeIndex="activeIndex"></NavigationBar>
    </el-header>
    <!-- 主页内容 -->
    <el-main class="index-main">
      <router-view/>
    </el-main>
    <!-- 主页尾部 -->
    <el-footer class="index-footer">
      <el-row class="copyright">
        <p>Copyright©2023-2024 南京信息工程大学</p>
        <p>中国气象局气象干部培训学院</p>
      </el-row>
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
      this.activeIndex = '1';
    } else if (index === '/index/allLesson') {
      this.activeIndex = '2';
    } else if (index === '/index/teachTool') {
      this.activeIndex = '3'
    } else if (index === '/index/OnlineIDE') {
      this.activeIndex = '5'
    }
  }
}
</script>

<style>
.index-container {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.index-main {
  padding: 0;
  margin: 10px auto;
  width: 80%;
}

.index-header {
  display: flex;
  justify-content: space-around;
  padding: 0;
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

.index-footer {
  background-color: #274B9F;
  height: 120px;
  color: #94BDC0;
  font-size: 20px;
}

.copyright {
  margin: 0 auto;
  text-align: center;
}
</style>


