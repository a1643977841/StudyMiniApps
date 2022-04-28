<template>
  <view>
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
        <image class="nav-img" :src="item.image_src" mode=""></image>
        <view>{{ item.name }}</view>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <view class="floor-title">
          {{item.floor_title.name}}
        </view>
        <view class="floor-img-box">
          <!-- 楼层左侧大图片 -->
          <navigator class="left-img-box" url="/subpkg/goods_list/goods_list?query=1">
            <image :src="item.product_list[0].image_src" style="width: 230rpx;" mode="widthFix"></image>
          </navigator>
          <!-- 右侧四个图片 -->
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
              <image :src="item2.image_src" mode="widthFix" style="width: 230rpx;"></image>
            </view>
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
     * 分类导航click事件处理函数
     */
    navClickHandler(item) {
      if (item.name === '分类') {
        uni.switchTab({
          url: '/pages/cart/cart'
        });
      }
    },
    /**
     * 获取轮播图
     */
    async getSwiperList() {
      // 由于接口失效暂时不用请求数据
      // const res = await uni.$http.get('/api/public/v1/home/swiperdata')
      // console.log(res)
      this.swiperList = [
        {
          id: 1,
          goods_id: 10,
          image_src:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.shedejie.com%2Fmmbiz_jpg%2FJVqP76tia2Rk6poe0pPq0512XPxtv1GYGN1qXTZsDvgLJP5dWWGy18C5icAT5ChicibRc23PVWoG48uoInj3fjXczw%2F640%3Fwx_fmt%3Djpeg&refer=http%3A%2F%2Fi.shedejie.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653724972&t=26a88b3e604269fe2e4bce1759f155aa'
        },
        {
          id: 2,
          goods_id: 11,
          image_src:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c07f578ee0470000012e7e38b17f.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653725183&t=ba6e6724d6b431dc81b63b32aee0a0c8'
        },
        {
          id: 3,
          goods_id: 12,
          image_src:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic115.nipic.com%2Ffile%2F20161122%2F11949215_122207879000_2.jpg&refer=http%3A%2F%2Fpic115.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653725243&t=ae5d5e1597c4036b241c82ba2705fac8'
        },
        {
          id: 4,
          goods_id: 13,
          image_src:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0135ef5c4593a9a801213f26162219.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653725256&t=b774a0b6689e6b923b9813dfa06f5b23'
        }
      ]; // 存储轮播图数据
    },
    /**
     * 获取分离导航
     */
    getNavList() {
      this.navList = [
        {
          name: '分类',
          image_src:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01d233583bd7b7a8012060c820fc5e.png%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653726746&t=80ddaec5397acf5258b9176daa318e39',
          open_type: 'switchTab',
          navigator_url: '/pages/category/main'
        },
        {
          name: '秒杀拍',
          image_src:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F6db8b31133d535679ca714e874a157de9746f6449662-FNQ15F_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653726789&t=aac67b9a40f1ef205934440aca5634e1'
        },
        {
          name: '超市购',
          image_src:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F71%2F39%2F5becdc72ab9fc_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653726846&t=fa25555a8ce9ddff581df8d8b639d763'
        },
        {
          name: '母婴品',
          image_src:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcnfood.cn%2FPublic%2Fupload%2F202107%2F20210720144615808.jpg&refer=http%3A%2F%2Fcnfood.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653726888&t=f03b211e57a9859dbb686bd1ea64fad0'
        }
      ];
    },
    /**
     * 获取楼层数据
     */
    getFloorList() {
      this.floorList = [
        {
          floor_title: {
            name: '时尚女装',
            image_src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01530e554918b80000019ae93fb29c.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653728109&t=785c6f73cf7d601a9cc433f2315ea41b'
          },
          product_list: [
            {
              name: '优质服饰',
              image_src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01530e554918b80000019ae93fb29c.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653728109&t=785c6f73cf7d601a9cc433f2315ea41b',
              image_width: '232',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=服饰'
            },
            {
              name: '春季热门',
              image_src: 'https://img2.baidu.com/it/u=287182078,4224517050&fm=253&fmt=auto&app=138&f=JPEG?w=714&h=500',
              image_width: '233',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=热'
            },
            {
              name: '爆款清仓',
              image_src: 'https://img2.baidu.com/it/u=287182078,4224517050&fm=253&fmt=auto&app=138&f=JPEG?w=714&h=500',
              image_width: '233',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=爆款'
            },
            {
              name: '倒春寒',
              image_src: 'https://img2.baidu.com/it/u=287182078,4224517050&fm=253&fmt=auto&app=138&f=JPEG?w=714&h=500',
              image_width: '233',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=春季'
            },
            {
              name: '怦然心动',
              image_src: 'https://img2.baidu.com/it/u=287182078,4224517050&fm=253&fmt=auto&app=138&f=JPEG?w=714&h=500',
              image_width: '233',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=心动'
            }
          ]
        },
        {
          floor_title: {
            name: '户外活动',
            image_src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.aiimg.com%2Fuploads%2Fuserup%2F1211%2F041F331I06.jpg&refer=http%3A%2F%2Fimg.aiimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653728184&t=c1ed6aaa588fd47dcfd2737a52ffabdc'
          },
          product_list: [
            {
              name: '勇往直前',
              image_src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.aiimg.com%2Fuploads%2Fuserup%2F1211%2F041F331I06.jpg&refer=http%3A%2F%2Fimg.aiimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653728184&t=c1ed6aaa588fd47dcfd2737a52ffabdc',
              image_width: '232',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=户外'
            },
            {
              name: '户外登山包',
              image_src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F017962583e89c4a8012060c8ec038e.png%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653728184&t=445fedb3a1ca7e74d55ded550e8dc514',
              image_width: '273',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=登山包'
            },
            {
              name: '超强手套',
              image_src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F017962583e89c4a8012060c8ec038e.png%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653728184&t=445fedb3a1ca7e74d55ded550e8dc514',
              image_width: '193',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=手套'
            },
            {
              name: '户外运动鞋',
              image_src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F017962583e89c4a8012060c8ec038e.png%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653728184&t=445fedb3a1ca7e74d55ded550e8dc514',
              image_width: '193',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=运动鞋'
            },
            {
              name: '冲锋衣系列',
              image_src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F017962583e89c4a8012060c8ec038e.png%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653728184&t=445fedb3a1ca7e74d55ded550e8dc514',
              image_width: '273',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=冲锋衣'
            }
          ]
        },
        {
          floor_title: {
            name: '箱包配饰',
            image_src: 'https://img0.baidu.com/it/u=2321310475,2193357792&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750'
          },
          product_list: [
            {
              name: '清新气质',
              image_src: 'https://img0.baidu.com/it/u=2321310475,2193357792&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
              image_width: '232',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=饰品'
            },
            {
              name: '复古胸针',
              image_src: 'https://img1.baidu.com/it/u=700209672,4082906211&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              image_width: '263',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=胸针'
            },
            {
              name: '韩版手链',
              image_src: 'https://img1.baidu.com/it/u=700209672,4082906211&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              image_width: '203',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=手链'
            },
            {
              name: '水晶项链',
              image_src: 'https://img1.baidu.com/it/u=700209672,4082906211&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              image_width: '193',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=水晶项链'
            },
            {
              name: '情侣表',
              image_src: 'https://img1.baidu.com/it/u=700209672,4082906211&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              image_width: '273',
              open_type: 'navigate',
              navigator_url: '/pages/goods_list?query=情侣表'
            }
          ]
        }
      ];
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
  color: palevioletred;
  padding-left: 10rpx;
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
</style>
