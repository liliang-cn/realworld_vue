import { postRequest, getRequest } from '../actions'

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
    register({ commit }, { user }) {
      commit("save", { loading: true })
      postRequest("/api/users", { user }).then(res => {
        if (res.error) {
          commit("save", { user: {}, error: true, errors: res.data.errors, loading: false })
        } else {
          commit("save", { user: res.data.user, error: false, errors: {}, loading: false })
          sessionStorage.setItem("real_world_token", res.data.user.token)
          router.push("/login")
        }
      })
    },
    login({ commit }, { user }) {
      commit("save", { loading: true })
      postRequest("/api/users/login", { user }).then(res => {
        if (res.error) {
          commit("save", { user: {}, error: true, errors: res.data.errors, loading: false })
        } else {
          commit("save", { user: res.data.user, error: false, errors: {}, loading: false, loggedIn: true })
          sessionStorage.setItem("real_world_token", res.data.user.token)
          router.push("/")
        }
      })
    },
    fetchUserInfo({ commit }) {
      getRequest("/api/user").then(res => {
        if (res.error) {
          commit("save", { user: {}, error: true, errors: res.data.errors, loading: false })
        } else {
          commit("save", { user: res.data.user, error: false, errors: {}, loading: false, loggedIn: true })
          sessionStorage.setItem("real_world_token", res.data.user.token)
        }
      })
    },
    checkLoggedInStatus({ commit, dispatch }) {
      const token = sessionStorage.getItem("real_world_token");

      if (token) {
        dispatch("fetchUserInfo")
        commit("save", { loggedIn: true })
      }
    },
  },
  getters: {
    getUser: state => state,
  },
}

export default user