<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'

import {queryAllApi} from '../../api/dept.js'

onMounted(() => {
  search()
})

const search = async () => {
  // 之前的代码
  // const data = await axios.get("http://localhost:8081/department/findAll")

  // 现在的代码
  const result = await queryAllApi();
  if (result.code == '200') {
    deptList.value = result.data;
  }
}
const deptList = ref([])

</script>

<template>
  <h3>部门管理</h3>

  <div class="container">
    <el-button type="primary"> + 新增部门</el-button>
  </div>

  <div class="container">
    <el-table :data="deptList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center"/>
      <el-table-column prop="deptName" label="部门名称" width="260" align="center"/>
      <el-table-column prop="updateTime" label="最后操作时间" width="300" align="center"/>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" size="small">
            <el-icon>
              <EditPen/>
            </el-icon>
            编辑
          </el-button>
          <el-button type="danger" size="small">
            <el-icon>
              <Delete/>
            </el-icon>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.container {
  margin: 10px 0px;

}
</style>