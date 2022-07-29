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

// 任务节点及处理人信息
export function getFlowTaskInfoList(query) {
  return request({
    url: `/api/adapter-baseapp/admin/bpmProecRcord/getFlowTaskInfoList/` + query,
    method: 'post',
    data: query
  })
}


// // 我待办的流程
// export function listTodoProcess(query) {
//   return request({
//     url: '/workflow/process/todoList',
//     method: 'get',
//     params: query
//   })
// }

// // 我待签的流程
// export function listClaimProcess(query) {
//   return request({
//     url: '/workflow/process/claimList',
//     method: 'get',
//     params: query
//   })
// }

// // 我已办的流程
// export function listFinishedProcess(query) {
//   return request({
//     url: '/workflow/process/finishedList',
//     method: 'get',
//     params: query
//   })
// }

// // 查询流程抄送列表
// export function listCopyProcess(query) {
//   return request({
//     url: '/workflow/process/copyList',
//     method: 'get',
//     params: query
//   })
// }

// // 完成任务
// export function complete(data) {
//   return request({
//     url: '/workflow/task/complete',
//     method: 'post',
//     data: data
//   })
// }

// // 取消申请
// export function stopProcess(data) {
//   return request({
//     url: '/workflow/task/stopProcess',
//     method: 'post',
//     data: data
//   })
// }

// // 驳回任务
// export function rejectTask(data) {
//   return request({
//     url: '/workflow/task/reject',
//     method: 'post',
//     data: data
//   })
// }

// // 可退回任务列表
// export function returnList(data) {
//   return request({
//     url: '/workflow/task/returnList',
//     method: 'post',
//     data: data
//   })
// }

// // 部署流程实例
// export function deployStart(deployId) {
//   return request({
//     url: '/workflow/process/startFlow/' + deployId,
//     method: 'get',
//   })
// }

// // 删除流程实例
// export function delProcess(id) {
//   return request({
//     url: '/workflow/instance/delete/?instanceId=' + id,
//     method: 'delete'
//   })
// }


