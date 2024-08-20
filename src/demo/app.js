import Vue from 'vue'
import App from './demo.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// https://www.iconfont.cn/ Customize Icons
// projectId=1546640
import './iconfont'
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 })

new Vue({
  render: (h) => h(App),
}).$mount('#app')
