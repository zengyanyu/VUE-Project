<script setup>
import {Edit, Delete, Search} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'

// import routerView from '.'

</script>

<template>
  <div>
    <el-container class="container">
      <el-header style="background-color: gray;">
        <span style="font-size: 22px">智能学习辅助系统</span>
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
                  <message/>
                </el-icon>
                系统信息管理
              </template>
              <el-menu-item index="/dept">
                <el-icon>
                  <HomeFilled/>
                </el-icon>
                部门管理
              </el-menu-item>
              <el-menu-item index="/emp">
                <el-icon>
                  <HomeFilled/>
                </el-icon>
                员工管理
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <message/>
                </el-icon>
                数据统计管理
              </template>
              <el-menu-item index="/empStat">
                <el-icon>
                  <HomeFilled/>
                </el-icon>
                员工信息统计
              </el-menu-item>
              <el-menu-item index="/clazzStat">
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
</style>