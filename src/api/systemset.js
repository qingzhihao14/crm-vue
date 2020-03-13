import request from "@/utils/request"

export function getInfo() {
    return request({
      url: '/crm-systemset/role/getAll',
      method: 'get'
    })
  }

  export function deleteById(params) {
    return request({
      url: '/crm-systemset/role/delete',
      method: 'get',
      params
    })
  }

  export function update(data) {
    return request({
      url: '/crm-systemset/role/update',
      method: 'post',
      data
    })
  }

  export function save(data) {
    return request({
      url: '/crm-systemset/role/save',
      method: 'post',
      data
    })
  }