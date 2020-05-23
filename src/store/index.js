import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

//vuex全局注册
Vue.use(Vuex)

const state={
  userInfo:{},
  dailyDaseDetails:{},
  patientCase:{},
}

export const store=new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
