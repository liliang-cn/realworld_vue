import { postRequest, getRequest } from '../actions'

const article = {
  namespaced: true,
  state: {
    articleInfo: {},
    feedInfo: {},
    currentArticle: {},

  },
  mutations: {
    save (state, payload) {
      Object.assign(state, payload)
    }
  },
  actions: {
    fetchGlobalArticle({ commit }, { limit, offset }) {
      getRequest("/api/articles", { limit, offset }).then(res => {
        if (!res.error) {
          commit("save", { articleInfo: {...res.data, limit, offset} })
        }
      })
    },
    fetchArticleDetail({ commit }, { slug }) {
      getRequest(`/api/articles/${slug}`).then(res => {
        if (!res.error) {
          commit("save", { currentArticle: res.data.article })
        }
      })
    },
  },
  getters: {
    articleInfo: state => state.articleInfo,
    currentArticle: state => state.currentArticle
  },
}

export default article