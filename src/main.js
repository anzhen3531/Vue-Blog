import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/style.less'
import './assets/font/iconfont.css'

require('./Mock')

// import highlight from 'highlight.js';
import mavonEditor from 'mavon-editor'
import * as app from "q";  //引入mavon-editor 就是上面所安装的
Vue.config.productionTip = false


new Vue({
  router,
  store,
  mavonEditor,
  render: h => h(App)
}).$mount('#app')

// Vue.use(highlight);

