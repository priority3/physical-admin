import { login, logout, getInfo, updatePwd } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { ROLES_MAP } from '@/constants'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    headid: undefined
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_HEADID: (state, headid) => {
    state.headid = headid
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: userName.trim(), password: password })
        .then(response => {
          const { token } = response.data
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          const { name, identity, id } = data
          commit('SET_NAME', name)
          commit('SET_ROLES', [ROLES_MAP[identity]])
          commit('SET_HEADID', id)
          // commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // user 修改密码
  updatePwd({ commit }, params) {
    return new Promise((resolve, reject) => {
      updatePwd({ ...params })
        .then(res => {
          console.log(res)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
