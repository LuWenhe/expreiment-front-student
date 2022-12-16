<template>
  <div id="mainPage">
    <br>
    <div style="width: 100%;height:300px;margin: 0 auto;">

    <codemirror style="font-size: 30px;width: 60%;height: 90%;margin:0 auto" class="code-edit" ref="mycode" :value="curCode" :options="cmOptions" ></codemirror>
    </div>

    <br>
    <div style="width: 200px;margin: 0 auto;">

    <el-button style="float: left" type="primary" @click="runCode">运行</el-button>
     <el-upload
      action="*"
      :auto-upload="false"
      :on-change="handelOnChange"
      style="float: right"
      >
      <el-button type="danger" style="margin-right: 10%">点击上传</el-button>
      </el-upload>
    </div>

    <br>
    <br>
    <textarea style="font-size:30px;margin-left:15%;width: 70%;height: 500px;" v-model="resultString" id="output" disabled
              placeholder="点击运行,输出的结果就会在这里显示啦;(没有变化的话，是不是忘记print了)" class="form-control"></textarea>
    <br>

  </div>
</template>
<script>
import {post} from '../../utils/index'

import {codemirror} from 'vue-codemirror'
import "codemirror/theme/darcula.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
require("codemirror/mode/python/python");
require("codemirror/addon/hint/show-hint")
export default {
  components: {
    codemirror
  },
  data() {
    return {
      resultString:'',
      curCode: '',
      cmOptions: { //codeMirror的配置
        value: '', //编辑器的初始值（文本）
        mode:{
          name: "python",
          version: 3

        }, //以什么格式进行代码高亮
        theme: "darcula",// ambiance, foo bar, darcula //配置编辑器的主题样式
        indentUnit: 4, //缩进单位
        smartIndent: true, // 自动缩进
        tabSize: 4, //tab字符的宽度
        lineNumbers: true, // 是否显示行
        firstLineNumber: 1, //第一行的行号
        showCursorWhenSelecting: true, // 在选择时是否显示光标
        readOnly: false ,//是否只读,不能获取焦点
      },
    };
  },
  created() {
    this.curCode = localStorage.getItem("codeInput");
  },
  methods: {

    handelOnChange(res) {
      var that = this;
      that.curCode = '';
      if (res) {
        var reader = new FileReader();
        reader.readAsText(res.raw);
        reader.onload = function () {
          that.curCode = that.curCode+this.result.toString();
        }
      }
      //this.curCode = "print(1+2)\nprint('hello python')"

    },
    async runCode() {

      var codeInput = this.$refs.mycode.codemirror.getValue();
      localStorage.setItem("codeInput",this.$refs.mycode.codemirror.getValue());
      await post(this.$root.URL + '/IDE/OnlineIDESub', {codeInput: codeInput}).then(res=>{

        console.log(JSON.stringify(res))
        if (res.data.code === '200') {
          this.resultString = res.data.data;

        } else {
          this.resultString = "代码出现异常！"
        }

      });

    },

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
#output {
  margin-bottom: 4%;
  font-size: large;
  resize: none;
  box-shadow: 0 5px 5px 0 rgba(210, 208, 208, 0.52);
  background-color: white;
}
</style>


