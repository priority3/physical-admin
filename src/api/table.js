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
/**
 * 删除某个预约信息
 * @param {删除参数的id} params
 * @returns
 */
function delListItem(params) {
  return request({
    url: '/reserve/deleteTestById',
    method: 'delete',
    params
  })
}

/**
 * 修改某个 体测信息
 * @param {修改信息的参数} data
 * @returns
 */
function fixedAppiontInfo(data) {
  return request({
    url: '/reserve/updateTest',
    method: 'put',
    data
  })
}

/**
 * 添加体测信息
 * @param {添加体测信息参数 body} data
 * @returns
 */
function addAppiontInfo(data) {
  return request({
    url: '/reserve/addTest',
    method: 'post',
    data
  })
}

export {
  getList,
  getDetail,
  getTeachInfo,
  delListItem,
  fixedAppiontInfo,
  addAppiontInfo
}
