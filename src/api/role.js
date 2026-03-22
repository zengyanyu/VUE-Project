import request from "../utils/request";

// 分页查询
export const queryPageApi = (pageNum, pageSize, roleCode, roleName) => {
    return request.get(`/role/page?pageNum=${pageNum}&pageSize=${pageSize}&roleCode=${roleCode}&roleName=${roleName}`);
}

// 新增/修改
export const addApi = (dept) => {
    return request.post("/role/save", dept);
}

// 根据主键ID查询
export const queryByIdApi = (id) => {
    return request.get(`/role/get/${id}`);
}

// 删除
export const deleteByIdApi = (id) => {
    return request.get(`/role/del/${id}`);
}