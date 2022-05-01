<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <view><my-address></my-address></view>
    <!-- 商品列表标题区域 -->
    <view class="cart-title">
      <!-- 左侧图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品购物车中的数据 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swiperActionClickHandler(goods)">
          <my-goods :showRadio="true" :showNum="true" :goods="goods" @num-change="numberChangeHandler" @radio-change="radioChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 结算区域 -->
    <my-settle></my-settle>
  </view>
  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('m_cart', ['cart'])
  },
  data() {
    return {
      options: [
        {
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮背景颜色
          }
        }
      ]
    }
  },
  methods: {
    /**
     * 点击滑动操作按钮时间处理函数
     */
    swiperActionClickHandler(e) {
      // 调用删除方法
      this.removeGoodsById(e.goods_id)
    },
    /**
     * 商品数量变化事件处理函数
     * @param {Object} e
     */
    numberChangeHandler(e) {
      // 调用更新数量方法
      this.updateGoodsCount(e)
    },
    /**
     * 勾选商品事件处理函数
     * @param {Object} e
     */
    radioChangeHandler(e) {
      // 调用更新状态方法
      this.updateGoodsState(e)
    },
    ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById'])
  },
  mixins: [badgeMix]
}
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  .cart-title-text {
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;
    margin-left: 10px;
  }
}
.cart-container {
  padding-bottom: 50px;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  .empty-img {
    width: 90px;
    height: 90px;
  }
  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
