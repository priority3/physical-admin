import {
  getList,
  getTeachInfo,
  delListItem,
  fixedAppiontInfo,
  addAppiontInfo,
  getStudentListByInfo,
  handleDelUsedInfo,
  handleGetSemester,
  exportListStuInfo,
  handleFixedTeacherInfo,
  handleAddTeacher,
  exampleExcelTeacher,
  handlePostExcelTeacher,
  handleAddSemester,
  handleDelSemester
} from '@/api/table'

const state = {
  // 列表数据
  tableList: [],
  detailName: '',
  detailId: ''
}

const mutations = {
  // 用于查看详细数据
  SET_LIST(state, newlist) {
    state.tableList = newlist
  },
  SET_PARAMS_INFO(state, { name, id }) {
    state.detailName = name
    state.detailId = id
  }

}
const actions = {
  // 获取已有的体测列表
  getList({ commit }, params) {
    return new Promise((resolve, reject) => {
      getList({ ...params }).then((res) => {
        commit('SET_LIST', res.records)
        resolve(res)
      }).catch((err) => reject(err))
    })
  },
  // 获取老师信息列表
  getTeachInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      getTeachInfo({ ...params }).then((res) => {
        resolve(res)
      }).catch(() => {})
    })
  },
  // 修改老师信息
  handleFixedTeacherInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleFixedTeacherInfo({ ...params }).then((res) => {
        resolve(res)
      }).catch((err) => reject(err))
    })
  },
  // 删除体测信息
  delListItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      delListItem({ ...params }).then((res) => {
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
  },
  // 添加体测信息
  addAppiontInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      addAppiontInfo({ ...params }).then((res) => {
        resolve(res)
      }).catch((err) => reject(err))
    })
  },
  // 根据体测id获取学生列表
  getStudentListByInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      getStudentListByInfo({ ...params }).then((res) => {
        resolve(res)
      }).catch((err) => reject(err))
    })
  },

  // 删除已预约的学生
  handleDelUsedInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleDelUsedInfo({ ...params }).then((res) => {
        resolve(res)
      }).catch(err => reject(err))
    })
  },

  // 获取学期
  handleGetSemester({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleGetSemester().then((res) => {
        resolve(res)
      }).catch(err => reject(err))
    })
  },

  // 根据体测id导出预约的学生列表
  exportListStuInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportListStuInfo({ ...params }).then((res) => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },

  // 添加老师
  handleAddTeacher({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleAddTeacher({ ...params }).then((res) => {
        resolve(res)
      }).catch(err => reject(err))
    })
  },

  // 导出老师模板案列
  exampleExcelTeacher({ commit }) {
    return new Promise((resolve, reject) => {
      exampleExcelTeacher().then((res) => {
        resolve(res)
      }).catch(err => reject(err))
    })
  },
  // 导入老师信息
  handlePostExcelTeacher({ commit }, params) {
    return new Promise((resolve, reject) => {
      handlePostExcelTeacher(params).then((res) => {
        resolve(res)
      }).catch(err => reject(err))
    })
  },
  // 添加学期
  handleAddSemester({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleAddSemester({ ...params }).then((res) => {
        resolve(res)
      }).catch(err => reject(err))
    })
  },
  // 删除学期
  handleDelSemester({ commit }, params) {
    return new Promise((resolve, reject) => {
      handleDelSemester({ ...params }).then((res) => {
        resolve(res)
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

