<script setup>
    import {ref} from 'vue';

    const emp = ref({
        name: '',
        gender: '',
        job: ''
    })

    const onSubmit = () => {
        console.log('submit!')
    }

    const tableData = [
        {
            id: '1',
            date: '2016-05-03',
            name: 'Tom',
            address: '深圳市龙华区',
        },
        {
            id: '2',
            date: '2016-05-02',
            name: 'Tom',
            address: '深圳市龙华区',
        },
        {
            id: '3',
            date: '2016-05-04',
            name: 'Tom',
            address: '深圳市龙华区',
        },
        {
            id: '4',
            date: '2016-05-01',
            name: 'Tom',
            address: '深圳市龙华区',
        },
        {
            id: '5',
            date: '2016-05-01',
            name: 'Tom',
            address: '深圳市龙华区',
        },
        {
            id: '6',
            date: '2016-05-01',
            name: 'Tom',
            address: '深圳市龙华区',
        },
        {
            id: '7',
            date: '2016-05-01',
            name: 'Tom',
            address: '深圳市龙华区',
        },
        {
            id: '8',
            date: '2016-05-01',
            name: 'Tom',
            address: '深圳市龙华区',
        },
    ]

</script>

<template>
    <div id="container">
        <el-form :inline="true" label-width="auto" :model="emp" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="emp.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" style="width: 240px">
                <el-select v-model="emp.gender" placeholder="请选择">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位" style="width: 240px">
                <el-select v-model="emp.job" placeholder="请选择">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                    <el-option label="女" value="3"></el-option>
                    <el-option label="女" value="4"></el-option>
                    <el-option label="女" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="100" align="center"/>
            <el-table-column prop="date" label="日期" width="180" align="center"/>
            <el-table-column prop="name" label="姓名" width="180" align="center"/>
            <el-table-column prop="address" label="地址" align="center"/>
        </el-table>
    </div>
</template>

<style scoped>

    #container {
        width: 80%;

    }
</style>