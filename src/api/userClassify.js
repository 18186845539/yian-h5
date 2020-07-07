import request from '@/utils/request'

// 查询医院/家庭客户表格数据
export function queryHospitalList(data) {
  return request({
    url: '/hospital/queryHospitalList',
    method: 'post',
    data
  })
}

// 注册医院/家庭客户
export function registerHospital(data) {
  return request({
    url: '/hospital/registerHospital',
    method: 'post',
    data
  })
}

// 查询修改医院/家庭客户
export function queryHospital(data) {
  return request({
    url: `/hospital/queryHospitalInfoById`,
    method: 'post',
    data
  })
}

// 修改医院/家庭客户保存
export function updHospital(data) {
  return request({
    url: '/hospital/updHospitalInfoById',
    method: 'post',
    data
  })
}

// 删除医院/家庭客户信息
export function delHospitalInfo(data) {
  return request({
    url: `/hospital/delHospitalInfo?ids=${data}`,
    method: 'post',
  })
}

// 查询渠道用户表格数据
export function queryChannelList(data) {
  return request({
    url: `/channel/queryChannelList`,
    method: 'post',
    data
  })
}

// 注册渠道用户
export function registerChannel(data) {
  return request({
    url: '/channel/registerChannel',
    method: 'post',
    data
  })
}

// 查询修改渠道用户
export function queryChannel(data) {
  return request({
    url: `/channel/queryChannelInfoById`,
    method: 'post',
    data
  })
}

// 修改渠道用户保存
export function updChannel(data) {
  return request({
    url: '/channel/updChannelInfoById',
    method: 'post',
    data
  })
}

// 删除渠道用户信息
export function delChannelInfo(data) {
  return request({
    url: `/channel/delChannelInfo?ids=${data}`,
    method: 'post',
  })
}

// 查询员工列表表格数据
export function queryStaffList(data) {
  return request({
    url: '/staff/queryStaffList',
    method: 'post',
    data
  })
}

// 注册员工信息
export function addStaff(data) {
  return request({
    url: '/staff/addStaffInfo',
    method: 'post',
    data
  })
}

// 查询修改员工信息
export function queryStaff(data) {
  return request({
    url: `/staff/queryStaffInfoById`,
    method: 'post',
    data
  })
}

// 修改员工信息保存
export function updStaff(data) {
  return request({
    url: '/staff/updStaffInfoById',
    method: 'post',
    data
  })
}

// 重置员工密码
export function resetPassword(data) {
  return request({
    url: `/staff/resetPassword`,
    method: 'post',
    data
  })
}

// 删除员工信息
export function delStaffInfo(data) {
  return request({
    url: `/staff/delStaffInfo?ids=${data}`,
    method: 'post',
  })
}

// 验证用户是否存在(电话号码)
export function adminIsExist(data) {
  return request({
    url: `/admin/isExist`,
    method: 'post',
    data
  })
}
