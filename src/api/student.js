// 学生列表
import request from '@/utils/request'

/**
 * 获取学生列表信息
 * @param {分页参数、可选的查询参数} params
 * @returns
 */
const handleGetStuInfo = (params) => {
  return request({
    url: '/student/list',
    method: 'GET',
    params
  })
}

/**
 * 获取免测学生的列表
 * @param {分页参数、可选的查询参数} params
 * @returns
 */
const handleGetFreeStuInfo = (params) => {
  return request({
    url: '/freeTest/list',
    method: 'GET',
    params
  })
}
/**
 * 删除免测学生
 * @param {免测学生id} params
 * @returns
 */
const handleDeleteFreeInfo = (params) => {
  return request({
    url: '/freeTest/delete',
    method: 'delete',
    params
  })
}
/**
 * 删除全部学生
 * @param {学生id} params
 * @returns
 */
const handleDeleteStuInfo = (params) => {
  return request({
    url: '/student',
    method: 'delete',
    params
  })
}

/**
 * 导出全体学生列表信息
 * @param {size,current} params
 * @returns
 */
const handleExcelAllStu = () => {
  return request({
    url: '/excel/downloadStudentList',
    method: 'get'
  })
}

/**
 * 导出免测学生列表信息
 * @param {size,current} params
 * @returns
 */
const handleExcelFreeStu = () => {
  return request({
    url: '/excel/downloadFreeTestStudent',
    method: 'get'
  })
}

/**
 *  拒绝该免测
 * @param {拒绝理由，id} params
 * @returns
 */
const handleRejectStu = (params) => {
  return request({
    url: '/freeTest/rejectApplication',
    method: 'post',
    data: params
  })
}

/**
 * 接受预约
 * @param {} params
 * @returns
 */
const handleApproveFree = (params) => {
  return request({
    url: '/freeTest/agreeApplication',
    method: 'put',
    data: params
  })
}

const handleFixedStuInfo = (params) => {
  return request({
    url: '/student',
    method: 'put',
    data: params
  })
}

export {
  handleGetStuInfo,
  handleGetFreeStuInfo,
  handleDeleteFreeInfo,
  handleDeleteStuInfo,
  handleExcelAllStu,
  handleExcelFreeStu,
  handleRejectStu,
  handleApproveFree,
  handleFixedStuInfo
}
