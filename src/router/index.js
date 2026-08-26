import layoutView from '../views/layout/index.vue'
import LoginPage from '../login/index.vue'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: "index",
        component: layoutView,
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'home', //修复：name不能为空
                component: () => import('../views/index/index.vue')
            },
            {
                path: '/clazz',
                name: 'clazz',
                component: () => import('../views/clazz/index.vue')
            },
            {
                path: '/stu',
                name: 'stu',
                component: () => import('../views/stu/index.vue')
            },
            {
                // 员工管理
                path: '/emp',
                name: 'emp',
                component: () => import('../views/emp/index.vue')
            },
            {
                // 部门管理
                path: '/dept',
                name: 'dept',
                component: () => import('../views/dept/index.vue')
            },
            {
                // 权限记录
                path: '/permissionRecord',
                name: 'permissionRecord',
                component: () => import('../views/permissionRecord/index.vue')
            },
            {
                path: '/logRecord',
                name: 'logRecord',
                component: () => import('../views/logRecord/index.vue')
            },
            {
                path: '/empStat',
                name: 'empStat',
                component: () => import('../views/empStat/index.vue')
            },
            {
                path: '/stuStat',
                name: 'stuStat',
                component: () => import('../views/stuStat/index.vue')
            },
            {
                path: '/dict',
                name: 'dict',
                component: () => import('../views/dict/index.vue')
            },
            {
                path: '/role',
                name: 'role',
                component: () => import('../views/role/index.vue')
            }
        ]
    },
    {
        path: '/login',
        name: "login",
        component: LoginPage
    },
    // 新增404兜底，任意不存在路由跳首页
    {
        path: '/:pathMatch(.*)*',
        redirect: '/index'
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
