<template >
  <div  id="allLesson"   v-loading="loading"  element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-row>
      <el-col :span="10"><mavon-editor
          style="margin-right: 2%"
          v-model=this.guideBook
          ref="md"
          :editable="false"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false"
      /></el-col>
      <el-col :span="14">
        <div style="overflow:hidden">
<!--          <iframe style="width: 80%;height: 1000px;margin-top: -13%;" id='iframeId' v-if='load' src='http://10.14.253.39:8012/notebooks/work/template.ipynb' frameborder='0' scrolling='auto'></iframe>-->
<!--http://10.14.253.39:8011/notebooks/array.ipynb-->
          <iframe style="width: 90%;height: 1000px;margin-top: -9%;" id='iframeId' v-if='load' :src='this.$route.query.jupterUrl' frameborder='0' scrolling='auto'></iframe>
        </div>
      </el-col>

    </el-row>

  </div>

</template>

<script>
import {get} from '../../../utils/index'

export default {
  name: 'ToJupyterPage',
  data(){
    return{
      load:true,
      son_id:'',
      guideBook:'',
      loading:true
    }
  },
  created() {


    this.son_id = this.$route.query.sonId;
    this.getGuideBook();

    setTimeout(()=>{
      this.loading = false
    },2000)

  },

  methods:{


    async getGuideBook(){
      const url = this.$root.URL+"/front/getGuideBook?son_id="+this.son_id;
      await get(url).then(res=>{

        console.log(JSON.stringify(res))
        console.log(JSON.stringify(res.data))
        this.guideBook = res.data.data.guide_book
      });

    }

  }
};
</script>

<style scoped>
#allLesson{
  width: 95%;
  height: 100%;
 margin: 0 auto;
  margin-top: 1%;
  margin-bottom: 1%;
}
</style>
