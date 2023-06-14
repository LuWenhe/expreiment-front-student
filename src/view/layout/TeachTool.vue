<template>
  <div class="teachTool">
    <el-row>
      <el-col style="width:100%;">
        <!--div居中设置 -->
        <div class="lunbo_box" style="margin:0 auto;width:900px;margin-top:50px">
          <i class="el-icon-edit"></i> 工具下载
          <el-input
              placeholder="请输入搜索的工具"
              prefix-icon="el-icon-search"
              style="width: 200px;margin-left: 50px"
              v-model="toolName">
          </el-input>
          <el-button style="margin-left: 50px" type="primary" @click="searchTools()">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <el-tabs type="border-card" style="margin:0 auto;width:900px;margin-top:20px ">
      <el-row v-for="(item,index)  in tooList" :key="index">
        <el-descriptions :title=item.tool_name :colon=false :column=2>
          <el-descriptions-item>{{ item.tool_name }}</el-descriptions-item>
          <el-descriptions-item label="使用环境">{{ item.tool_env }}</el-descriptions-item>
          <el-descriptions-item label="上传时间">{{ item.upload_time }}</el-descriptions-item>
          <el-descriptions-item label="文件">
            <el-button type=“primary” @click="DownLoadModel(item.download_url)"><i
                class="el-icon-download">{{ item.tool_name }}</i></el-button>
          </el-descriptions-item>
        </el-descriptions>
        <br>
        <hr>
        <br>
      </el-row>
    </el-tabs>
    <br>
    <br>
  </div>
</template>

<script>
import {getAllTools, getToolsByName} from "@/network/api/tool"

export default {
  data() {
    return {
      tooList: [],
      toolName: '',
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        size: 0,
        startRow: 0,
        endRow: 0,
        total: 0,
        pages: 0
      }
    };
  },
  created() {
    this.getToolList()
  },
  methods: {
    searchTools() {
      if (this.toolName === '') {
        this.$message.error("请输入搜索信息！")
      } else {
        getToolsByName(this.toolName).then(res => {
          if (res.code === '200') {
            this.tooList = res.data.data;
          }
        })
      }
    },
    // Todo 需要加个分页
    getToolList() {
      let currentPage = this.pageInfo.pageNum
      let pageSize = this.pageInfo.pageSize

      getAllTools(currentPage, pageSize).then(res => {
        if (res.code === '200') {
          this.tooList = res.data.list
        }
      })
    },
    DownLoadModel(down_url) {
      window.open(down_url)
    }
  }
}
</script>

<style scoped>
.teachTool {
  height: 100%;
}
</style>
