import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import home from '@/views/home/index'
// import HelloWorld from '@/components/HelloWorld'
// import flow from '@/views/definition'
// import category from '@/views/category/index'
import processDetail from '@/views/process/processDetail'


export default new Router({
    // mode: 'history',
    routes:[
        {
            path:'/',
            name:"home",
            component: home,
            children: [
                {
                    path: '/category',
                    name: 'category',
                    component: (resolve) => require(['@/views/category/index'], resolve),
                },
                {
                    path: '/approve',
                    name: 'approve',
                    component: (resolve) => require(['@/components/approveList'], resolve),
                },
                {
                    path: '/flow',
                    name: 'flow',
                    component: (resolve) => require(['@/views/definition'], resolve),
                },
                {
                    path: '/process',
                    name: 'process',
                    component: (resolve) => require(['@/views/process'], resolve),
                },
                {
                    path: '/form',
                    name: 'form',
                    component: (resolve) => require(['@/views/form'], resolve),
                },
                {
                    path: '/processDetail',
                    name: 'processDetail',
                    component: (resolve) => require(['@/views/process/processDetail'], resolve),
                },
                {
                    path: '/own',
                    name: 'own',
                    component: (resolve) => require(['@/views/work/own'], resolve),
                },
                {
                    path: '/todo',
                    name: 'todo',
                    component: (resolve) => require(['@/views/work/todo'], resolve),
                },
                {
                    path: '/detail',
                    name: 'detail',
                    component: (resolve) => require(['@/views/work/detail'], resolve),
                },
                {
                    path: '/finished',
                    name: 'finished',
                    component: (resolve) => require(['@/views/work/finished'], resolve),
                },
                {
                    path: '/copy',
                    name: 'copy',
                    component: (resolve) => require(['@/views/work/copy'], resolve),
                },
            ]
        },
        {
            path:'/processDetail',
            name:"processDetail",
            component: processDetail
        },
        // {
        //     path:'/',
        //     name:"HelloWorld",
        //     component: HelloWorld
        // },
        // {
        //     path: '/flow',
        //     name: 'flow',
        //     component: flow
        // },
        // {
        //     path: '/category',
        //     name: 'category',
        //     component: category
        // },
    ]
})
