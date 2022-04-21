import request from '@/utils/request'

/**
 * 将权限修改为班长（有预约权限）
 * @param {*} param0
 * @returns
 */
const handleToMonitor = ({ id }) => {
  return request({
    url: '/student/monitor',
    method: 'PUT',
    params: {
      userId: id
    }
  })
}

const handleToMonitBack = ({ id }) => {
  return request({
    url: '/student/monitor/back',
    method: 'PUT',
    params: {
      userId: id
    }
  })
}

export {
  handleToMonitor,
  handleToMonitBack
}
