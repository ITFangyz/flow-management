import Vue from 'vue'
import App from './App.vue'

// import permission from './permission'
// Vue.use(permission)

// import './assets/styles/element-variables.scss'
// import '@/assets/styles/index.scss' // global css
// import '@/assets/styles/custom.scss' // custom css
// import './assets/icons' // icon
import './main.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// import KFormDesign from 'form-design-f'
// import 'form-design-f/lib/k-form-design.css'
import KFormDesign from 'k-form-design'
import 'k-form-design/lib/k-form-design.css'
Vue.use(KFormDesign)

import router from './router'

import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, download, handleTree } from "@/utils/systemCommon";
import Pagination from "@/components/Pagination";
// 全局组件挂载
Vue.component('Pagination', Pagination)

import plugins from "./plugins/index"
Vue.use(plugins)


Vue.prototype.resetForm = resetForm

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
