import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:9528/mock/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:9528/mock/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://localhost:9528/mock/user/logout',
    method: 'post'
  })
}
