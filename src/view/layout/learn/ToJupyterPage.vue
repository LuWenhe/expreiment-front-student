<template>
  <el-row class="jupyter-box">
    <el-row class="jupyter-box-left">
      <mavon-editor
          style="margin-right: 2%"
          v-model=guideBook
          ref="md"
          :editable="false"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false"
      />
    </el-row>
    <el-row class="jupyter-box-right">
      <div style="overflow:hidden">
        <iframe class="iframe-box" :src='$route.query.jupyterUrl' frameborder='0' scrolling='auto'></iframe>
      </div>
    </el-row>
  </el-row>
</template>

<script>
import {getGuideBook} from "@/network/api/lesson"

export default {
  name: 'ToJupyterPage',
  data() {
    return {
      son_id: '',
      guideBook: '',
    }
  },
  created() {
    this.son_id = this.$route.query.sonId
    this.getGuideBook()
  },
  methods: {
    getGuideBook() {
      getGuideBook(this.son_id).then(res => {
        if (res.status === '200') {
          if (res.data.guide_book === null) {
            res.data.guide_book = ''
          }

          this.guideBook = res.data.guide_book
        }
      })
    }
  }
};
</script>

<style scoped>
.jupyter-box {
  width: 100%;
  height: 100%;
  margin-top: 1%;
  margin-bottom: 1%;
  display: flex;
}

.jupyter-box-left {
  flex: 1;
}

.jupyter-box-right {
  flex: 1;
}

.iframe-box {
  width: 90%;
  height: 1000px;
  margin-top: -80px;
}
</style>
