import Vue from 'vue'
import VueRouter from 'vue-router'
// import { GetToken } from '@/utils/status.js'
// import { CheckToken } from '@/api/user.js'

Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [
    {
        path: '/frontAdmin',
        name: '首页',
        component: () => import('../view/index'),
        children: [
            {
                path: '/frontAdmin/mainPage',
                name: 'mainPage',
                component: () => import('../view/layout/mainPage'),
                meta: {title:'主页'}
            },
            {
                path: '/frontAdmin/allLesson',
                name: 'allLesson',
                component: () => import('../view/layout/allLesson'),
                meta: {title:'所有课程'}
            }, {
                path: '/frontAdmin/teachTool',
                name: 'teachTool',
                component: () => import('../view/layout/teachTool'),
                meta: {title:'教学工具'}
            }, {
                path: '/frontAdmin/experimentPaper',
                name: 'experimentPaper',
                component: () => import('../view/layout/experimentPaper'),
                meta: {title:'实验报告'}
            },
            {
                path: '/frontAdmin/playVideo',
                name:'playVideo',
                component:()=>import('../view/layout/learn/playVideo'),
                meta: {title: '播放视频'}

            }
            , {
                path: '/frontAdmin/OnlineIDE',
                name: 'OnlineIDE',
                component: () => import('../view/layout/homework'),
                meta: {title:'在线编码工具'}

            },
            {
                path:'/frontAdmin/lessonInfo',
                name:'lessonInfo',
                component:()=>import('../view/layout/learn/lessonInfo'),
                meta: {title:'课程信息'}
            },
            {
                path:'/frontAdmin/ToJupyterPage',
                name:'ToJupyterPage',
                component:()=>import('../view/layout/learn/ToJupyterPage'),
                meta: {title:'Jupyter实验页面'}
            },
            {
                path:'/frontAdmin/ToWebIDEPage',
                name:'ToWebIDEPage',
                component:()=>import('../view/layout/learn/ToWebIDEPage'),
                meta: {title:'WebIDE实验页面'}
            },
            {
                path: '/frontAdmin/playVideo',
                name:'playVideo',
                component:()=>import('../view/layout/learn/playVideo'),
                meta:{title: '视频播放'}
            },
            {
                path: '/frontAdmin/personInfo',
                name:'personInfo',
                component:()=>import('../view/layout/personInfo'),
                meta: {title: '个人中心'}
            }
        ]
    },
    {
        path: '/frontAdmin/login',
        component: () => import('../view/layout/login'),
        meta: {title: '登录'}
    },

    // {
    //     path: '/',
    //     redirect: '/mainPage',
    //     name: '首页',
    //     meta: {title:'首页'},
    //     component: () => import('../view/index'),
    //     children: [
    //         {
    //             path: '/mainPage',
    //             name: 'mainPage',
    //             component: () => import('../view/layout/mainPage'),
    //             meta: {title:'主页'}
    //         },
    //         {
    //             path: '/allLesson',
    //             name: 'allLesson',
    //             component: () => import('../view/layout/allLesson'),
    //             meta: {title:'所有课程'}
    //         }, {
    //             path: '/teachTool',
    //             name: 'teachTool',
    //             component: () => import('../view/layout/teachTool'),
    //             meta: {title:'教学工具'}
    //         }, {
    //             path: '/experimentPaper',
    //             name: 'experimentPaper',
    //             component: () => import('../view/layout/experimentPaper'),
    //             meta: {title:'实验报告'}
    //         },
    //         {
    //             path: '/playVideo',
    //             name:'playVideo',
    //             component:()=>import('../view/layout/learn/playVideo'),
    //             meta: {title: '播放视频'}
    //
    //         }
    //         , {
    //             path: '/OnlineIDE',
    //             name: 'OnlineIDE',
    //             component: () => import('../view/layout/homework'),
    //             meta: {title:'在线编码工具'}
    //
    //         },
    //         {
    //             path:'/lessonInfo',
    //             name:'lessonInfo',
    //             component:()=>import('../view/layout/learn/lessonInfo'),
    //             meta: {title:'课程信息'}
    //         },
    //         {
    //             path:'/ToJupyterPage',
    //             name:'ToJupyterPage',
    //             component:()=>import('../view/layout/learn/ToJupyterPage'),
    //             meta: {title:'Jupyter实验页面'}
    //         },
    //         {
    //             path:'/ToWebIDEPage',
    //             name:'ToWebIDEPage',
    //             component:()=>import('../view/layout/learn/ToWebIDEPage'),
    //             meta: {title:'WebIDE实验页面'}
    //         },
    //         {
    //             path: '/playVideo',
    //             name:'playVideo',
    //             component:()=>import('../view/layout/learn/playVideo'),
    //             meta:{title: '视频播放'}
    //         },
    //         {
    //             path: '/personInfo',
    //             name:'personInfo',
    //             component:()=>import('../view/layout/personInfo'),
    //             meta: {title: '个人中心'}
    //         }
    //
    //     ]
    // },
    // {
    //     path: '/login',
    //     component: () => import('../view/layout/login'),
    //     meta: { title: '登录' }
    // },

]

const router = new VueRouter({
    mode: 'hash',
    routes
})


export default router
