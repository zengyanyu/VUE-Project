import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // 核心：添加全局常量定义
    define: {
        // 关闭生产环境的水合不匹配详情（优化体积）
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    },
    // 配置反向代理服务器
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                secure: false,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})


