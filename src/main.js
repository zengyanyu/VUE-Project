import {createApp} from 'vue'
import App from './App.vue'

// 1. 导入 Element Plus 核心库和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from "element-plus/es/locale/lang/zh-cn";

// 1. 引入全部图标（简单但体积稍大）
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 单独引入 ElMessage
import {ElMessage} from 'element-plus'

// 导入上面的路由配置
import router from './router'

const app = createApp(App)
// 注册路由
app.use(router)
// 注册 Element Plus + 配置中文
app.use(ElementPlus, {
    locale: zhCn // 关键：启用中文
})
// 将 ElMessage 挂载到全局
app.config.globalProperties.$message = ElMessage

// 2. 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 最后挂载应用
app.mount('#app')
