import request from "../utils/request";

// 分页查询
export const queryPageApi = (pageNum, pageSize, deptName) => {
    return request.get(`/department/page?pageNum=${pageNum}&pageSize=${pageSize}&deptName=${deptName}`);
}

// 查询全部部门数据
export const queryAllApi = () => {
    return request.get("/department/findAll");
}

// 新增/修改
export const addApi = (dept) => {
    return request.post("/department/save", dept);
}

// 根据主键ID查询
export const queryByIdApi = (id) => {
    return request.get(`/department/get/${id}`);
}

// 删除
export const deleteByIdApi = (id) => {
    return request.get(`/department/del/${id}`);
}