import request from '@/http/request'

// 查询流程分类列表
export function listProcess(query) {
    console.log("查询流程分页参数", query)
    return request({
        url: '/bpmProcDef/getBpmProcDefPage',
        method: 'post',
        data: query
    })
}

// 新增流程定义
export function processAdd(query) {
    console.log("新增流程参数", query)
    return request({
        url: '/bpmProcDef/add',
        method: 'post',
        data: query
    })
}

// 删除流程定义
export function processDel(id) {
    console.log("删除参数", id)
    return request({
        url: '/bpmProcDef/delete/' + id,
        method: 'get',
        params: id
    })
}

// 流程定义详情
export function processDetail(id) {
    console.log("查询详情参数", id)
    return request({
        url: `/bpmProcDef/details/` + id,
        method: 'get',
        params: id
    })
}

// 读取流程xml
export function readProcessXml(id) {
    console.log("查询详情参数", id)
    return request({
        url: `/bpmProcDef/readProcDefXml/` + id,
        method: 'get',
        params: id
    })
}

// 读取流程进度图片
export function readProcessImg(id) {
    console.log("读取流程进度图片参数", id)
    return request({
        url: `/bpmProcDef/readProcImage/` + id,
        method: 'get',
        params: id
    })
}

// 修改流程定义
export function processUpdate(query) {
    console.log("修改流程定义", query)
    return request({
        url: '/bpmProcDef/update',
        method: 'post',
        data: query
    })
}

// 修改流程状态
export function updateProcessStatus(query) {
    console.log("修改流程状态", query)
    return request({
        url: '/bpmProcDef/updateProcStatus',
        method: 'post',
        data: query
    })
}