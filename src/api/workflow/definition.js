import request from '@/http/request'

// 查询流程定义列表
export function listDefinition(query) {
  return request({
    url: '/api/adapter-baseapp/admin/workflow/definition/list',
    method: 'get',
    params: query
  })
}

// 查询指定流程发布的版本列表
export function publishList(query) {
  return request({
    url: '/api/adapter-baseapp/admin/workflow/definition/publishList',
    method: 'get',
    params: query
  })
}


// 部署流程实例
export function definitionStart(procDefId,params) {
  return request({
    url: '/api/adapter-baseapp/admin/workflow/definition/start/' + procDefId,
    method: 'post',
    data: params
  })
}

// 获取流程变量
export function getProcessVariables(taskId) {
  return request({
    url: '/api/adapter-baseapp/admin/workflow/task/processVariables/' + taskId,
    method: 'get'
  })
}

// 激活/挂起流程
export function updateState(query) {
  return request({
    url: '/api/adapter-baseapp/admin/workflow/definition/updateState',
    method: 'put',
    params: query
  })
}

// 读取xml文件
export function readXml(definitionId) {
  return request({
    url: '/api/adapter-baseapp/admin/workflow/definition/readXml/' + definitionId,
    method: 'get'
  })
}
// 读取image文件
export function readImage(id) {
  return request({
    url: '/api/adapter-baseapp/admin/bpmProcDef/readProcImage/' + id,
    method: 'get'
  })
}

// 读取image文件
export function getFlowViewer(procInsId) {
  return request({
    url: '/api/adapter-baseapp/admin/workflow/task/flowViewer/' + procInsId,
    method: 'get'
  })
}

// 读取xml文件
export function saveXml(params) {
  console.log("保存xml文件参数", params)
  return request({
    url: '/api/adapter-baseapp/admin/bpmProcDef/add',
    method: 'post',
    data: params
  })
}

// 删除流程定义
export function delDeployment(query) {
  return request({
    url: '/api/adapter-baseapp/admin/workflow/definition/delete/',
    method: 'delete',
    params: query
  })
}

// 导出流程定义
export function exportDeployment(query) {
  return request({
    url: '/api/adapter-baseapp/admin/system/deployment/export',
    method: 'get',
    params: query
  })
}
