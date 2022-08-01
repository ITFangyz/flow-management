import request from '@/http/request'

// 发起流程实例
export function startProcess(query) {
  console.log("发起流程参数", query)
  return request({
    url: '/api/adapter-baseapp/admin/bpmProcRecord/startProcess',
    method: 'post',
    data: query
  })
}

// 我发起的流程记录
export function listOwnProcess(query) {
  return request({
    url: '/api/adapter-baseapp/admin/bpmProcRecord/myProcRecordList',
    method: 'post',
    data: query
  })
}

// 我可以发起的流程
export function listMyProcModelPage(query) {
  return request({
    url: '/api/adapter-baseapp/admin/bpmProcRecord/listMyProcModelPage',
    method: 'post',
    data: query
  })
}

// 获取流程的发起人
export function getStartUserId(query) {
  return request({
    url: '/api/adapter-baseapp/admin/bpmProcRecord/getStartUserId',
    method: 'get',
    params: query
  })
}

// 获取流程编号
export function getProcNo(query) {
  return request({
    url: '/api/adapter-baseapp/admin/bpmProcRecord/getProcNo',
    method: 'get',
    params: query
  })
}

// 获取流程详情信息（任务节点及处理人信息）
export function getFlowTaskInfoList(query) {
  return request({
    url: `/api/adapter-baseapp/admin/bpmProcRecord/getProcDetails`,
    method: 'post',
    data: query
  })
}




