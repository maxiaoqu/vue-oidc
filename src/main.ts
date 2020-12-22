import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 设置根节点，将项目中的px转化成rems
import '@method/rem'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
