import request from "../utils/request";

// 查询全部部门数据
export const queryAllApi = () => {
    return request.get("/log-record/findAll");
}

// 分页查询
export const queryPageApi = (pageNum, pageSize, startTime, endTime, operateName) => {
    return request.get(`/log-record/page?pageNum=${pageNum}&pageSize=${pageSize}&startTime=${startTime}&endTime=${endTime}&operateName=${operateName}`);
}