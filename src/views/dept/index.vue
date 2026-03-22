<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'

import {queryAllApi, addApi, queryByIdApi, deleteByIdApi} from '../../api/dept.js'
import {ElMessage, ElMessageBox} from "element-plus";

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

const dialogFormVisible = ref(false)
const formTitle = ref('')

const deptFormRef = ref()
const dept = ref({
  deptName: '',
})

// 新增部门按钮
const addDept = () => {
  dialogFormVisible.value = true
  formTitle.value = '新增部门'

  dept.value = {deptName: ''}
  // 重置表单的校验规则-提示信息
  if (deptFormRef.value) {
    deptFormRef.value.resetFields();
  }
}

// 编辑部门按钮
const edit = async (id) => {
  formTitle.value = '编辑部门'
  // 重置表单的校验规则-提示信息
  if (deptFormRef.value) {
    deptFormRef.value.resetFields();
  }

  // 查询数据
  const result = await queryByIdApi(id);
  if (result.code == '200') {
    dialogFormVisible.value = true
    // 赋值
    dept.value = result.data;
  }
}

// 删除
const deleteBtn = (id) => {
  ElMessageBox.confirm(
      '确认删除操作?',
      '温馨提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        const result = await deleteByIdApi(id);

        ElMessage({
          type: 'success',
          message: result.msg,
        })
        search()
      })
      .catch(() => {
        // ElMessage({
        //   type: 'info',
        //   // message: 'Delete canceled',
        // })
      })
}

const rules = ref({
  deptName: [
    {
      required: true, message: '请输入部门名称', trigger: 'blur'
    },
    {
      min: 3, max: 10, message: "部门名称的长度应该在3-10个字符", trigger: 'blur'
    }
  ]
})

// 保存操作
const save = async () => {
  // 表单校验
  if (!deptFormRef.value) {
    return;
  }
  deptFormRef.value.validate(async (valid) => {// valid:表示是否校验通过
    // 通过
    if (valid) {
      const result = await addApi(dept.value)
      if (result.code == 200) {
        ElMessage.success(result.msg);
        dialogFormVisible.value = false
        search()
      } else {
        ElMessage.error(result.msg)
      }
    } else {// 表单校验不通过
      ElMessage.error("表单校验不通过!")
    }
  })
}
</script>

<template>
  <h3>部门管理</h3>

  <div class="container">
    <el-button type="primary" @click="addDept" size="small"> + 新增部门</el-button>
  </div>

  <div class="container">
    <el-table :data="deptList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center"/>
      <el-table-column prop="deptName" label="部门名称" width="260" align="center"/>
      <el-table-column prop="updateTime" label="最后操作时间" width="300" align="center"/>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope.row.id)">
            <el-icon>
              <EditPen/>
            </el-icon>
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="deleteBtn(scope.row.id)">
            <el-icon>
              <Delete/>
            </el-icon>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!--  Dialog对话框  -->
  <el-dialog v-model="dialogFormVisible" :title='formTitle' width="500">
    <!--    {{dept}}-->
    <el-form :model="dept" :rules="rules" ref="deptFormRef">
      <el-form-item label="部门名称" label-width="100px" prop="deptName">
        <el-input v-model="dept.deptName" clearable/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<style scoped>
.container {
  margin: 10px 0px;
}
</style>