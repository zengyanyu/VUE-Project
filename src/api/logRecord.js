import request from "../utils/request";

// 查询全部部门数据
export const queryAllApi = () => {
    return request.get("/log-record/findAll");
}

// 批量删除
export const deleteBatch = (data) => {
    return request.post("/log-record/del/batch", data);
}

// 导出
export const exportExcelApi = () => {
    return request({
        url: '/log-record/exportExcel',
        method: 'post',
        responseType: 'blob'
    })
}

// 分页查询
export const queryPageApi = (pageNum, pageSize, startTime, endTime, operateName) => {
    return request.get(`/log-record/page?pageNum=${pageNum}&pageSize=${pageSize}&startTime=${startTime}&endTime=${endTime}&operateName=${operateName}`);
}