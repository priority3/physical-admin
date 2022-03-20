import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import list from './modules/list'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    list,
    app,
    settings,
    user
  },
  getters
})

export default store
