import { getList, getTeachInfo, delListItem, fixedAppiontInfo } from '@/api/table'

const state = {
  // 列表数据
  tableList: []
}

const mutations = {
  // 用于查看详细数据
  SET_LIST(state, newlist) {
    state.tableList = newlist
  }
}
const actions = {
  // 获取已有的体测列表
  getList({ commit }, params) {
    const { current, size } = params
    return new Promise((resolve, reject) => {
      getList({ current, size }).then((res) => {
        commit('SET_LIST', res.records)
        resolve(res)
      }).catch((err) => reject(err))
    })
  },
  // 获取老师信息列表
  getTeachInfo() {
    return new Promise((resolve, reject) => {
      getTeachInfo().then((res) => {
        resolve(res.data)
      }).catch(() => {})
    })
  },
  // 删除体测信息
  delListItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      delListItem(params).then((res) => {
        resolve(res)
      }).catch((err) => reject(err))
    })
  },
  // 修改体测信息
  fixedAppiontInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      fixedAppiontInfo({ ...params }).then((res) => {
        resolve(res)
      }).catch((err) => reject(err))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

