<template>
  <div class="whole_box">
    <div class="up_box">
      <br>
      <h2 style="margin-left: 10px">个人信息</h2>
      <el-divider></el-divider>
      <div class="person_box" style="margin: 0 auto">
        <el-avatar style="width: 100px;height: 100px;margin-left: 30px;float:left"
                   :src="this.personInfo.avatar_image"></el-avatar>
        <div class="user_box" style="float: left;height: 100px;margin-left: 30px"><span
            style="position:relative;top: 50%">用户名：{{ this.personInfo.username }}</span></div>
        <div class="user_box" style="float: left;height: 100px;margin-left: 30px"><span
            style="position:relative;top: 50%">邮箱：{{ this.personInfo.email }}</span></div>
        <div class="user_box" style="float: left;height: 100px;margin-left: 30px"><span
            style="position:relative;top: 50%">手机号码：{{ this.personInfo.phone }}</span></div>
        <div class="user_box" style="float: left;height: 100px;margin-left: 30px">
          <el-button style="position:relative;top: 46%" @click="openEditDiag"><i class="el-icon-edit">修改个人信息</i>
          </el-button>
        </div>
        <div class="user_box" style="float: left;height: 100px;margin-left: 30px">
          <el-button style="position:relative;top: 46%" @click="openChangePassDiag" type="danger"><i
              class="el-icon-edit">修改密码</i></el-button>
        </div>
        <!--        <el-upload-->
        <!--            list-type="text"-->
        <!--            :action="uploadAttachment"-->
        <!--            :on-preview="handlePreview"-->
        <!--            :on-remove="handleRemove"-->
        <!--            :on-success="handleSuccess"-->
        <!--            :limit="1"-->
        <!--            :on-exceed="handleExceed"-->
        <!--            :file-list="fileList"-->
        <!--            :headers="uploadHeaders"-->
        <!--        ><el-button slot="trigger"  size="small" type="primary">选取文件</el-button>-->
        <!--        </el-upload>-->
      </div>
    </div>
    <div class="down_box">
      <div style="height: 50px">
        <h2 style="margin-left:50px;width:150px;float: left;position: relative;top: 50%">历史学习课程</h2>
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-col :xs="14" :sm="14" :md="14" :lg="8" :xl="6" :span="6" v-for="(item,index)  in historyLesson"
                :key="index">
          <el-card style="width: 250px;height: 350px;margin-bottom: 25px;margin-left: 20px " shadow="hover">
            <router-link :to="{name:'lessonInfo',query:{'lessonId':item.lessonId}}">
              <img :src="item.pic_url" class="image" style="width: 100%;height: 250px">
            </router-link>
            <div style="padding: 14px;">
              <span>{{ item.lesson_name }}</span>
              <br>
              <span style="font-size: 15px">授课老师：{{ item.teacher_name }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="space1"></div>
    <el-dialog
        title="编辑个人信息"
        :visible.sync="editInfoDiag"
        width="30%"
    >
      <el-form :model="edit_personInfo" :rules='rules' ref='edit_personInfo'>
        <el-upload
            :class='{hide:hideUpload}'
            list-type="picture-card"
            :action="uploadImgServer"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :limit="imgLimit"
            :on-exceed="handleExceed"
            :file-list="fileListFront"
            :headers="uploadHeaders"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop='phone'>
          <el-input v-model="edit_personInfo.phone" style='width: 90%'></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
          <el-autocomplete
              v-model="edit_personInfo.email"
              :fetch-suggestions="querySearchEmail"
              :trigger-on-focus="false"
              placeholder="输入邮箱"
              style='width: 90%'
          >
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditPersonInfo">取 消</el-button>
        <el-button type="primary" @click="enterEditPersonInfo('edit_personInfo')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="修改密码"
        :visible.sync="ChangePassDiag"
        width="40%"
    >
      <el-form :model="changePassInfo" :rules='rules2' ref='changePassInfo'>
        <el-form-item label="旧密码" :label-width="formLabelWidth" prop='old_password'>
          <el-input v-model="changePassInfo.old_password" type="password" style='width: 90%'
                    placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop='new_password'>
          <el-input v-model="changePassInfo.new_password" style='width: 90%' type="password"
                    placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="重复输入新密码" :label-width="formLabelWidth" prop='repeat_new_password'>
          <el-input v-model="changePassInfo.repeat_new_password" style='width: 90%' type="password"
                    placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelChangePass">取 消</el-button>
        <el-button type="primary" @click="enterChangePass('changePassInfo')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {passwordCheck, phoneCheck, emailCheck} from '@/utils/validator'
import {getLessonsByUserId} from "@/network/api/lesson"
import {changePassword, getPersonInfo, updatePersonInfo} from "@/network/api/user"

const validatorPhoneNum = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入手机号码"));
  } else {
    if (phoneCheck(value)) {
      callback();
    } else {
      return callback(new Error('请输入正确的手机号码'))
    }
  }
};
const validatorPassword = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入密码"));
  } else {
    if (passwordCheck(value)) {
      callback();
    } else {
      return callback(new Error('请输入正确的密码'))
    }
  }
};
const validatorEmail = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入邮箱"));
  } else {
    if (emailCheck(value)) {
      callback();
    } else {
      return callback(new Error('请输入正确的邮箱'))
    }
  }
};
export default {
  inject: ['reload'],
  name: "PersonInfo",
  data() {
    return {
      hideUpload: true,
      uploadImgServer: '',
      imgLimit: 1, // 上传照片数
      fileListFront: [], // 照片列表
      uploadHeaders: {"token": localStorage.getItem('token')},
      options: [
        {
          value: false,
          label: '否'
        },
        {
          value: true,
          label: '是'
        }
      ],
      isChangePassword: false,
      formLabelWidth: '130px',
      rules: {
        phone: [
          {validator: validatorPhoneNum, required: true, trigger: 'blur'}
        ],
        email: [{
          validator: validatorEmail, required: true, trigger: 'blur'
        }]
      },
      rules2: {
        old_password: [{validator: validatorPassword, required: true, trigger: 'blur'}],
        new_password: [{validator: validatorPassword, required: true, trigger: 'blur'}],
        repeat_new_password: [{validator: validatorPassword, required: true, trigger: 'blur'}]
      },
      personInfo: {
        username: '',
        email: '',
        phone: '',
        old_password: '',
        new_password: '',
        repeat_new_password: '',
        avatar_image: ''
      },
      edit_personInfo: {
        username: '',
        email: '',
        phone: '',
        old_password: '',
        new_password: '',
        repeat_new_password: '',
        avatar_image: '',
        uid: ''
      },
      changePassInfo: {
        old_password: '',
        new_password: '',
        repeat_new_password: '',
        uid: '',
      },
      editInfoDiag: false,
      ChangePassDiag: false,
      historyLesson: [],
      uploadAttachment: "",
      fileList: [],
      userId: ''
    }
  },
  created() {
    this.userId = localStorage.getItem("user_id")
    this.uploadImgServer = this.$root.URL + '/back/addLessonPic'
    this.uploadAttachment = this.$root.URL + '/back/uploadAttachmentPPT'
    this.getInitData()
    this.getHistoryLesson()
  },
  methods: {
    getHistoryLesson() {
      getLessonsByUserId(this.userId).then(res => {
        if (res.data.status === '200') {
          this.historyLesson = res.data.data
        }
      })
    },
    openChangePassDiag() {
      this.ChangePassDiag = true
    },
    cancelChangePass() {
      this.ChangePassDiag = false
    },
    //修改密码
    enterChangePass(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })

          setTimeout(async () => {
            let newPass = this.changePassInfo.new_password
            let repeatPass = this.changePassInfo.repeat_new_password

            if (newPass !== repeatPass) {
              this.$message.error("两次密码输入不一致，请重新输入！")
            } else {
              changePassword(this.changePassInfo).then(res => {
                if (res.data.code === '200') {
                  this.$message.success('更新成功,需要重新登录');
                  localStorage.clear();
                  this.$router.push("/login");
                } else {
                  this.$message.error("更新失败");
                }
              })
            }

            loading.close();
          }, 2000);
        } else {
          console.log('error update!!');
        }
      })
    },
    openEditDiag() {
      this.hideUpload = true
      this.editInfoDiag = true
    },
    publishPost() {
      this.$router.push("/writePost")
    },
    getInitData() {
      getPersonInfo(this.userId).then(res => {
        if (res.code === '200') {
          let userData = res.data
          this.personInfo.username = userData.username
          this.personInfo.email = userData.email
          this.personInfo.phone = userData.phone
          this.personInfo.avatar_image = userData.avatar_image
          this.edit_personInfo.avatar_image = userData.avatar_image
          this.edit_personInfo.email = userData.email
          this.edit_personInfo.phone = userData.phone

          let avatarImage = userData.avatar_image.split(',')[0]
          this.fileListFront.push({name: 'xxx', url: avatarImage})   //在el-upload中回显后台返回的地址
        }
      })
    },
    cancelEditPersonInfo() {
      this.isChangePassword = false;
    },
    //编辑用户信息
    enterEditPersonInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0,0,0,0.7)'
          });
          setTimeout(async () => {
            localStorage.setItem("avatar_image", this.edit_personInfo.avatar_image)
            this.edit_personInfo.uid = this.userId

            updatePersonInfo(this.edit_personInfo).then(res => {
              if (res.data.code === '200') {
                this.$message.success('更新个人信息成功')
                this.reload()
              }
            })

            loading.close()
          }, 2000)
        } else {
          console.log('error update!!')
        }
      })
    },
    handleRemove(file, fileList) {
      this.fileListFront.some((item, i) => {
        if (item.name === file.name) {
          this.fileListFront.splice(i, 1)
          return true
        }
      })

      this.hideUpload = fileList.length >= this.imgLimit
      this.edit_personInfo.avatar_image = ''
    },
    /**上传文件之前的钩子函数 */
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('仅支持jpg，png格式的图片！');
      }

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }

      return isJPG && isLt2M
    },
    /**上传成功后的钩子函数 */
    handleAvatarSuccess(res, file) {
      this.edit_personInfo.avatar_image = file.response.data
      this.fileListFront.push(file);
      this.hideUpload = true;
    },
    /**查看图片 */
    handlePictureCardPreview(file) {
      console.log(file);

    },
    /**文件超出个数限制时的钩子 */
    handleExceed() {
      this.$message.error(`只能选择${this.imgLimit}个文件`);
    },
    querySearchEmail(queryString, callback) {
      const emailList = [
        {value: '@qq.com'},
        {value: '@126.com'},
        {value: '@163.com'},
        {value: '@sina.com'},
        {value: '@21cn.com'},
        {value: '@sohu.com'},
        {value: '@yahoo.com.cn'},
        {value: '@tom.com'},
        {value: '@etang.com'},
        {value: '@eyou.com'},
        {value: '@56.com'},
        {value: '@x.cn'},
        {value: '@chinaren.comsogou.com'},
        {value: '@citiz.com'},
      ]
      let results = []
      let queryList = []
      emailList.map(item => {
        queryList.push({value: queryString.split('@')[0] + item.value})
      })
      results = queryString ? queryList.filter(this.createFilter(queryString)) : queryList;
      console.log(results)
      callback(results);
    },
    // 邮箱填写过滤
    createFilter(queryString) {
      return (item) => {
        return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      };
    },

  }
}
</script>

<style>
.whole_box {
  height: 100%;
  margin: 0 auto;
  width: 100%;
  background-color: #F5F6F7;

}

.up_box {
  width: 70%;
  margin: 0 auto;
  height: 250px;
  background-color: #FFFFFF;
  margin-top: 50px;

}

.down_box {
  width: 70%;
  margin: 0 auto;
  height: 100%;
  background-color: #FFFFFF;
  margin-top: 50px;
}

.space1 {
  height: 70px;
}

.hide .el-upload--picture-card {
  display: none;
}
</style>
