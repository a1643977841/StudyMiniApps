import Vue from 'vue'
import Vuex from 'vuex'
// 导入购物车模块
import moduleCart from './cart.js'
// 导入用户的模块
import moduleUser from './user.js'

// 安装插件
Vue.use(Vuex)

// 创建store实例
const store = new Vuex.Store({
  // 挂载store模块
  modules: {
    m_cart: moduleCart,
    m_user: moduleUser
  }
})

// 导出Store实例对象
export default store
