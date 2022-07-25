import request from '@/http/request'

// 查询岗位信息列表
export function listJobs(query) {
    console.log()
    return request({
        url: '/api/adapter-user/admin/position/getPositionPage',
        method: 'post',
        data: query
    })
}

// 查询部门树
export function treeselect(query) {
    console.log("查询部门树参数", query)
    return request({
        url: '/api/adapter-user/admin/department/tree',
        method: 'post',
        data: query
    })
}

// 查询角色列表
export function listRoles(query) {
    console.log("查询角色列表参数", query)
    return request({
        url: '/api/adapter-user/admin/role/getRolePage',
        method: 'post',
        data: query
    })
}

// 查询用户信息列表
export function listUsers(query) {
    console.log()
    return request({
        url: '/api/adapter-user/admin/user/getUserPage',
        method: 'post',
        data: query
    })
}

// 查询用户信息列表
export function listDepts(query) {
    console.log()
    return request({
        url: '/api/adapter-user/admin/department/tree',
        method: 'post',
        data: query
    })
}

