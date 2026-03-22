import EmployeeList from '../views/emp/index.vue'
import ClazzList from '../views/clazz/index.vue'
import StuList from '../views/stu/index.vue'
import DepartmentList from '../views/dept/index.vue'
import StuStatList from '../views/stuStat/index.vue'
import EmpStatList from '../views/empStat/index.vue'
import DictList from '../views/dict/index.vue'
import IndexList from '../views/index/index.vue'
import layoutView from '../views/layout/index.vue'
import LogRecordList from '../views/logRecord/index.vue'
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
                path: '/clazz',
                name: 'clazz',
                component: ClazzList
            },
            {
                path: '/stu',
                name: 'stu',
                component: StuList
            },
            {
                // 员工管理
                path: '/emp',
                name: 'emp',
                component: EmployeeList
            },
            {
                // 部门管理
                path: '/dept',
                name: 'dept',
                component: DepartmentList
            },
            {
                path: '/logRecord',
                name: 'logRecord',
                component: LogRecordList
            },
            {
                path: '/empStat',
                name: 'empStat',
                component: EmpStatList
            },
            {
                path: '/stuStat',
                name: 'stuStat',
                component: StuStatList
            },
            {
                path: '/dict',
                name: 'dict',
                component: DictList
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