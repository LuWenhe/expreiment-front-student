import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import VueI18n from 'vue-i18n';
import axios from 'axios';
import VueAxios from 'vue-axios';
import mavonEditor from 'mavon-editor'
import Viewer from 'v-viewer'
import * as echarts from 'echarts'; //echarts5.0之后引入的方式
import {get, post} from "./utils/index";
import VueVideoPlayer from 'vue-video-player'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// require videojs style
import 'video.js/dist/video-js.css'

//导入验证码
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);

Vue.use(VueCodeMirror)
// import 'vue-video-player/src/custom-theme.css'
Vue.prototype.$http = {
  get,
  post
};



Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)
Vue.prototype.$echarts = echarts;
Vue.use(mavonEditor)
Vue.config.productionTip = false;
Vue.use(VueAxios,axios);
Vue.use(VueI18n);
Vue.use(ElementUI, {
  size: 'small'
});
Vue.config.productionTip = false

//使用钩子函数对路由进行权限跳
router.beforeEach((to, from, next) =>{
  document.title = `${to.meta.title} | 学员实训平台`;
  const token = localStorage.getItem('token');

  if (!token && to.path !== '/login') {
    next('/login');
  }else if(token && to.path == '/login'){
    next('/mainPage')

  }else if (to.meta.permission) {
    console.log(to.path);

  } else {
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }

});
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
});
const i18n = new VueI18n({
  locale: 'zh',
});

new Vue({
  router,
  i18n,
  data: function(){
    return {
      //URL: 'http://10.0.7.205:8089',
      URL: 'http://localhost:8089',

    }
  },
  render: h => h(App)
}).$mount('#app');
