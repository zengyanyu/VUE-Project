<script setup>
    import {ref, onMounted} from 'vue'
    import {useRouter} from 'vue-router'

    // 路由实例
    const router = useRouter();

    // 统计数据
    const statsData = ref([
        {label: '班级总数', value: '28', color: '#409EFF'},
        {label: '学员人数', value: '1256', color: '#67C23A'},
        {label: '部门数量', value: '12', color: '#E6A23C'},
        {label: '员工人数', value: '86', color: '#F56C6C'}
    ])

    // 快捷入口
    const quickEntry = ref([
        {label: '班级管理', path: '/clazz', color: '#409EFF'},
        {label: '部门管理', path: '/dept', color: '#67C23A'},
        {label: '员工管理', path: '/emp', color: '#E6A23C'},
        {label: '日志记录', path: '/logRecord', color: '#F56C6C'},
        {label: '字典管理', path: '/dict', color: '#909399'},
        {label: '角色管理', path: '/role', color: '#722ED1'}
    ])

    // 待办事项
    const todoList = ref([
        {id: 1, title: '学员信息审核', time: '2026-04-04 10:30', status: '待处理'},
        {id: 2, title: '部门人员调整', time: '2026-04-03 16:00', status: '处理中'},
        {id: 3, title: '系统权限更新', time: '2026-04-02 09:15', status: '已完成'},
        {id: 4, title: '数据统计报表', time: '2026-04-01 14:20', status: '待处理'}
    ])

    // 页面挂载后执行
    onMounted(() => {
        // 可在此处调用接口获取真实数据
        console.log('首页加载完成')
    })

    // 跳转页面
    const goToPage = (path) => {
        router.push(path)
    }
</script>

<template>
    <div class="home-page">
        <!-- 欢迎语 -->
        <div class="welcome-card">
            <div class="welcome-info">
                <h1 class="welcome-title">👋 欢迎回来，管理员！</h1>
                <p class="welcome-desc">今天是 {{ new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long',
                    day: 'numeric', weekday: 'long' }) }}，祝您工作愉快！</p>
            </div>
            <div class="welcome-date">
                <span class="date-text">{{ new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}</span>
            </div>
        </div>

        <!-- 数据统计卡片 -->
        <el-row :gutter="20" class="stats-row">
            <el-col :xs="24" :sm="12" :md="6" v-for="item in statsData" :key="item.label">
                <el-card class="stats-card" shadow="hover">
                    <div class="stats-content">
                        <div class="stats-icon" :style="{ backgroundColor: item.color + '20', color: item.color }">
                            <el-icon :size="30">
                                <component :is="item.icon"/>
                            </el-icon>
                        </div>
                        <div class="stats-info">
                            <div class="stats-value">{{ item.value }}</div>
                            <div class="stats-label">{{ item.label }}</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 快捷入口 & 待办事项 -->
        <el-row :gutter="20" class="content-row">
            <!-- 快捷入口 -->
            <el-col :xs="24" :md="12">
                <el-card class="entry-card" shadow="hover" header="快捷入口">
                    <div class="entry-list">
                        <div
                                class="entry-item"
                                v-for="item in quickEntry"
                                :key="item.label"
                                @click="goToPage(item.path)"
                                :style="{ borderColor: item.color + '30' }"
                        >
                            <div class="entry-icon" :style="{ backgroundColor: item.color + '20', color: item.color }">
                                <el-icon :size="28">
                                    <component :is="item.icon"/>
                                </el-icon>
                            </div>
                            <span class="entry-label">{{ item.label }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <!-- 待办事项 -->
            <el-col :xs="24" :md="12">
                <el-card class="todo-card" shadow="hover" header="待办事项">
                    <el-table :data="todoList" style="width: 100%" :show-header="false" :border="false">
                        <el-table-column prop="title" min-width="120">
                            <template #default="{ row }">
                                <div class="todo-title">
                                    <el-icon :size="16" color="#F56C6C" v-if="row.status === '待处理'">
                                        <Bell/>
                                    </el-icon>
                                    <span>{{ row.title }}</span>
                                </div>
                                <div class="todo-time">{{ row.time }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" width="100" align="right">
                            <template #default="{ row }">
                                <el-tag
                                        :type="row.status === '待处理' ? 'danger' : row.status === '处理中' ? 'warning' : 'success'"
                                        size="small"
                                >
                                    {{ row.status }}
                                </el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
    .home-page {
        padding: 20px;
        background-color: #f5f7fa;
        min-height: calc(100vh - 84px);
    }

    /* 欢迎卡片 */
    .welcome-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 32px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        color: #fff;
        margin-bottom: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .welcome-title {
        margin: 0 0 8px 0;
        font-size: 24px;
        font-weight: 600;
    }

    .welcome-desc {
        margin: 0;
        font-size: 14px;
        opacity: 0.9;
    }

    .welcome-date {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .date-text {
        font-size: 20px;
        font-weight: 600;
    }

    /* 统计卡片 */
    .stats-row {
        margin-bottom: 24px;
    }

    .stats-card {
        border-radius: 12px;
        border: none;
    }

    .stats-content {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 8px 0;
    }

    .stats-icon {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .stats-info {
        flex: 1;
    }

    .stats-value {
        font-size: 28px;
        font-weight: 700;
        color: #303133;
        line-height: 1.2;
    }

    .stats-label {
        font-size: 14px;
        color: #909399;
        margin-top: 4px;
    }

    /* 内容区域 */
    .content-row {
        margin-bottom: 24px;
    }

    .entry-card,
    .todo-card {
        border-radius: 12px;
        border: none;
        height: 100%;
    }

    /* 快捷入口 */
    .entry-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        padding: 8px 0;
    }

    .entry-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 20px 12px;
        border: 1px solid #ebeef5;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .entry-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-color: var(--el-color-primary);
    }

    .entry-icon {
        width: 56px;
        height: 56px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .entry-label {
        font-size: 14px;
        color: #606266;
        font-weight: 500;
    }

    /* 待办事项 */
    .todo-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #303133;
        font-weight: 500;
    }

    .todo-time {
        font-size: 12px;
        color: #909399;
        margin-top: 4px;
    }
</style>