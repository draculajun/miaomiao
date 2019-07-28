import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personInfo:{
      personTablePageSize: '',
      personTableCurrentPage: '',
      personid: '',
    },
    sumTotal: 0
  },
  mutations: {
    add(state, n){
      state.sumTotal = state.sumTotal + parseInt(n);
    }
  },
  actions: {

  },
})
