import request from "../utils/request";

// 分页查询
export const queryPageApi = (pageNum, pageSize, code, name) => {
    return request.get(`/dict/page?pageNum=${pageNum}&pageSize=${pageSize}&code=${code}&name=${name}`);
}

// 新增/修改
export const addApi = (dict) => {
    return request.post("/dict/save", dict);
}

// 根据主键ID查询
export const queryByIdApi = (id) => {
    return request.get(`/dict/get/${id}`);
}

// 删除
export const deleteByIdApi = (id) => {
    return request.get(`/dict/del/${id}`);
}