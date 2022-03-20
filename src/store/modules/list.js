import { getList, getTeachInfo } from '@/api/table'

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
  getTeachInfo() {
    return new Promise((resolve, reject) => {
      getTeachInfo().then((res) => {
        console.log(res)
        resolve(res)
      }).catch(() => {})
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

