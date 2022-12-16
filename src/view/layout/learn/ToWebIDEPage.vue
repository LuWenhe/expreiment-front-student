<template>
  <div  id="allLesson">
<!--    <el-row :gutter="20">-->
<!--      <el-col :span="8"><div>-->
<!--&lt;!&ndash;        <mavon-editor&ndash;&gt;-->
<!--&lt;!&ndash;            v-model=lesson.description&ndash;&gt;-->
<!--&lt;!&ndash;            ref="md"&ndash;&gt;-->
<!--&lt;!&ndash;            :editable="false"&ndash;&gt;-->
<!--&lt;!&ndash;            defaultOpen="preview"&ndash;&gt;-->
<!--&lt;!&ndash;            :toolbarsFlag="false"&ndash;&gt;-->
<!--&lt;!&ndash;            :subfield="false"&ndash;&gt;-->
<!--&lt;!&ndash;        />&ndash;&gt;-->


<!--      </div></el-col>-->
<!--      <el-col :span="16">-->
        <div>
         <iframe style="width: 100%;height: 1000px" name="iframeLinux" id='iframeId' v-if='load' :src='this.$route.query.jupterUrl' frameborder='0' scrolling='auto'></iframe>
        </div>
<!--      </el-col>-->
<!--    </el-row>-->


  </div>

</template>

<script>
export default {
  name: 'ToWebIDEPage',
  data(){
    return{
      load:true,
    }
  },
  created() {
    console.log(this.$route.query.sonId)
   // window.frames("iframeId").document.getElementById("password_input").values = 'vncpassword'


  },
  mounted() {
    console.log(this.$route.query.sonId)

  },

  methods:{


  }
};
</script>

<style scoped>
#allLesson{
  width: 80%;
  height: 100%;
  margin-left: 15%;

}
</style>
