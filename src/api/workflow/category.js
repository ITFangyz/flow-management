import request from '@/http/request'

// 查询流程分类列表
export function listCategory(params) {
  console.log("查询流程分类列表", params)
  return request({
    url: '/api/adapter-baseapp/admin/bpmProcType/getBpmProcTypePage',
    method: 'post',
    data: params
  })
}

// 查询流程分类详细
export function getCategory(categoryId) {
  console.log("查询流程分类详细", categoryId)
  return request({
    url: '/api/adapter-baseapp/admin/bpmProcType/details/' + categoryId,
    method: 'get'
  })
}

// 新增流程分类
export function addCategory(params) {
  console.log("新增流程分类", params)
  return request({
    url: '/api/adapter-baseapp/admin/bpmProcType/add',
    method: 'post',
    data: params
  })
}

// 修改流程分类
export function updateCategory(params) {
  console.log("修改流程分类", params)
  return request({
    url: '/api/adapter-baseapp/admin/bpmProcType/update',
    method: 'post',
    data: params
  })
}

// 删除流程分类
export function delCategory(categoryId) {
  return request({
    url: '/api/adapter-baseapp/admin/bpmProcType/delete/' + categoryId,
    method: 'get'
  })
}
