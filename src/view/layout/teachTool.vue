<template>
  <div id="teachTool">
    <el-row>
      <el-col  style="width:100%;">
        <!--div居中设置 -->
        <div class="lunbo_box" style="margin:0 auto;width:900px;margin-top:50px" >
          <i class="el-icon-edit"></i> 工具下载
          <el-input
              placeholder="请输入搜索的工具"
              prefix-icon="el-icon-search"
              style="width: 200px;margin-left: 50px"
              v-model="searchName">
          </el-input>
          <el-button style="margin-left: 50px" type="primary" @click="searchTools()">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <el-tabs type="border-card" style="margin:0 auto;width:900px;margin-top:20px " >
      <div  v-for="(item,index)  in tool_list" :key="index">
        <el-descriptions :title=item.tool_name :colon=false :column=2 >
          <el-descriptions-item>{{item.tool_name}}</el-descriptions-item>
          <el-descriptions-item label="使用环境" >{{ item.tool_env }}</el-descriptions-item>
          <el-descriptions-item label="上传时间" >{{item.upload_time}}</el-descriptions-item>
          <el-descriptions-item label="文件" >
            <el-button type=“primary” @click="DownLoadModel(item.download_url)" ><i class="el-icon-download">{{item.tool_name}}</i></el-button>
          </el-descriptions-item>
        </el-descriptions>
        <br>
        <hr>
        <br>

      </div>
    </el-tabs>

    <br>
    <br>
  </div>
</template>

<script>
import {get} from '../../utils/index'

export default {

  data() {
    return {
      tool_list:[],
      searchName:'',
    };
  },
  created() {
    this.getToolList();
  },
  methods: {

    async searchTools(){
      if (this.searchName === ''){
          this.$message.error("请输入搜索信息！")
      }else {
        let url = this.$root.URL+"/front/loadToolListByName?searchName="+this.searchName;
        await get(url).then(res=>{

          this.tool_list = res.data.data;

        })
      }


    },
    async getToolList(){
      let url = this.$root.URL+"/front/loadToolList";
      await get(url).then(res=>{

        console.log(JSON.stringify(res.data))
        this.tool_list = res.data.data;

      })


    },

    DownLoadModel(down_url){

      window.open(down_url)

    },
    DownLoadModel2(){

      window.open("http://localhost:4040/遥感数据下载处理器5.3.5免费版(bug修复).rar")

    },
    DownLoadModel3(){

      window.open("http://localhost:4040/GRAPES_Meso3.1.0.1.tar.gz")

    }
    ,
    DownLoadModel4(){

      window.open("http://localhost:4040/WRF.tar")

    }
  }
}
</script>

<style scoped>

</style>
