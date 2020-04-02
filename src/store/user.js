import { postRequest, getRequest } from "../actions";

import router from "../router";

const user = {
  namespaced: true,
  state: {
    user: {}, // 登录用户
    error: false,
    errors: {},
    loggedIn: false,
    loading: false,
    profile: {}, // 浏览用户
    userArticleInfo: {}
  },
  mutations: {
    save(state, payload) {
      Object.assign(state, payload);
    }
  },
  actions: {
    register({ commit }, { user }) {
      commit("save", { loading: true });
      postRequest("/api/users", { user }).then(res => {
        if (res.error) {
          commit("save", {
            user: {},
            error: true,
            errors: res.data.errors,
            loading: false
          });
        } else {
          commit("save", {
            user: res.data.user,
            error: false,
            errors: {},
            loading: false
          });
          localStorage.setItem("real_world_token", res.data.user.token);
          router.push("/login");
        }
      });
    },
    login({ commit }, { user }) {
      commit("save", { loading: true });
      postRequest("/api/users/login", { user }).then(res => {
        if (res.error) {
          commit("save", {
            user: {},
            error: true,
            errors: res.data.errors,
            loading: false
          });
        } else {
          commit("save", {
            user: res.data.user,
            error: false,
            errors: {},
            loading: false,
            loggedIn: true
          });
          localStorage.setItem("real_world_token", res.data.user.token);
          router.push("/");
        }
      });
    },
    fetchUserInfo({ commit }) {
      getRequest("/api/user").then(res => {
        if (res.error) {
          commit("save", {
            user: {},
            error: true,
            errors: res.data.errors,
            loading: false
          });
        } else {
          commit("save", {
            user: res.data.user,
            error: false,
            errors: {},
            loading: false,
            loggedIn: true
          });
          localStorage.setItem("real_world_token", res.data.user.token);
        }
      });
    },
    checkLoggedInStatus({ commit, dispatch }) {
      const token = localStorage.getItem("real_world_token");

      if (token) {
        dispatch("fetchUserInfo");
      }
    },
    fetchProfile({ commit }, { username, queryType = "author" }) {
      commit("save", { loading: true });
      const profilePromise = getRequest(`/api/profiles/${username}`).then(
        res => {
          commit("save", {
            profile: res.data.profile
          });
        }
      );
      const userArticles = getRequest("/api/articles", {
        [queryType]: username,
        limit: 5,
        offset: 0
      }).then(res => {
        commit("save", {
          userArticleInfo: res.data
        });
      });

      Promise.all([profilePromise, userArticles]).then(() => {
        commit("save", {
          loading: false
        });
      });
    }
  },
  getters: {
    getUser: state => state,
    getProfile: state => state.profile,
    getUserArticlesInfo: state => state.userArticleInfo
  }
};

export default user;
