<script setup>
import {ref} from 'vue'
import {ElMessage} from 'element-plus'
import {loginApi} from "../api/login";
import {useRouter} from 'vue-router'

// 表单数据
const loginForm = ref({
  username: '',
  password: ''
})

const router = useRouter();

// 登录操作
const handleLogin = async () => {
  // 这里可以替换为实际接口请求
  const result = await loginApi(loginForm.value);
  if (result.code == '200') {
    // 1.提示信息
    ElMessage.success('登录成功')
    // 2.存储当前登录的用户信息
    localStorage.setItem("loginUser", JSON.stringify(result.data))

    // 2.跳转页面--跳转到[首页]
    router.push("/index");
  } else {
    ElMessage.warning(result.msg)
  }
}

// 取消重置
const handleCancel = () => {
  loginForm.value = {username: '', password: ''}
}
</script>

<template>
  <div class="login-container">
    <!-- 左侧插画区域 -->
    <!--    <div class="left-section">
          <div class="logo">
            <img src="https://www.itheima.com/favicon.ico" alt="程序员" class="logo-img"/>
            <div class="logo-text">
              <h2>程序员</h2>
              <p>www.zengyanyu.com</p>
            </div>
          </div>
          <div class="illustration">
            &lt;!&ndash; 插画内容 &ndash;&gt;
            <div class="tag tag-1">责任</div>
            <div class="tag tag-2">务实</div>
            <div class="tag tag-3">创新</div>
            <div class="tag tag-4">育人</div>
            &lt;!&ndash; 人物头像占位 &ndash;&gt;
            <div class="avatars">
              <div v-for="i in 10" :key="i" class="avatar-item"></div>
            </div>
            &lt;!&ndash; 场景插画简化 &ndash;&gt;
            <div class="scene">
              <div class="stage"></div>
              <div class="person person-1"></div>
              <div class="person person-2"></div>
              <div class="person person-3"></div>
              <div class="person person-4"></div>
            </div>
          </div>
        </div>-->

    <!-- 右侧登录表单 -->
    <div class="right-section">
      <div class="login-form">
        <h1 class="title">智能学习辅助系统</h1>
        <el-form :model="loginForm" label-width="100px">
          <el-form-item label="用户名" required>
            <el-input
                v-model="loginForm.username"
                placeholder="请输入员工用户名"
                clearable
            />
          </el-form-item>
          <el-form-item label="密码" required>
            <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                show-password
                clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
            <el-button class="cancel-btn" @click="handleCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #fff;
  font-family: "Microsoft Yahei", sans-serif;
}

/* 左侧区域 */
.left-section {
  flex: 1;
  padding: 20px 60px;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 60px;
}

.logo-img {
  width: 48px;
  height: 48px;
}

.logo-text h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.logo-text p {
  margin: 4px 0 0;
  font-size: 16px;
  color: #d81e06;
}

.illustration {
  position: relative;
  width: 100%;
  height: 70%;
}

.tag {
  position: absolute;
  padding: 4px 12px;
  background: #e8f3ff;
  color: #409eff;
  border-radius: 16px;
  font-size: 14px;
}

.tag-1 {
  top: 20%;
  left: 10%;
}

.tag-2 {
  top: 10%;
  left: 30%;
}

.tag-3 {
  top: 30%;
  left: 50%;
}

.tag-4 {
  top: 25%;
  left: 70%;
}

.avatars {
  position: absolute;
  top: 15%;
  left: 15%;
  display: grid;
  grid-template-columns: repeat(5, 40px);
  gap: 20px;
}

.avatar-item {
  width: 40px;
  height: 40px;
  background: #f0f0f0;
  border-radius: 50%;
}

.scene {
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 60%;
}

.stage {
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 60%;
  background: linear-gradient(180deg, #e5edf5 0%, #d0e1f2 100%);
  clip-path: polygon(10% 0, 90% 20%, 100% 100%, 0% 100%);
}

.person {
  position: absolute;
  background: #409eff;
  border-radius: 4px;
}

.person-1 {
  bottom: 20%;
  left: 30%;
  width: 60px;
  height: 120px;
  background: #1890ff;
}

.person-2 {
  bottom: 5%;
  left: 50%;
  width: 40px;
  height: 90px;
  background: #36cbcb;
}

.person-3 {
  bottom: 30%;
  left: 65%;
  width: 35px;
  height: 70px;
  background: #ff7d00;
}

.person-4 {
  bottom: 10%;
  left: 20%;
  width: 35px;
  height: 70px;
  background: #ff6b6b;
}

/* 右侧登录表单 */
.right-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f8ff;
}

.login-form {
  width: 420px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}

.title {
  margin: 0 0 30px;
  font-size: 32px;
  color: #333;
  text-align: center;
}

.login-btn {
  width: 48%;
  height: 30px;
  font-size: 16px;
}

.cancel-btn {
  width: 48%;
  height: 30px;
  font-size: 16px;
  margin-left: 4%;
}
</style>