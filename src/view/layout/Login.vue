<template>
  <el-row class="login-wrap">
    <div style="height: 50px">
    </div>
    <div class="logo-box" style="width:100%;display: flex;justify-content: center">
      <img src="../../assets/qxj.png" alt="" style="width: 200px;height: 200px">
    </div>
    <div class="sysName" style="width:100%;display: flex;justify-content: center">
      <h1 style="color: black">气象雷达智能技术应用实训系统-学员端</h1>
    </div>
    <div class="login-box" style="margin:0 auto; width:30%;align-content:center;justify-content: center">
      <el-form :model="user" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="account">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              placeholder="password"
              v-model="user.password"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item prop="validate">
          <div class="verify-container">
            <slide-verify :l="42"
                          :r="10"
                          :w="370"
                          :h="155"
                          :slider-text="text"
                          :imgs=imgList
                          @success="handleSuccess"
                          @fail="handleError"
            ></slide-verify>
          </div>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </el-row>
</template>

<script>
import img0 from '../../assets/img.jpg';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import img5 from '../../assets/img5.jpg';
import {login} from "@/network/api/user";

export default {
  data: function () {
    return {
      text: '向右滑动',
      isRight: 'yes',
      value: '',
      identifyCode: "",
      user: {
        username: '',
        password: '',
        identity: ''
      },
      imgList: [
        img0,
        img1,
        img2,
        img3,
        img4,
        img5,
      ],
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
    };
  },
  methods: {
    handleSuccess() {
      this.$message.success('校验成功');
      this.isRight = 'yes'
    },
    handleError() {
      this.$message.error('校验失败');
    },
    submitForm() {
      if (this.isRight === 'yes') {
        if (localStorage.getItem("token")) {
          this.$router.push('/index')
        } else {
          this.$refs.login.validate(valid => {
            if (valid) {
              const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              })

              setTimeout(() => {
                login(this.user).then(res => {
                  let data = res.data

                  if (res.status === '200') {
                    this.$message.success('登录成功')
                    localStorage.setItem('token', res.token)
                    localStorage.setItem('user_id', data.userId)
                    localStorage.setItem('name', data.username)

                    this.$router.push('/index/mainPage')
                  } else {
                    this.$message.error('登录失败')
                  }
                })

                loading.close()
              }, 2000)
            } else {
              console.log('error submit!!')
            }

          })
        }
      } else {
        this.$message.error("验证码错误")
      }
    }
  }
};
</script>

<style scoped>
.login-wrap {
  margin: 0 auto;
  /*position: relative;*/
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
  display: flex;
  flex-direction: column;

}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.login-box {

  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
}

.ms-content {
  padding: 30px 30px;
  /*display: flex;*/
  /*justify-content: center;*/
}

.login-btn {
  /*text-align: center;*/
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
