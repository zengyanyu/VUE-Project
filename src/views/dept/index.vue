<script setup>
    import {ref, onMounted} from 'vue'

    import {queryPageApi, addApi, queryByIdApi, deleteByIdApi} from '../../api/dept.js'
    import {ElMessage, ElMessageBox} from "element-plus";

    onMounted(() => {
        search()
    })

    const queryForm = ref({
        pageNum: 1,
        pageSize: 10,
        total: 0,
        deptName: ''
    })

    const search = async () => {
        const result = await queryPageApi(queryForm.value.pageNum,
            queryForm.value.pageSize,
            queryForm.value.deptName);

        deptList.value = result.records;

        queryForm.value.pageNum = result.current;
        queryForm.value.pageSize = result.size;
        queryForm.value.total = result.total;
    }

    const clear = () => {
        queryForm.value = {
            deptName: '',
            pageNum: 1,
            pageSize: 20,
        }
        search()
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
    <h3>部门管理</h3>

    <div class="container">
        <el-button type="primary" @click="addDept" size="small"> + 新增部门</el-button>
    </div>

    <div class="container">
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item label="部门名称">
                <el-input v-model="queryForm.deptName" placeholder="请输入部门名称" clearable/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="info" @click="clear">清空</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="deptList" border style="width: 100%">
            <el-table-column type="index" label="序号" width="100" align="center"/>
            <el-table-column prop="deptName" label="部门名称" width="300" align="center"/>
            <el-table-column prop="createTime" label="创建时间" align="center"/>
            <el-table-column prop="updateTime" label="修改时间" align="center"/>
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