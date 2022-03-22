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
  return request({
    url: '/teacher/list',
    method: 'get',
    params: {
      current: 1,
      size: 10
    }
  })
}

function getDetail(params) {
  return request({
    url: '',
    method: 'get',
    params
  })
}

function delListItem(params) {
  return request({
    url: '/reserve/deleteTestById',
    method: 'delete',
    params
  })
}

// 修改体测信息
function fixedAppiontInfo(data) {
  return request({
    url: '/reserve/updateTest',
    method: 'put',
    data
  })
}

export {
  getList,
  getDetail,
  getTeachInfo,
  delListItem,
  fixedAppiontInfo
}
