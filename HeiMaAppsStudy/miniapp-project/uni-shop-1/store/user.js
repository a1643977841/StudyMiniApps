export default {
  // 开启命名空间
  namespaced: true,
  // state数据
  state: () => ({
    // 收获地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    // 登录成功之后的token字符串
    token: uni.getStorageSync('token') || '',
    // 用户基本信息
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 重定向object对象{openType, from}
    redirectInfo: null
  }),
  // 方法
  mutations: {
    // 更新收获地址
    updateAddress(state, address) {
      state.address = address
      // 持久化本地存储
      this.commit('m_user/saveAddressToStorage')
    },
    /**
     * 定义将 address 持久化存储到本地 mutations 方法
     * @param {Object} state
     */
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    /**
     * 更新用户的基本信息
     * @param {Object} state
     * @param {Object} userinfo
     */
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法， 将 userinfo 对象持久化存储到本地
      this.commit('m_user/saveUserInfoToStorage')
    },
    /**
     * 将 userinfo 持久化存储到本地
     * @param {Object} state
     */
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    /**
     * 更新 token 字符串
     * @param {Object} state
     * @param {Object} token
     */
    updateToken(state, token) {
      state.token = token
      // 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法将 token 字符串持久化存储到本地
      this.commit('m_user/saveTokenToStorage')
    },
    /**
     * 将 token 字符串持久化存储到本地
     * @param {Object} state
     */
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    /**
     * 更新重定向的信息对象
     * @param {Object} state
     * @param {Object} info
     */
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    }
  },
  // 数据包装器
  getters: {
    addstr(state) {
      if (!state.address.provinceName) return ''
      // 拼接省 市 区 详细地址 的字符串并且返回给用户
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}
