import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/adminapi/index/login',
    method: 'post',
    data
  })
}
