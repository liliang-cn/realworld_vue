import { postRequest, getRequest, deleteRequest } from "../actions";

const article = {
  namespaced: true,
  state: {
    articleInfo: {},
    feedInfo: {},
    currentArticle: {},
    loading: false
  },
  mutations: {
    save(state, payload) {
      Object.assign(state, payload);
    }
  },
  actions: {
    fetchGlobalArticle({ commit }, { limit, offset }) {
      getRequest("/api/articles", { limit, offset }).then(res => {
        if (!res.error) {
          commit("save", {
            articleInfo: { ...res.data, limit, offset }
          });
        }
      });
    },
    fetchArticleDetail({ commit, rootState: { article } }, { slug }) {
      commit("save", { loading: true });
      const articlePromise = getRequest(`/api/articles/${slug}`).then(res => {
        if (!res.error) {
          commit("save", { currentArticle: res.data.article });
        }
      });
      const commentPromise = getRequest(`/api/articles/${slug}/comments`).then(
        res => {
          commit("save", {
            currentArticle: {
              ...article.currentArticle,
              comments: res.data.comments
            },
            loading: false
          });
        }
      );

      Promise.all([articlePromise, commentPromise]).then(() => {
        commit("save", {
          loading: false
        });
      });
    },
    submitComment({ commit, rootState: { article } }, { comment }) {
      const {
        currentArticle: { slug }
      } = article;
      postRequest(`/api/articles/${slug}/comments`, {
        comment: {
          body: comment
        }
      }).then(res => {
        commit("save", {
          currentArticle: {
            ...article.currentArticle,
            comments: [res.data.comment, ...article.currentArticle.comments]
          }
        });
      });
    },
    deleteComment({ commit, rootState: { article } }, { id }) {
      const {
        currentArticle: { slug }
      } = article;
      deleteRequest(`/api/articles/${slug}/comments/${id}`).then(res => {
        commit("save", {
          currentArticle: {
            ...article.currentArticle,
            comments: article.currentArticle.comments.filter(
              item => item.id !== id
            )
          }
        });
      });
    }
  },
  getters: {
    articleInfo: state => state.articleInfo,
    currentArticle: state => state.currentArticle,
    loading: state => state.loading
  }
};

export default article;
