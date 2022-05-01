export default {
  // 开启命名空间
  namespaced: true,
  // state数据
  state: () => ({
    // 收获地址
    address: {},
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
