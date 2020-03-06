import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import tag from './tag'
import user from "./user"
import article from './article'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createLogger({
    collapsed: false
  })],
  modules: {
    tag,
    user,
    article
  },
})
