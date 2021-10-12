import request from '@/utils/request'

export function login() {
  return request({
    url: '/adminapi/index/login',
    method: 'post',
    data
  })
}
