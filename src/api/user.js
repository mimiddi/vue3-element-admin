import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/vue3-element-admin/user/login',
    method: 'post',
    data
  })
}

export const getUserInfo = () => {
  return request({
    url: '/vue3-element-admin/user/info',
    method: 'get'
  })
}

export const logout = () => {
  return request({
    url: '/vue3-element-admin/user/logout',
    method: 'get'
  })
}
