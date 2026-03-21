<script setup>

import {queryAllApi} from '../../api/logRecord.js'
import {onMounted, ref, watch} from "vue";

onMounted(() => {
  search()
})

const logRecordList = ref([])
const queryForm = ref({
  operateName: '',
  date: [],
  startTime: '',
  endTime: ''
})

// 查询
const search = async () => {
  // 获取查询表单的值
  // let value1 = queryForm.value.startTime[0];
  // let value2 = queryForm.value.startTime[1];
  // queryForm.value.startTime = value1;
  // queryForm.value.endTime = value2;
  // console.log(JSON.stringify(queryForm.value));

  const result = await queryAllApi();
  if (result.code == '200') {
    logRecordList.value = result.data;
  }
}

const clear = () => {
  queryForm.value = {
    operateName: '',
    date: [],
  }
  search()
}

// 侦听
watch(queryForm, (newVal, oldVal) => {
  queryForm.value.startTime = newVal.date[0]
  queryForm.value.Time = newVal.date[1]
  console.log(JSON.stringify(queryForm.value));
}, {deep: true})
</script>

<template>
  <h3>日志记录</h3>

  <div class="container">
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="操作名称">
        <el-input v-model="queryForm.operateName" placeholder="请输入操作名称" clearable/>
      </el-form-item>
      <el-form-item label="请求时间">
        <el-date-picker
            v-model="queryForm.date"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="请选择请求开始时间"
            end-placeholder="请选择请求结束时间"
            range-separator="到"
            clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="logRecordList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center"/>
      <el-table-column prop="method" label="请求方式" width="100" align="center"/>
      <el-table-column prop="operateName" label="操作名称" align="center"/>
      <el-table-column prop="path" label="请求路径" align="center"/>
      <!--      <el-table-column prop="requestIp" label="请求IP地址" align="center"/>-->
      <el-table-column prop="requestTime" label="请求开始时间" width="180" align="center"/>
      <el-table-column prop="responseTime" label="请求结束时间" width="180" align="center"/>
      <el-table-column prop="status" label="操作状态" width="100" align="center"/>
    </el-table>
  </div>
</template>

<style scoped>
.container {
  margin: 10px 0px;
}
</style>