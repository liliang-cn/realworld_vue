import { getRequest } from '../actions'

const tag = {
  namespaced: true,
  state: {
    tags: [],
  },
  mutations: {
    save (state, payload) {
      Object.assign(state, payload)
    }
  },
  actions: {
    fetchTags({ commit }) {
      getRequest("/api/tags").then(res => {
        commit("save", { tags: res.data.tags })
      })
    }
  },
  modules: {

  },
  getters: {
    getTags: state => {
      return state.tags
    },
  },
}

export default tag