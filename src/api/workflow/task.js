import request from '@/http/request'

// 查看我的代办
export function listTodoProcess(query) {
  console.log("查看我的代办参数", query)
  return request({
    url: '/api/adapter-baseapp/admin/bpmTaskRecord/listMyTodoTaskPage',
    method: 'post',
    data: query
  })
}

// 查询流程实例详情信息
export function getDetailInstance(id) {
    return request({
        url: '/api/adapter-baseapp/admin/bpmTaskRecord/details/' + id,
        method: 'get',
        params: id
    })
}

// 完成任务
export function complete(params) {
    return request({
        url: '/api/adapter-baseapp/admin/bpmTaskRecord/completeTask',
        method: 'post',
        data: params
    })
}



// 转办任务
export function transfer(params) {
    return request({
        url: '/api/adapter-baseapp/admin/bpmTaskRecord/assignTask',
        method: 'post',
        data: params
    })
}
  
// 驳回任务
export function rejectTask(params) {
    return request({
        url: '/api/adapter-baseapp/admin/bpmTaskRecord/rejectTask',
        method: 'post',
        data: params
    })
}

// 我已办的流程
export function listFinishedProcess(query) {
  return request({
    url: '/api/adapter-baseapp/admin/bpmTaskRecord/listMyDoneTaskPage',
    method: 'post',
    data: query
  })
}

// 抄送给我的流程
export function listCopyProcess(query) {
  return request({
    url: '/api/adapter-baseapp/admin/bpmTaskRecord/listCsToMyTaskPage',
    method: 'post',
    data: query
  })
}