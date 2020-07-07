import request from '@/utils/request'

// 查询工单表格数据
export function queryApplyJobGroupList(data) {
  return request({
    url: '/applyJob/queryApplyJobGroupList',
    method: 'post',
    data
  })
}

// 验证序列号
export function isExist(data) {
  return request({
    url: '/applyJob/isExist',
    method: 'post',
    data
  })
}

// 验证序列号是否已报修
export function checkDeviceExisAdmin(data) {
  return request({
    url: '/applyJob/checkDeviceExisAdmin',
    method: 'post',
    data
  })
}

// 添加派工单
export function productRepairAdmin(data) {
  return request({
    url: '/applyJob/productRepairAdmin',
    method: 'post',
    data
  })
}

// 审核查询派工单信息
export function queryApplyJob(data) {
  return request({
    url: '/applyJob/queryApplyJob',
    method: 'post',
    data
  })
}

// 修改派工单信息（其中包括审核派单撤单结束）
export function updApplyJob(data) {
  return request({
    url: '/applyJob/updApplyJobInfo',
    method: 'post',
    data
  })
}

// 批量删除派工单
export function delApplyJobInfo(data) {
  return request({
    url: `/applyJob/delApplyJobInfo?ids=${data}`,
    method: 'post',
  })
}



// 查看服务评价
export function queryServiceEvaluate(data) {
  return request({
    url: '/serviceEvaluate/queryServiceEvaluate',
    method: 'post',
    data
  })
}

// 查看工单详情
export function queryReportByGroupId(data) {
  return request({
    url: `reportType/queryReportByGroupId?assignId=${data}`,
    method: 'post',

  })
}

// 导出PDF文件
export function download(data) {
  return request({
    url: `/upload/download`,
    method: 'post',
    data
  })
}

// 查询客户管理列表
export function queryAdminCustomerList(data) {
  return request({
    url: '/customerAdmin/queryAdminCustomerList',
    method: 'post',
    data
  })
}

// 添加客户信息
export function addCustomerInfoById(data) {
  return request({
    url: '/customerAdmin/addCustomerInfoById',
    method: 'post',
    data
  })
}

// 查询修改客户信息  
export function queryCustomernfoById(data) {
  return request({
    url: '/customerAdmin/queryCustomernfoById',
    method: 'post',
    data
  })
}

// 修改客户信息保存
export function updCustomerInfoById(data) {
  return request({
    url: '/customerAdmin/updCustomerInfoById',
    method: 'post',
    data
  })
}

// 批量删除客户管理信息
export function delCustomerInfo(data) {
  return request({
    url: `/customerAdmin/delCustomerInfo?ids=${data}`,
    method: 'post',
  })
}

// 查询产品信息列表
export function queryProductInfoList(data) {
  return request({
    url: '/productInfo/queryProductInfoList',
    method: 'post',
    data
  })
}

// 添加产品信息
export function addProductInfo(data) {
  return request({
    url: '/productInfo/addProductInfo',
    method: 'post',
    data
  })
}

// 查询修改产品信息  
export function queryProductInfoById(data) {
  return request({
    url: '/productInfo/queryProductInfoById',
    method: 'post',
    data
  })
}

// 验证产品代号是否存在
export function productInfoIsExist(data) {
  return request({
    url: '/productInfo/isExist',
    method: 'post',
    data
  })
}

// 修改产品信息保存
export function updProductInfoById(data) {
  return request({
    url: '/productInfo/updProductInfoById',
    method: 'post',
    data
  })
}

// 批量删除产品信息列表
export function delProductInfo(data) {
  return request({
    url: `/productInfo/delProductInfo?ids=${data}`,
    method: 'post',
  })
}

// 查询产品档案列表
export function queryArchivesListNew(data) {
  return request({
    url: '/productArchives/queryArchivesListNew',
    method: 'post',
    data
  })
}

// 添加产品档案
export function insertProductArchivesNew(data) {
  return request({
    url: '/productArchives/insertProductArchivesNew',
    method: 'post',
    data
  })
}

// 验证序列号是否存在
export function productArchivesExist(data) {
  return request({
    url: '/productArchives/isExist',
    method: 'post',
    data
  })
}

// 查询修改产品档案  
export function queryArchivesDetailNew(data) {
  return request({
    url: '/productArchives/queryArchivesDetailNew',
    method: 'post',
    data
  })
}

// 修改产品档案保存
export function updArchivesInfoNew(data) {
  return request({
    url: '/productArchives/updArchivesInfoNew',
    method: 'post',
    data
  })
}

// 批量删除产品档案列表
export function delArchivesInfo(data) {
  return request({
    url: `/productArchives/delArchivesInfo?ids=${data}`,
    method: 'post',
  })
}

// 查询产品历史列表
export function queryArchivesList(data) {
  return request({
    url: '/productArchives/queryArchivesList',
    method: 'post',
    data
  })
}

// 添加产品历史列表
export function insertProductArchives(data) {
  return request({
    url: '/productArchives/insertProductArchives',
    method: 'post',
    data
  })
}

// 查询修改产品历史
export function queryArchivesDetail(data) {
  return request({
    url: '/productArchives/queryArchivesDetail',
    method: 'post',
    data
  })
}

// 批量删除产品历史列表
export function deleteProductArchives(data) {
  return request({
    url: `/productArchives/deleteProductArchives?ids=${data}`,
    method: 'post',
  })
}

// 查询配件购买与咨询列表
export function queryRecordsList(data) {
  return request({
    url: '/customerService/queryRecordsList',
    method: 'post',
    data
  })
}

// 获取回复数据
export function replyById(data) {
  return request({
    url: '/customerService/replyById',
    method: 'post',
    data
  })
}

// 删除配件购买与咨询列表
export function deteteConsulting(data) {
  return request({
    url: `/customerService/deteteConsulting?ids=${data}`,
    method: 'post',
  })
}

// 消息发送
export function replyContent(data) {
  return request({
    url: `/customerService/replyContent`,
    method: 'post',
    data
  })
}

// 消息发送成功提醒
export function sendRemind(data) {
  return request({
    url: `/checkcenter/socket/push/${data}`,
    method: 'post'
  })
}

// 获取配件管理列表
export function queryPartsList(data) {
  return request({
    url: `/partsBuy/queryPartsList`,
    method: 'post',
    data
  })
}

// 添加配件信息
export function insertPartsBuy(data) {
  return request({
    url: `/partsBuy/insertPartsBuy`,
    method: 'post',
    data
  })
}

// 查询修改配件信息
export function queryBuyInfoById(data) {
  return request({
    url: `/partsBuy/queryBuyInfoById`,
    method: 'post',
    data
  })
}

// 修改配件信息保存
export function updatePartsBuyById(data) {
  return request({
    url: `/partsBuy/updatePartsBuyById`,
    method: 'post',
    data
  })
}

// 批量删除配件管理列表
export function deletePartdBuyById(data) {
  return request({
    url: `/partsBuy/deletePartdBuyById?ids=${data}`,
    method: 'post',
  })
}

// 查询维修技能指引列表
export function queryGuidanceList(data) {
  return request({
    url: `/repairSkillGuidance/queryGuidanceList`,
    method: 'post',
    data
  })
}

// 添加维修技术指引信息
export function insertGuidance(data) {
  return request({
    url: `/repairSkillGuidance/insertGuidance`,
    method: 'post',
    data
  })
}

// 查询修改维修技术指引信息
export function queryGuidanceInfoById(data) {
  return request({
    url: `/repairSkillGuidance/queryGuidanceInfoById`,
    method: 'post',
    data
  })
}

// 修改维修技术指引信息保存
export function updateGuidance(data) {
  return request({
    url: `/repairSkillGuidance/updateGuidance`,
    method: 'post',
    data
  })
}

// 批量删除维修技能指引列表
export function deleteGiudance(data) {
  return request({
    url: `/repairSkillGuidance/deleteGiudance?ids=${data}`,
    method: 'post',
  })
}

// 查询售后服务图片列表
export function queryAfterService(data) {
  return request({
    url: `/afterServicePic/queryAfterService`,
    method: 'post',
    data
  })
}

// 添加售后服务图片
export function addAfterService(data) {
  return request({
    url: `/afterServicePic/addAfterService`,
    method: 'post',
    data
  })
}

// 查询售后服务图片
export function queryAfterServiceInfoById(data) {
  return request({
    url: `/afterServicePic/queryAfterServiceInfoById`,
    method: 'post',
    data
  })
}

// 修改售后服务图片保存
export function updAfterServiceInfoById(data) {
  return request({
    url: `/afterServicePic/updAfterServiceInfoById`,
    method: 'post',
    data
  })
}

// 批量删除售后服务图片列表
export function delAfterServiceInfo(data) {
  return request({
    url: `/afterServicePic/delAfterServiceInfo?ids=${data}`,
    method: 'post',
  })
}


// 工单流程详情 -  工单信息 和 员工信息
export function Processdetailapi(data) {
  return request({
    url: `/applyJob/queryGroupAndStaffInfoByGroupId`,
    method: 'post',
    data
  })
}

// 工单流程详情    - 操作流程信息
export function Processdata(data) {
  return request({
    url: `/applyJob/queryGroupHistoryByGroupId`,
    method: 'post',
    data
  })
}
