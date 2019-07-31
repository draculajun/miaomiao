import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import person from './person/person_store'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({})],
  modules: {
    person
  },
})