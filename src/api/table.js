import request from '@/utils/request'

/**
 *
 * @param {current,size} params
 * @returns 获取预约信息列表数据
 */
function getList(params) {
  return request({
    url: '/reserve/testList',
    method: 'get',
    params
  })
}
/**
 *
 * @returns 获取老师信息列表数据
 */
function getTeachInfo() {
  return ({
    url: '/teacher/list',
    method: 'get'
  })
}

function getDetail(params) {
  return request({
    url: '',
    method: 'get',
    params
  })
}

export {
  getList,
  getDetail,
  getTeachInfo
}
