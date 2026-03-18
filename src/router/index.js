import EmployeeList from '../views/emp/index.vue'
import DepartmentList from '../views/dept/index.vue'
import IndexList from '../views/index/index.vue'
import layoutView from '../views/layout/index.vue'
import LoginPage from '../login/index.vue'
import {createRouter, createWebHistory} from 'vue-router'

// 2. 核心：配置 path: '/' 的路由
const routes = [
    {
        path: '/',
        name: "index",
        component: layoutView,
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: '',
                component: IndexList
            },
            {
                // 员工管理
                path: '/emp',
                name: '',
                component: EmployeeList
            },
            // 其他路由可后续添加
            {
                // 部门管理
                path: '/dept',
                name: '',
                component: DepartmentList
            }

        ]
    },
    {
        path: '/login',// 登录
        name: "login",
        component: LoginPage

    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

export default router