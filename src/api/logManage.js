import request from '@/utils/request'

// 查询操作日志列表
export function querySysAopLogList(data) {
  return request({
    url: '/sysAopLog/querySysAopLogList',
    method: 'post',
    data
  })
}

// 删除日志信息
export function delSysAopLog(data) {
  return request({
    url: `/sysAopLog/delSysAopLog?ids=${data}`,
    method: 'post',
  })
}

// 查询意见反馈列表
export function queryYianOpinionFeedbackList(data) {
  return request({
    url: '/opinionFeedBack/queryYianOpinionFeedbackList',
    method: 'post',
    data
  })
}

// 根据id查询意见反馈详情
export function queryOpinionFeedById(data) {
  return request({
    url: '/opinionFeedBack/queryOpinionFeedById',
    method: 'post',
    data
  })
}

// 删除意见反馈
export function delOpinionFeedback(data) {
  return request({
    url: `/opinionFeedBack/delOpinionFeedback?ids=${data}`,
    method: 'post',
  })
}
