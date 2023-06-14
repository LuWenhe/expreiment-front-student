import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    component: () => import('../view/layout/Login.vue'),
    meta: {title: '登录'}
  },
  {
    path: '/index',
    name: '首页',
    component: () => import('../view/Index.vue'),
    children: [
      {
        path: '/',
        redirect: 'mainPage'
      },
      {
        path: 'mainPage',
        name: 'mainPage',
        component: () => import('../view/layout/MainPage.vue'),
        meta: {title: '主页'}
      },
      {
        path: 'allLesson',
        name: 'allLesson',
        component: () => import('../view/layout/allLesson'),
        meta: {title: '所有课程'}
      }, {
        path: 'teachTool',
        name: 'teachTool',
        component: () => import('../view/layout/TeachTool.vue'),
        meta: {title: '教学工具'}
      }, {
        path: 'experimentPaper',
        name: 'experimentPaper',
        component: () => import('../view/layout/experimentPaper'),
        meta: {title: '实验报告'}
      },
      {
        path: 'playVideo',
        name: 'playVideo',
        component: () => import('../view/layout/learn/playVideo'),
        meta: {title: '播放视频'}
      }
      , {
        path: 'onlineIDE',
        name: 'OnlineIDE',
        component: () => import('../view/layout/Homework.vue'),
        meta: {title: '在线编码工具'}
      },
      {
        path: 'lessonInfo',
        name: 'lessonInfo',
        component: () => import('../view/layout/learn/lessonInfo'),
        meta: {title: '课程信息'}
      },
      {
        path: 'toJupyterPage',
        name: 'ToJupyterPage',
        component: () => import('../view/layout/learn/ToJupyterPage'),
        meta: {title: 'Jupyter实验页面'}
      },
      {
        path: 'toWebIDEPage',
        name: 'ToWebIDEPage',
        component: () => import('../view/layout/learn/ToWebIDEPage'),
        meta: {title: 'WebIDE实验页面'}
      },
      {
        path: 'playVideo',
        name: 'playVideo',
        component: () => import('../view/layout/learn/playVideo'),
        meta: {title: '视频播放'}
      },
      {
        path: 'personInfo',
        name: 'personInfo',
        component: () => import('../view/layout/PersonInfo.vue'),
        meta: {title: '个人中心'}
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
