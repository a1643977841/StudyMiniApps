<template>
  <view class="goods-item">
    <!-- 商品左侧图片 -->
    <view class="goods-item-left">
      <label v-if="showRadio" class="radio"><radio @click="radioClickHanlder" :checked="goods.goods_state" color="#C00000" value="" /></label>
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <view class="goods-name">{{ goods.goods_name }}</view>
      <!-- 商品信息 -->
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">¥{{ goods.goods_price | tofixed }}</view>
        <!-- 商品数量 -->
        <uni-number-box @change="numChangeHandler" v-if="showNum" :min="1" :value="goods.goods_count"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * my-goods 商品列表
 * @property {Object} goods 商品信息
 * @property {Boolean} showRadio 是否显示radio 默认为fasle 不展示
 * @property {Boolean} showNum 是否显示numberbox 默认为fasle 不展示s
 * @event {Function} radioClickHanlder radio商品勾选状态改变后函数s，参数为 goods 对象
 * @event {Function} numChangeHandler numberBox数量值改变后函数，参数为 goods 对象
 */
export default {
  name: 'my-goods',
  props: {
    goods: {
      type: Object,
      default: {}
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    showNum: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 默认的空图片
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
    }
  },
  /**
   * 过滤器
   */
  filters: {
    tofixed(num) {
      return Number(num).toFixed(2)
    }
  },
  methods: {
    /**
     * 数量值改变事件处理函数
     * @param {Number} val
     */
    numChangeHandler(val) {
      // 调用外界绑定的num-change处理函数
      this.$emit('num-change', {
        // 商品id
        goods_id: this.goods.goods_id,
        // 商品的最新数量
        goods_count: +val
      })
    },
    /**
     * 商品勾选状态选择变化时候
     */
    radioClickHanlder(e) {
      // 调用外界@click绑定的radio-change事件
      // 同时吧商品的id和勾选状态传递给radio-change事件处理函数
      this.$emit('radio-change', {
        // 商品id
        goods_id: this.goods.goods_id,
        // 商品最新的勾选状态
        goods_state: !this.goods.goods_state
      })
    }
  }
}
</script>

<style lang="scss">
.goods-item {
  width: 750rpx;
  // 设置盒模型为border-box
  box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }
    .goods-info-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
