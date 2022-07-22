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