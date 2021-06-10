import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

// 安装插件
Vue.use(Vuex)
// 创建对象
const store = new Vuex.Store({
    state: state,
    getters:getters,
    mutations: mutations,
    actions: actions
})

export default store