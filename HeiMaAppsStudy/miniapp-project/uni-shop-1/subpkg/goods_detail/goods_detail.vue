<template>
  <!-- v-if是为了解决进入页面首次渲染的时候 价格显示为undefined的问题 -->
  <view v-if="goodsInfo.goods_name" class="goods-detail-container">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goodsInfo.pics" :key="i"><image :src="item.pics_big" @click="preview(i)"></image></swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">¥{{ goodsInfo.goods_price }}</view>
      <!-- 商品主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{ goodsInfo.goods_name }}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    <!-- 富文本区域 -->
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <!-- 
          fill 控制右侧按钮样式
          options 左侧按钮配置项
          button-group 右侧按钮配置项
          click 左侧按钮点击事件处理函数
          buttonClick 右侧按钮点击事件处理函数
       -->
      <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      goodsInfo: {}, // 商品详情对象
      // 商品左侧导航组件
      options: [
        {
          icon: 'shop',
          text: '商铺'
        },
        {
          icon: 'cart',
          text: '购物车',
          info: 0
        }
      ],
      // 商品右侧导航组件
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }
      ]
    }
  },
  computed: {
    // 调用mapState方法，把m_cart模块中的cart数组映射到当前页面中，作为计算属性来使用
    // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])...mapState('m_cart', ['cart']),
    ...mapGetters('m_cart', ['total'])
    //今后无论映射 mutations 方法，还是 getters 属性，还是 state 中的数据，都需要指定模块的名称，才能进行映射。
  },
  watch: {
    // 监听total变化
    total: {
      handler(newVal) {
        // 通过数组的find() 方法找到购物车按钮的配置对象
        const findResult = this.options.find(x => x.text === '购物车')
        if (findResult) {
          // 动态为购物车按钮的info属性赋值
          findResult.info = newVal
        }
      },
      // 为true代表页面初次加载完毕就会调用
      immediate: true
    }
  },
  methods: {
    // 映射添加购物车方法
    ...mapMutations('m_cart', ['addToCart']),
    /**
     * 商品导航组件左侧点击事件处理函数
     */
    onClick(e) {
      // 点击的是购物车，跳转购物车页面
      if (e.content.text === '购物车') {
        uni.switchTab({
          url: '/pages/cart/cart'
        })
      }
    },
    /**
     * 商品导航组件右侧点击事件处理函数
     */
    buttonClick(e) {
      // 是点击的加入购物车
      if (e.content.text === '加入购物车') {
        // 创建一个商品对象
        const goods = {
          goods_id: this.goodsInfo.goods_id, // 商品id
          goods_name: this.goodsInfo.goods_name, // 商品名称
          goods_price: this.goodsInfo.goods_price, // 商品价格
          goods_count: 1, // 商品数量
          goods_small_logo: this.goodsInfo.goods_small_logo, // 商品图片
          goods_state: true // 商品勾选状态
        }
        // 通过this调用映射的addToCart方法 把商品信息对象存储到购物车中
        this.addToCart(goods)
      }
    },
    /**
     * 大图片预览
     */
    preview(i) {
      uni.previewImage({
        current: i,
        urls: this.goodsInfo.pics.map(x => x.pics_big)
      })
    },
    /**
     * 获取商品详情信息
     * @param {Object} goodsId 商品id
     */
    async getGoodsDetail(goodsId) {
      const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id: goodsId })
      if (res.meta.status !== 200) return uni.$showMsg(res.meta.msg, 1500)
      // 替换富文本区域的img标签，为img添加样式
      res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block;" ').replace(/webp/g, 'jpg')
      this.goodsInfo = res.message
    }
  },
  onLoad(options) {
    // 获取商品id
    const goodsId = options.goods_id
    // 获取商品详情数据
    this.getGoodsDetail(goodsId)
  }
}
</script>

<style lang="scss">
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.goods-info-box {
  padding: 10px;
  padding-right: 0;
  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }
  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
      margin-right: 10px;
    }
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }
  .yf {
    font-size: 12px;
    color: gray;
    margin: 10px 0;
  }
}
.goods_nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.goods-detail-container {
  padding-bottom: 50px;
}
</style>
