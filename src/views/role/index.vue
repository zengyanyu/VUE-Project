<script setup>
import {queryPageApi, queryByIdApi, deleteByIdApi, exportExcelApi, addApi} from '../../api/role.js'
import {onMounted, ref, watch} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

onMounted(() => {
  search()
})

const roleList = ref([])

const dialogFormVisible = ref(false)
const formTitle = ref('')
const roleFormRef = ref()
const role = ref({
  roleCode: '',
  roleName: ''
})

const queryForm = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  roleCode: '',
  roleName: ''
})

// 查询
const search = async () => {
  const result = await queryPageApi(queryForm.value.pageNum,
      queryForm.value.pageSize,
      queryForm.value.roleCode,
      queryForm.value.roleName);

  roleList.value = result.records;

  queryForm.value.pageNum = result.current;
  queryForm.value.pageSize = result.size;
  queryForm.value.total = result.total;
}

const clear = () => {
  queryForm.value = {
    roleCode: '',
    roleName: '',
    pageNum: 1,
    pageSize: 20,
  }
  search()
}

// 新增角色按钮
const addRole = () => {
  dialogFormVisible.value = true
  formTitle.value = '新增角色'

  role.value = {roleCode: '', roleName: ''}
  // 重置表单的校验规则-提示信息
  if (roleFormRef.value) {
    roleFormRef.value.resetFields();
  }
}

// 导出操作
const exportRole = async () => {
  try {
    const blob = await exportExcelApi();

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `角色_${new Date().getTime()}.xlsx`
    a.click()
    URL.revokeObjectURL(url)

    ElMessage?.success('导出成功')
  } catch (err) {
    ElMessage?.error('导出失败')
    console.error('导出异常：', err)
  }
}

// 编辑角色按钮
const edit = async (id) => {
  formTitle.value = '编辑角色'
  // 重置表单的校验规则-提示信息
  if (roleFormRef.value) {
    roleFormRef.value.resetFields();
  }

  // 查询数据
  const result = await queryByIdApi(id);
  if (result.code == '200') {
    dialogFormVisible.value = true
    // 赋值
    role.value = result.data;
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
  roleCode: [
    {
      required: true, message: '请输入角色编码', trigger: 'blur'
    },
    {
      min: 3, max: 10, message: "角色编码的长度应该在3-10个字符", trigger: 'blur'
    }
  ],
  roleName: [
    {
      required: true, message: '请输入角色名称', trigger: 'blur'
    },
    {
      min: 3, max: 10, message: "角色名称的长度应该在3-10个字符", trigger: 'blur'
    }
  ]
})

// 保存操作
const save = async () => {
  // 表单校验
  if (!roleFormRef.value) {
    return;
  }
  roleFormRef.value.validate(async (valid) => {// valid:表示是否校验通过
    // 通过
    if (valid) {
      const result = await addApi(role.value)
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
  <h3>角色管理</h3>

  <div class="container">
    <el-button type="primary" @click="addRole" size="small"> + 新增角色</el-button>
    <el-button type="primary" @click="exportRole" size="small">
      <el-icon>
        <Download/>
      </el-icon>
      导出
    </el-button>
  </div>
  <div class="container">
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="角色编码">
        <el-input v-model="queryForm.roleCode" placeholder="请输入角色编码" clearable/>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input v-model="queryForm.roleName" placeholder="请输入角色名称" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center"/>
      <el-table-column prop="roleCode" label="角色编码" align="center"/>
      <el-table-column prop="roleName" label="角色名称" align="center"/>
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

  <!--  Dialog对话框  -->
  <el-dialog v-model="dialogFormVisible" :title='formTitle' width="500">
    <el-form :model="role" :rules="rules" ref="roleFormRef">
      <el-form-item label="角色编码" label-width="100px" prop="roleCode">
        <el-input v-model="role.roleCode" clearable/>
      </el-form-item>
      <el-form-item label="角色名称" label-width="100px" prop="roleName">
        <el-input v-model="role.roleName" clearable/>
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