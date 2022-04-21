import {
  handleToMonitor,
  handleToMonitBack
} from '@/api/auth'
const state = {}
const mutations = {}
const actions = {
  // 权限更改为预约权限
  handleToMonitor({ commit }, { id }) {
    return new Promise((resolve, reject) => {
      handleToMonitor({ id }).then((res) => {
        resolve(res.msg)
      }).catch(err => reject(err))
    })
  },
  // 权限更改为普通学生权限
  handleToMonitBack({ commit }, { id }) {
    return new Promise((resolve, reject) => {
      handleToMonitBack({ id }).then((res) => {
        resolve(res.msg)
      }).catch(err => reject(err))
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
