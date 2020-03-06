import { postRequest } from '../actions'

import router from '../router'

const user = {
  namespaced: true,
  state: {
    user: {},
    error: false,
    errors: {},
    loggedIn: false,
    loading: false
  },
  mutations: {
    save (state, payload) {
      Object.assign(state, payload)
    }
  },
  actions: {
    register({ commit }, payload) {
      commit("save", { loading: true })
      postRequest("/api/users", {user: payload}).then(res => {
        if (res.error) {
          commit("save", { user: {}, error: true, errors: res.data.errors, loading: false })
        } else {
          commit("save", { user: res.data.user, error: false, errors: {}, loading: false })
          sessionStorage.setItem("real_world_token", res.data.user.token)
          router.push("/login")
        }
      })
    },
    login({ commit }, payload) {
      commit("save", { loading: true })
      postRequest("/api/users/login", {user: payload}).then(res => {
        if (res.error) {
          commit("save", { user: {}, error: true, errors: res.data.errors, loading: false })
        } else {
          commit("save", { user: res.data.user, error: false, errors: {}, loading: false, loggedIn: true })
          sessionStorage.setItem("real_world_token", res.data.user.token)
          router.push("/")
        }
      })
    },
    checkLoggedInStatus({ commit }) {
      const token = sessionStorage.getItem("real_world_token");

      if (token) {
        commit("save", { loggedIn: true })
      }
    },
  },
  getters: {
    getUser: state => state,
  },
}

export default user