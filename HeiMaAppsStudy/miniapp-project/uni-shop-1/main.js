
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store.js'
// 导入网络请求的包
import { $http } from '@escook/request-miniprogram';
// 设置请求根路径
$http.baseUrl = 'http://api-hmugo-web.itheima.net'
// 请求拦截器
$http.beforeRequest = function(options) {
  // 加载loading
  uni.showLoading({
    title: '数据加载中'
  })
}
// 响应拦截器
$http.afterRequest = function(options) {
  // 关闭loading
  uni.hideLoading()
}
uni.$http = $http
// 封装msg弹出框方法
uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import Apps from './App.vue'
export function createApp() {
  const app = createSSRApp(Apps)
  return {
    app
  }
}
// #endif