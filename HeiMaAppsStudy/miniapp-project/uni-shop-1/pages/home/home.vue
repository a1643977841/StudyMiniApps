<template>
  <view>
    <!-- 使用自定义搜索组件 -->
    <view class="search-box">
      <my-search @click="goToSearch()"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <view>
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
        <swiper-item v-for="(item, i) in swiperList" :key="i">
          <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id"><image :src="item.image_src" mode=""></image></navigator>
        </swiper-item>
      </swiper>
    </view>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image class="nav-img" :src="item.image_src"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image class="floor-title" :src="item.floor_title.image_src"></image>
        <view class="floor-img-box">
          <!-- 楼层左侧大图片 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧四个图片 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      swiperList: [],
      // 分类导航数据
      navList: [],
      // 楼层数据
      floorList: []
    };
  },
  onLoad() {
    // 页面加载时候，获取轮播图
    this.getSwiperList();
    // 获取分类导航的数据
    this.getNavList();
    // 获取楼层数据
    this.getFloorList();
  },
  methods: {
    /**
     * 去搜索页面
     */
    goToSearch() {
      uni.navigateTo({
        url: '/subpkg/search/search'
      })
    },
    /**
     * 分类导航click事件处理函数
     */
    navClickHandler(item) {
      if (item.name === '分类') {
        uni.switchTab({
          url: '/pages/cate/cate'
        });
      }
    },
    /**
     * 获取轮播图
     */
    async getSwiperList() {
      const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
      console.log('轮播图数据：')
      console.log(res)
      if(res.meta.status !== 200) {
        uni.$showMsg('数据获取失败！',1500)
        return
      }
      this.swiperList = res.message
    },
    /**
     * 获取分类导航
     */
    async getNavList() {
      const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
      console.log('分类导航数据：')
      console.log(res)
      if(res.meta.status !== 200) {
        uni.$showMsg('数据获取失败！',1500)
        return
      }
      this.navList = res.message
    },
    /**
     * 获取楼层数据
     */
    async getFloorList() {
      const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
      console.log('楼层数据：')
      console.log(res)
      if(res.meta.status !== 200) {
        uni.$showMsg('数据获取失败！',1500)
        return
      }
      // 处理url
      res.message.forEach(floor => {
        floor.product_list.forEach(prod => {
          prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
        })
      })
      this.floorList = res.message
    }
  }
};
</script>

<style lang="scss">
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title {
  width: 100%;
  height: 60rpx;
}
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
.search-box {
  // 将定位设计为吸顶
  position: sticky;
  top: 0;
  z-index: 9999;
}
</style>
