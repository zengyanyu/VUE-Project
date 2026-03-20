import request from "../utils/request";

// 查询全部部门数据
export const queryAllApi = () => {
    return request.get("/department/findAll");
}

// 新增
export const addApi = (dept) => {
    return request.post("/department/save", dept);
}

// 修改
export const updateApi = (dept) => {
    return request.post("/department/save", dept);
}

// 根据主键ID查询
export const queryByIdApi = (id) => {
    return request.get(`/department/get/${id}`);
}

// 删除