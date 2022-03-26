// 学生列表
import request from '@/utils/request'

/**
 * 获取学生列表信息
 * @param {分页参数、可选的查询参数} params
 * @returns
 */
const handleGetStuInfo = (params) => {
  return request({
    url: '/student/studentList',
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
    url: '/student/deleteStudent',
    method: 'delete',
    params
  })
}

/**
 * 导出全体学生列表信息
 * @param {size,current} params
 * @returns
 */
const handleExcelAllStu = (params) => {
  return request({
    url: '/excel/downloadStudentList',
    method: 'get',
    params
  })
}

/**
 * 导出免测学生列表信息
 * @param {size,current} params
 * @returns
 */
const handleExcelFreeStu = (params) => {
  return request({
    url: '/excel/downloadFreeTestStudent',
    method: 'get',
    params
  })
}

export {
  handleGetStuInfo,
  handleGetFreeStuInfo,
  handleDeleteFreeInfo,
  handleDeleteStuInfo,
  handleExcelAllStu,
  handleExcelFreeStu
}
