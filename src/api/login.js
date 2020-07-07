import request from '@/utils/request'

// 根据token获得用户信息
export function getInfoByToken(data) {
  return request({
    url: `/admin/getInfoByToken?token=${data}`,
    method: 'post',
    headers: {
      'token': data
    }
  })
}
