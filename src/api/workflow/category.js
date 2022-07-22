import request from '@/http/request'

// 查询流程分类列表
export function listCategory(data) {
  console.log("查询流程分类列表", data)
  return request({
    url: '/bpmProcType/getBpmProcTypePage',
    method: 'post',
    data: data
  })
}

// 查询流程分类详细
export function getCategory(categoryId) {
  console.log("查询流程分类详细", categoryId)
  return request({
    url: '/bpmProcType/details/' + categoryId,
    method: 'get'
  })
}

// 新增流程分类
export function addCategory(data) {
  console.log("新增流程分类", data)
  return request({
    url: '/bpmProcType/add',
    method: 'post',
    data: data
  })
}

// 修改流程分类
export function updateCategory(data) {
  console.log("修改流程分类", data)
  return request({
    url: '/bpmProcType/update',
    method: 'post',
    data: data
  })
}

// 删除流程分类
export function delCategory(categoryId) {
  return request({
    url: '/bpmProcType/delete/' + categoryId,
    method: 'get'
  })
}
