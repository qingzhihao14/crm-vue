import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/crm-vue/table/list',
    method: 'get',
    params
  })
}
