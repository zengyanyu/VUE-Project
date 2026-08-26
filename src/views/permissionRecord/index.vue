<script setup>
import {queryPageApi} from '../../api/permissionRecord.js'
import {onMounted, ref} from "vue";

onMounted(() => {
  search()
})

const dictList = ref([])

const dialogFormVisible = ref(false)
const formTitle = ref('')
const dictFormRef = ref()
const dict = ref({
  code: '',
  operationName: ''
})

const queryForm = ref({
  operationName: '',
  pageNum: 1,
  pageSize: 10,
  total: 0,
})

// 查询
const search = async () => {
  const result = await queryPageApi(queryForm.value.pageNum,
      queryForm.value.pageSize,
      queryForm.value.operationName);

  dictList.value = result.records;

  queryForm.value.pageNum = result.current;
  queryForm.value.pageSize = result.size;
  queryForm.value.total = result.total;
}

const clear = () => {
  queryForm.value = {
    operationName: '',
    code: '',
    pageNum: 1,
    pageSize: 20,
  }
  search()
}

// 分页
const background = ref(true)

const handleSizeChange = (val) => {
  search();
}
const handleCurrentChange = (val) => {
  search();
}
</script>

<template>
  权限记录
  <div class="container">
  </div>
  <div class="container">
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="操作名称">
        <el-input v-model="queryForm.operationName" placeholder="请输入操作名称" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dictList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center"/>
      <el-table-column prop="requestMethod" label="请求方法" align="center"/>
      <el-table-column prop="apiOperationName" label="操作名称" align="center"/>
      <el-table-column prop="methodName" label="方法名称" align="center"/>
      <el-table-column prop="path" label="路径" align="center"/>
    </el-table>
  </div>

  <!-- 分页条 -->
  <div class="container">
    <el-pagination
        v-model:current-page="queryForm.pageNum"
        v-model:page-size="queryForm.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryForm.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.container {
  margin: 10px 0px;
}
</style>