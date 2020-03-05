import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: []
  },
  mutations: {
    save (state, payload) {
      Object.assign(state, payload)
    }
  },
  actions: {
    fetchTags({ commit }) {
      fetch("https://conduit.productionready.io/api/tags")
        .then((response) => {
          return response.json()
        })
        .then(data => {
          commit("save", { tags: data.tags })
        })
    }
  },
  modules: {
  },
  getters: {
    tags: state => {
      return state.tags
    },
  },
})
