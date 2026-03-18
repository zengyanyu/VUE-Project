import {fileURLToPath, URL} from 'node:url'

import {defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src') // 用 @ 代替 src 路径
        }
    },
    // 核心：添加全局常量定义
    define:{
        // 关闭生产环境的水合不匹配详情（优化体积）
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    }
})
