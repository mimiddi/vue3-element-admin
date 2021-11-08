import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/vue3-element-admin/login',
    method: 'post',
    data
  })
}
