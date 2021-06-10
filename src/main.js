import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// 导入vuex
import store from './store/index'

// 导入toast文件下的index.js
import toast from './components/common/toast'
// 安装toast插件，安装的时候就会使用相应插件的install函数
Vue.use(toast)

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
