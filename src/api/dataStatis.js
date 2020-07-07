import request from '@/utils/request'

// 查询产品线-图形统计数据
export function queryProductlineCountPic(data) {
  return request({
    url: `dataStatistics/queryProductlineCountPic`,
    method: 'post',
    data
  })
}

// 查询产品线-列表统计数据
export function queryProductlineCountForm(data) {
  return request({
    url: `dataStatistics/queryProductlineCountForm`,
    method: 'post',
    data
  })
}

// 查询员工接单-图形统计数据
export function queryOrderPic(data) {
  return request({
    url: `dataStatistics/queryOrderPic`,
    method: 'post',
    data
  })
}

// 查询员工接单-列表统计数据
export function queryOrderForm(data) {
  return request({
    url: `dataStatistics/queryOrderForm`,
    method: 'post',
    data
  })
}

// 查询用户上线-图形统计数据
export function queryOnlinePic(data) {
  return request({
    url: `dataStatistics/queryOnlinePic`,
    method: 'post',
    data
  })
}

// 查询用户上线-列表统计数据
export function queryOnlineForm(data) {
  return request({
    url: `dataStatistics/queryOnlineForm`,
    method: 'post',
    data
  })
}

// 查询故障与配件-列表统计数据
export function queryEmployeeOrderPic(data) {
  return request({
    url: `dataStatistics/queryEmployeeOrderPic`,
    method: 'post',
    data
  })
}
