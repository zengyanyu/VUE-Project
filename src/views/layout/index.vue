<script setup>
    import {
        Edit,
        Delete,
        Search,
        Promotion,
        HomeFilled,
        HelpFilled,
        UserFilled,
        Setting,
        OfficeBuilding,
        User,
        Menu,
        CollectionTag,
        Message
    } from '@element-plus/icons-vue'
    import {ElMessage, ElMessageBox} from 'element-plus'
    import {ref, onMounted} from "vue";
    import {useRouter} from 'vue-router'

    const loginName = ref('');

    const router = useRouter();

    // 修改密码
    const handleModifyPwd = () => {
        console.log("修改密码");
    }

    // 退出登录
    const handleLogout = () => {
        ElMessageBox.confirm(
            '您确认退出登录吗?',
            '温馨提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async () => {// 确认
                ElMessage({
                    type: 'success',
                    message: "退出登录成功",
                })
                localStorage.removeItem("loginUser")
                // 跳转页面
                router.push("/login")
            })
            .catch(() => {
            })
    }

    // 钩子函数,页面加载完毕的时候执行
    onMounted(() => {
        const loginUser = JSON.parse(localStorage.getItem("loginUser"));
        if (loginUser && loginUser.username) {
            loginName.value = loginUser.username
        }
    })

</script>

<template>
    <div>
        <el-container class="container">
            <el-header
                    style="background: linear-gradient(90deg, #004e92 0%, #00b894 100%); display: flex; justify-content: space-between; align-items: center; position: relative; overflow: hidden;">
                <!-- 渐变网格背景装饰 -->
                <div class="header-grid-overlay"></div>
                <!-- 渐变立体标题 -->
                <span class="system-title">智能学习辅助系统</span>
                <div class="header-buttons">
                    <el-button type="primary" plain @click="handleModifyPwd" size="small">
                        <el-icon>
                            <Edit/>&nbsp;
                        </el-icon>
                        修改密码
                    </el-button>
                    <el-button type="danger" plain @click="handleLogout" size="small">
                        <el-icon>
                            <SwitchButton/>&nbsp;
                        </el-icon>
                        退出登录
                    </el-button>
                    【{{loginName}}】
                </div>
            </el-header>

            <el-container>
                <!--   左侧菜单     -->
                <el-aside width="200px" style="background-color: #f2f2f2;">
                    <!--  el-menu 中的router默认是关闭的,需要将其开启,然后才可以根据el-menu-item中的index进行路由跳转  -->
                    <el-menu router="true">
                        <el-menu-item index="/index">
                            <el-icon>
                                <Promotion/>
                            </el-icon>
                            首页
                        </el-menu-item>

                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon>
                                    <HomeFilled/>
                                </el-icon>
                                班级学员管理
                            </template>
                            <el-menu-item index="/clazz">
                                <el-icon>
                                    <HelpFilled/>
                                </el-icon>
                                班级管理
                            </el-menu-item>
                            <el-menu-item index="/stu">
                                <el-icon>
                                    <UserFilled/>
                                </el-icon>
                                学员管理
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon>
                                    <Setting/>
                                </el-icon>
                                系统信息管理
                            </template>
                            <el-menu-item index="/dept">
                                <el-icon>
                                    <OfficeBuilding/>
                                </el-icon>
                                部门管理
                            </el-menu-item>
                            <el-menu-item index="/emp">
                                <el-icon>
                                    <User/>
                                </el-icon>
                                员工管理
                            </el-menu-item>
                            <el-menu-item index="/logRecord">
                                <el-icon>
                                    <Search/>
                                </el-icon>
                                日志记录
                            </el-menu-item>
                            <el-menu-item index="/dict">
                                <el-icon>
                                    <CollectionTag/>
                                </el-icon>
                                字典管理
                            </el-menu-item>
                            <el-menu-item index="/role">
                                <el-icon>
                                    <Menu/>
                                </el-icon>
                                角色管理
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon>
                                    <Message/>
                                </el-icon>
                                数据统计管理
                            </template>
                            <el-menu-item index="/empStat">
                                <el-icon>
                                    <HomeFilled/>
                                </el-icon>
                                员工信息统计
                            </el-menu-item>
                            <el-menu-item index="/stuStat">
                                <el-icon>
                                    <HomeFilled/>
                                </el-icon>
                                学员信息统计
                            </el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-aside>

                <el-main style="background-color: aliceblue">
                    <!-- 路由出口：必须有，否则组件无法渲染 -->
                    <router-view></router-view>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<style scoped>
    .header-buttons {
        display: flex;
        gap: 6px; /* 按钮之间的间距 */
        z-index: 10; /* 确保按钮在网格层之上 */
        position: relative;
    }

    /* 标题容器样式 */
    .el-header {
        height: 60px !important; /* 固定header高度，适配Element Plus默认 */
    }

    /* 渐变网格背景装饰层 */
    .header-grid-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(90deg, rgba(0, 255, 0, 0.15) 1px, transparent 1px),
        linear-gradient(rgba(0, 255, 0, 0.15) 1px, transparent 1px);
        background-size: 20px 20px;
        pointer-events: none;
        z-index: 1;
    }

    /* 渐变立体标题样式 */
    .system-title {
        font-size: 28px;
        font-weight: bold;
        background: linear-gradient(90deg, #ffffff 0%, #f0f0f0 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        z-index: 10;
        position: relative;
        letter-spacing: 2px;
    }
</style>