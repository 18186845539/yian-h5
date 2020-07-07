import request from '@/utils/request'


// 查询专项记录
export function queryZhuanXiangData(data) {
  return request({
    url: `/oldCrmData/queryZhuanXiangData`,
    method: 'post',
    data
  })
}

// 查询培训记录
export function queryPeiXunData(data) {
  return request({
    url: `/oldCrmData/queryPeiXunData`,
    method: 'post',
    data
  })
}

// 查询回访记录
export function queryHuiFangData(data) {
  return request({
    url: `/oldCrmData/queryHuiFangData`,
    method: 'post',
    data
  })
}

// 查询维修记录
export function queryWeiXiuData(data) {
  return request({
    url: `/oldCrmData/queryWeiXiuData`,
    method: 'post',
    data
  })
}


// 查询  专项数据
export function querySpecial(data) {
  return request({
    url: `/oldCrmData/queryNewZhuanXiangData`,
    method: 'post',
    data
  })
}

// 查询  培训数据
export function queryTrain(data) {
  return request({
    url: `/oldCrmData/queryNewPeiXunData`,
    method: 'post',
    data
  })
}

// 查询  回访数据
export function queryReturnvisit(data) {
  return request({
    url: `/oldCrmData/queryNewHuiFangData`,
    method: 'post',
    data
  })
}

// 查询  维修数据
export function queryRepair(data) {
  return request({
    url: `/oldCrmData/queryNewWeiXiuData`,
    method: 'post',
    data
  })
}

// 查询  产品档案数据
export function queryProductArchives(data) {
  return request({
    url: `/oldCrmData/queryArchivesByCustomerID`,
    method: 'post',
    data
  })
}


// 产品详情 产品档案   ProductArchives
export function ProductArchivesInfo(data) {
  return request({
    url: `/oldCrmData/queryArchivesInfoByAssignId`,
    method: 'post',
    data
  })
}

// 产品详情 维修   ProductArchives
export function RepairInfo(data) {
  return request({
    url: `/oldCrmData/queryWeiXiuInfoByAssignId`,
    method: 'post',
    data
  })
}

// 产品详情 回访  
export function Returnvisilist(data) {
  return request({
    url: `/oldCrmData/queryHuiFangInfoByAssignId`,
    method: 'post',
    data
  })
}

// 产品详情 培训 
export function PeiXunInfoByAssignId(data) {
  return request({
  url: `/oldCrmData/queryPeiXunInfoByAssignId`,
  method: 'post',
  data
  })
  }











