// 学生列表
import request from '@/utils/request'

/**
 * 获取学生列表信息
 * @param {分页参数、可选的查询参数} params
 * @returns
 */
const handleGetStuInfo = params => {
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
const handleGetFreeStuInfo = params => {
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
const handleDeleteFreeInfo = params => {
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
const handleDeleteStuInfo = params => {
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
    method: 'get',
    responseType: 'arraybuffer'
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
const handleRejectStu = params => {
  return request({
    url: '/freeTest/rejectApplication',
    method: 'put',
    data: params
  })
}

/**
 * 同意免测
 * @param {} params
 * @returns
 */
const handleApproveFree = params => {
  return request({
    url: '/freeTest/agreeApplication',
    method: 'put',
    data: params
  })
}

/**
 * 修改学生信息
 * @param {*} params
 * @returns
 */
const handleFixedStuInfo = params => {
  return request({
    url: '/student',
    method: 'put',
    data: params
  })
}

/**
 * 添加学生信息
 * @param {*} params
 * @returns
 */
const handleAddStuInfo = params => {
  return request({
    url: '/student',
    method: 'post',
    data: params
  })
}

/**
 * 学生示例下载
 * @param {*} params
 * @returns
 */
const exampleExcelStu = params => {
  return request({
    url: '/excel/downloadStudentTemplate',
    method: 'get',
    responseType: 'arraybuffer'
  })
}
/**
 * 导出学生列表信息
 * @param {*} params
 * @returns
 */
const handlePostExcelStu = params => {
  return request({
    url: '/excel/uploadStudentList',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 导出免测学生列表
 * @param {} params
 * @returns
 */
const handlePostExcelFreeStu = params => {
  return request({
    url: '/excel/downloadFreeTestStudent',
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
}

/**
 * 获取班长、有权限预约学生列表
 * @param {*} params
 * @returns
 */
const handleAuthStuInfo = params => {
  return request({
    url: '/student/monitor/list',
    method: 'get',
    params
  })
}
export {
  handleGetStuInfo,
  handleAuthStuInfo,
  handleGetFreeStuInfo,
  handleDeleteFreeInfo,
  handleDeleteStuInfo,
  handleExcelAllStu,
  handleExcelFreeStu,
  handleRejectStu,
  handleApproveFree,
  handleFixedStuInfo,
  handleAddStuInfo,
  exampleExcelStu,
  handlePostExcelStu,
  handlePostExcelFreeStu
}
