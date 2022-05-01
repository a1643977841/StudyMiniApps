/**
 * 购物车模块
 * @event {Function} addToCart 添加购物车商品信息函数。
 * @event {Function} saveToStorage 持久化存储商品信息函数
 * @event {Function} updateGoodsState 更新商品的选中状态，接受一个goods商品对象
 * @event {Function} updateGoodsCount 更新商品的数量，接受一个goods商品对象
 * @event {Function} removeGoodsById 根据商品id删除商品信息，接受一个goods商品id
 * @event {Function} updateAllGoodsState 更所有商品的选中状态 全选/反选
 */
export default {
  // 为当前模块开启命名空间
  namespaced: true,
  // 模块的state数据
  state: () => ({
    // 购物车信息数组 存放的每一个goods对象，每个商品的信息对象，都包含如下6个属性{  goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state}
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  // 模块的mutations方法
  mutations: {
    addToCart(state, goods) {
      // 根据商品id 查询购物车中是否存在这件商品
      // 如果不存在 则 findResult 为undefined 否则，为查找的这件商品信息对象
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (!findResult) {
        // 如果购物车没有这件商品
        state.cart.push(goods)
      } else {
        // 如果有则只更新商品数量即可
        findResult.goods_count++
      }
      // 调用持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    /**
     * 将购物车中的数据持久化存储到本地
     * @param {Object} state
     */
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    /**
     * 更新商品选中状态方法
     * @param {Object} state
     * @param {Object} goods
     */
    updateGoodsState(state, goods) {
      // 根据goods_id 查询购物车中的商品对应信息
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    /**
     * 更新购物车中商品的数量
     * @param {Object} state
     * @param {Object} goods
     */
    updateGoodsCount(state, goods) {
      // 根据 goods_id 查询购物车中对应商品的信息对象
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    /**
     * 删除购物车商品信息
     * @param {Object} state
     * @param {Object} goods_id
     */
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      this.commit('m_cart/saveToStorage')
    },
    /**
     * 更新所有商品的勾选状态
     * @param {Object} state
     * @param {Object} newState
     */
    updateAllGoodsState(state, newState) {
      // 循环更新购物车中每件商品的勾选状态
      state.cart.forEach(x => x.goods_state = newState)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    }
  },
  // 模块的getters属性
  getters: {
    // 统计购物车中的商品总数量
    total(state) {
      let c = 0
      // 循环统计
      //state.cart.forEach(goods => c += goods.goods_count)
      return c = state.cart.length
    },
    /**
     * 勾选的商品总数量
     */
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).length
    },
    /**
     * 计算已勾选商品的总价格
     * @param {Object} state
     */
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price,
        0).toFixed(2)
    }
  }
}
