import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/loginAdmin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/userInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
/**
 * 管理员修改密码
 * @param {prePassword,newPassword} params
 * @returns
 */
export function updatePwd(data) {
  return request({
    url: '/user/updatePwd',
    method: 'put',
    data
  })
}
