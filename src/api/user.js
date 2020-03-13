import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/crm-auth/auth/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/crm-auth/auth/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/crm-auth/auth/loginOut',
    method: 'get'
  })
}
