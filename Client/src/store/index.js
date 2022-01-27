import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    id: null,
    username: null
  },
  mutations: {
    setToken(state, t) {
      state.token = t
    },
    setId(state, id) {
      state.id = id
    },
    setUsername(state, username) {
      state.username = username
    }
  },
  getters: {
    token: state => {
      return state.token
    },
    loggedId: state => {
      return state.id
    },
    username: state => {
      return state.username
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
