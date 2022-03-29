import {
  handleGetStuInfo,
  handleGetFreeStuInfo,
  handleDeleteFreeInfo,
  handleDeleteStuInfo,
  handleExcelAllStu,
  handleExcelFreeStu,
  handleRejectStu
} from '@/api/student'

const state = {

}

const mutations = {}

const actions = {
  // 获得全体学生列表信息
  handleGetStuInfo({ commit }, params) {
    // const { current, size, userName, name, schoolClass, sex, grade, specialty, college, specialtyDirection } = params
    return new Promise((resolve, reject) => {
      handleGetStuInfo({ ...params }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  // 获得免测学生列表信息
  handleGetFreeStuInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleGetFreeStuInfo({ ...params }).then((res) => {
        resolve(res)
      }).catch(err => reject(err))
    })
  },
  // 删除免测列表学生信息其中一个
  handleDeleteFreeInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleDeleteFreeInfo({ ...params }).then((res) => {
        resolve(res)
      }).catch(err => reject(err))
    })
  },
  // 删除全体学生信息其中一个
  handleDeleteStuInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleDeleteStuInfo({ ...params }).then((res) => {
        resolve(res)
      }).catch(err => reject(err))
    })
  },
  // 导出全体学生列表信息
  handleExcelAllStu({ commit }) {
    return new Promise((resolve, reject) => {
      handleExcelAllStu().then(res => {
        resolve(res)
      }).catch(err => reject(err))
    })
  },
  // 导出免测学生列表
  handleExcelFreeStu({ commit }) {
    return new Promise((resolve, reject) => {
      handleExcelFreeStu().then((res) => {
        resolve(res)
      }).catch(err => reject(err))
    })
  },
  // 拒绝免测
  handleRejectStu({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleRejectStu({ ...params }).then((res) => {
        resolve(res)
      }).catch(err => reject(err))
    })
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state
}
