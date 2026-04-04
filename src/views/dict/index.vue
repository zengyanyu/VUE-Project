<script setup>
    import {queryPageApi, queryByIdApi, deleteByIdApi, addApi} from '../../api/dict.js'
    import {onMounted, ref, watch} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";

    onMounted(() => {
        search()
    })

    const dictList = ref([])

    const dialogFormVisible = ref(false)
    const formTitle = ref('')
    const dictFormRef = ref()
    const dict = ref({
        code: '',
        name: ''
    })

    const queryForm = ref({
        operateName: '',
        pageNum: 1,
        pageSize: 10,
        total: 0,
        code: '',
        name: ''
    })

    // 查询
    const search = async () => {
        const result = await queryPageApi(queryForm.value.pageNum,
            queryForm.value.pageSize,
            queryForm.value.code,
            queryForm.value.name);

        dictList.value = result.records;

        queryForm.value.pageNum = result.current;
        queryForm.value.pageSize = result.size;
        queryForm.value.total = result.total;
    }

    const clear = () => {
        queryForm.value = {
            operateName: '',
            code: '',
            name: '',
            pageNum: 1,
            pageSize: 20,
        }
        search()
    }

    // 新增部门按钮
    const addDict = () => {
        dialogFormVisible.value = true
        formTitle.value = '新增字典'

        dict.value = {code: '', name: ''}
        // 重置表单的校验规则-提示信息
        if (dictFormRef.value) {
            dictFormRef.value.resetFields();
        }
    }

    // 编辑部门按钮
    const edit = async (id) => {
        formTitle.value = '编辑字典'
        // 重置表单的校验规则-提示信息
        if (dictFormRef.value) {
            dictFormRef.value.resetFields();
        }

        // 查询数据
        const result = await queryByIdApi(id);
        if (result.code == '200') {
            dialogFormVisible.value = true
            // 赋值
            dict.value = result.data;
        }
    }

    // 删除
    const deleteBtn = (id) => {
        ElMessageBox.confirm(
            '确认删除操作?',
            '温馨提示',
            {
                confirmButtonText: '确认',
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
        code: [
            {
                required: true, message: '请输入字典编码', trigger: 'blur'
            },
            {
                min: 3, max: 10, message: "字典编码的长度应该在3-10个字符", trigger: 'blur'
            }
        ],
        name: [
            {
                required: true, message: '请输入字典名称', trigger: 'blur'
            },
            {
                min: 3, max: 10, message: "字典名称的长度应该在3-10个字符", trigger: 'blur'
            }
        ]
    })

    // 保存操作
    const save = async () => {
        // 表单校验
        if (!dictFormRef.value) {
            return;
        }
        dictFormRef.value.validate(async (valid) => {// valid:表示是否校验通过
            // 通过
            if (valid) {
                const result = await addApi(dict.value)
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
    <h3>字典管理</h3>

    <div class="container">
        <el-button type="primary" @click="addDict" size="small"> + 新增字典</el-button>
    </div>
    <div class="container">
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item label="字典编码">
                <el-input v-model="queryForm.code" placeholder="请输入字典编码" clearable/>
            </el-form-item>
            <el-form-item label="字典名称">
                <el-input v-model="queryForm.name" placeholder="请输入字典名称" clearable/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="info" @click="clear">清空</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dictList" border style="width: 100%">
            <el-table-column type="index" label="序号" width="60" align="center"/>
            <el-table-column prop="code" label="字典编码" align="center"/>
            <el-table-column prop="name" label="字典名称" align="center"/>
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
        <el-form :model="dict" :rules="rules" ref="dictFormRef">
            <el-form-item label="字典编码" label-width="100px" prop="code">
                <el-input v-model="dict.code" clearable/>
            </el-form-item>
            <el-form-item label="字典名称" label-width="100px" prop="name">
                <el-input v-model="dict.name" clearable/>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="save">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped>
    .container {
        margin: 10px 0px;
    }
</style>