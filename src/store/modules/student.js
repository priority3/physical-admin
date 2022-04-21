import {
  handleGetStuInfo,
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
  handlePostExcelFreeStu,
  handleAuthStuInfo,
} from '@/api/student'

const state = {}

const mutations = {}

const actions = {
  // 获得全体学生列表信息
  handleGetStuInfo({ commit }, params) {
    // const { current, size, userName, name, schoolClass, sex, grade, specialty, college, specialtyDirection } = params
    return new Promise((resolve, reject) => {
      handleGetStuInfo({ ...params })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 获得免测学生列表信息
  handleGetFreeStuInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleGetFreeStuInfo({ ...params })
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  // 删除免测列表学生信息其中一个
  handleDeleteFreeInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleDeleteFreeInfo({ ...params })
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  // 删除全体学生信息其中一个
  handleDeleteStuInfo({ commit }, params) {
    const { id } = params
    return new Promise((resolve, reject) => {
      handleDeleteStuInfo({ userId: id })
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  // 导出全体学生列表信息
  handleExcelAllStu({ commit }) {
    return new Promise((resolve, reject) => {
      handleExcelAllStu()
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  // 导出免测学生列表
  handleExcelFreeStu({ commit }) {
    return new Promise((resolve, reject) => {
      handleExcelFreeStu()
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  // 拒绝免测
  handleRejectStu({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleRejectStu({ ...params })
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  // 同意免测
  handleApproveFree({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleApproveFree({ ...params })
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  // 修改学生信息
  handleFixedStuInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleFixedStuInfo({ ...params })
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },

  // 添加学生
  handleAddStuInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleAddStuInfo({ ...params })
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  // 学生示例信息下载
  exampleExcelStu({ commit }, params) {
    return new Promise((resolve, reject) => {
      exampleExcelStu({ ...params }).then(res => {
        resolve(res)
      })
    })
  },
  // 学生信息导入
  handlePostExcelStu({ commit }, params) {
    return new Promise((resolve, reject) => {
      handlePostExcelStu(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  // 免测学生导出
  handlePostExcelFreeStu({ commit }, params) {
    return new Promise((resolve, reject) => {
      handlePostExcelFreeStu({ ...params })
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
  handleAuthStuInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleAuthStuInfo({ ...params })
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    })
  },
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
}
