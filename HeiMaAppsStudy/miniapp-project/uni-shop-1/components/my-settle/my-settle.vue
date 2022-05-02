<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" value="" />
      <text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计：
      <text class="amount">¥{{ checkedGoodsAmount }}</text>
    </view>
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{ checkedCount }})</view>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'my-settle',
  data() {
    return {
      seconds: 3, // 倒计时单位秒
      timer: null // 定时器id
    }
  },
  computed: {
    ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
    ...mapGetters('m_user', ['addstr']),
    ...mapState('m_user', ['token']),
    // 是否全选
    isFullCheck() {
      return this.total === this.checkedCount
    }
  },
  methods: {
    /**
     * 结算按钮事件处理函数
     */
    settlement() {
      // 判断是否登录
      if (!this.token) return this.delayNavigate()
      // 判断是否勾选了商品
      if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
      // 判断是否选择收货地址
      if (!this.addstr) return uni.$showMsg('请选择收货地址！')
    },
    ...mapMutations('m_cart', ['updateAllGoodsState']),
    ...mapMutations('m_user', ['updateRedirectInfo']),
    /**
     * 全选按钮点击事件处理函数
     */
    changeAllState() {
      this.updateAllGoodsState(!this.isFullCheck)
    },
    /**
     * 延迟导航到my.vue页面s
     */
    delayNavigate() {
      // 重置计时器
      this.seconds = 3
      // 展示提示信息 此时seconds的值为3
      this.showTips(this.seconds)
      // 创建计时器 每隔1秒执行一次
      this.timer = setInterval(() => {
        this.seconds--
        // 判断是否<=0
        if (this.seconds <= 0) {
          // 清楚定时器
          clearInterval(this.timer)
          // 跳转my页面
          uni.switchTab({
            url: '/pages/my/my',
            success: () => {
              // 跳转成功之后，吧跳转信息存储到vuex中，方便返回
              this.updateRedirectInfo({
                // 跳转方式
                openType: 'switchTab',
                from: '/pages/cart/cart'
              })
            }
          })
          return
        }
        this.showTips(this.seconds)
      }, 1000)
    },
    /**
     * 展示倒计时信息
     * @param {Object} n
     */
    showTips(n) {
      uni.showToast({
        icon: 'none',
        title: '请登录后在结算！' + n + ' 秒后自动跳转登录页面',
        // 为页面添加透明遮罩，防止点击穿透
        mask: true,
        // 1.5秒消失
        duration: 1500
      })
    }
  }
}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  .radio {
    display: flex;
    align-items: center;
  }
  .amount-box {
    .amount {
      color: #c00000;
      font-weight: bold;
    }
  }
  .btn-settle {
    background-color: #c00000;
    height: 50px;
    color: white;
    line-height: 50px;
    padding: 0px 10px;
    min-width: 100px;
    text-align: center;
  }
}
</style>
