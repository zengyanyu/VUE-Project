<script setup>
    import {queryPageApi, exportExcelApi, deleteBatch} from '../../api/logRecord.js'
    import {onMounted, ref, watch} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";

    onMounted(() => {
        search()
    })

    const logRecordList = ref([])
    const queryForm = ref({
        operateName: '',
        date: [],
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10,
        total: 0
    })

    // 查询
    const search = async () => {
        const result = await queryPageApi(queryForm.value.pageNum,
            queryForm.value.pageSize,
            queryForm.value.startTime,
            queryForm.value.endTime,
            queryForm.value.operateName);

        logRecordList.value = result.records;
        // console.log(JSON.stringify(result));

        queryForm.value.pageNum = result.current;
        queryForm.value.pageSize = result.size;
        queryForm.value.total = result.total;
    }

    const clear = () => {
        queryForm.value = {
            operateName: '',
            date: [],
            startTime: '',
            endTime: '',
            pageNum: 1,
            pageSize: 20,
        }
        search()
    }

    // 侦听
    watch(queryForm, (newVal, oldVal) => {
        if (newVal.date.length != 0) {
            queryForm.value.startTime = newVal.date[0]
            queryForm.value.endTime = newVal.date[1]
        } else {
            queryForm.value.startTime = ''
            queryForm.value.endTime = ''
        }

        queryForm.value.pageSize = newVal.pageSize
        queryForm.value.pageNum = newVal.pageNum
        queryForm.value.operateName = newVal.operateName
    }, {deep: true})

    // 分页
    const background = ref(true)

    const handleSizeChange = (val) => {
        search();
    }
    const handleCurrentChange = (val) => {
        search();
    }

    // 导出操作
    const exportExcel = async () => {
        try {
            const blob = await exportExcelApi();

            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `日志记录_${new Date().getTime()}.xlsx`
            a.click()
            URL.revokeObjectURL(url)

            ElMessage?.success('导出成功')
        } catch (err) {
            ElMessage?.error('导出失败')
            console.error('导出异常：', err)
        }
    }

    const multipleSelection = ref([])

    const handleSelectionChange = (val) => {
        multipleSelection.value = val
    }

    // 批量删除
    const batchDelete = async () => {
        if (multipleSelection.value.length == 0) {
            ElMessage?.success('请选择要删除的数据!')
        } else {
            ElMessageBox.confirm(
                '您确认要删除选中的数据吗?',
                '温馨提示',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(async () => {// 确认
                    let ids = multipleSelection.value.map(s => s.id);
                    console.log(ids);
                    const result = await deleteBatch(ids);
                    ElMessage.success({
                        type: 'success',
                        message: result.msg
                    })
                    search();
                })
                .catch(() => {
                })
        }
    }

</script>

<template>
    日志记录
    <div class="container">
        <el-button type="primary" @click="exportExcel" size="small">
            <el-icon>
                <Download/>
            </el-icon>
            导出
        </el-button>
        <el-button type="primary" @click="batchDelete" size="small">
            <el-icon>
                <Remove/>
            </el-icon>
            批量删除
        </el-button>
    </div>
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
        <el-table :data="logRecordList" border style="width: 100%"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"/>
            <el-table-column type="index" label="序号" width="60" align="center"/>
            <el-table-column prop="method" label="请求方式" width="100" align="center"/>
            <el-table-column prop="operateName" label="操作名称" align="center"/>
            <el-table-column prop="path" label="请求路径" align="center"/>
            <el-table-column prop="requestTime" label="请求时间" width="180" align="center"/>
            <el-table-column prop="responseTime" label="响应时间" width="180" align="center"/>
            <el-table-column prop="status" label="操作状态" width="100" align="center"/>
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

    .scrollbar-demo-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin: 10px;
        text-align: center;
        border-radius: 4px;
        background: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
    }
</style>