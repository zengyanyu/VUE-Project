import request from "../utils/request";

// 查询全部部门数据
export const queryAllApi = () => {
    return request.get("/log-record/findAll");
}