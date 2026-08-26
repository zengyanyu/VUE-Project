import request from "../utils/request";

// 分页查询
export const queryPageApi = (pageNum, pageSize, operationName) => {
    return request.get(`/permission-record/page?pageNum=${pageNum}&pageSize=${pageSize}&operationName=${operationName}`);
}