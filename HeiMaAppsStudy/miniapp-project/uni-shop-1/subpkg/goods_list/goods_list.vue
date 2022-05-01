<template>
  <view>
    <view class="goods-list">
      <view v-for="(item, i) in goodsList" :key="i" @click="goToDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 查询对象
      queryObj: {
        query: '', // 关键词
        cid: '', // 商品分类id
        pagenum: 1, // 当前第几页
        pagesize: 10 // 每页多少条
      },
      goodsList: [], // 商品列表数据
      total: 0, // 数据总条数
      isLoading: false // 节流阀。false可以请求
    };
  },
  methods: {
    /**
     * 跳转商品详情页面
     * @param {Object} item 商品信息
     */
    goToDetail(item) {
      uni.navigateTo({
        url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
      })
    },
    /**
     * 获取商品列表数据
     */
    async getGoodsList(cb) {
      this.isLoading = true // 开启节流阀
      const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
      this.isLoading = false // 关闭节流阀
      if (res.meta.status != 200) return uni.$showMsg();
      this.total = res.message.total;
      this.goodsList = [...this.goodsList, ...res.message.goods];
      // 判断cb回调是否存在 存在调用
      cb && cb()
    }
  },
  onLoad(options) {
    // 获取页面参数
    this.queryObj.query = options.query || '';
    this.queryObj.cid = options.cid || '';
    // 获取商品列表数据
    this.getGoodsList();
  },
  /**
   * 上拉触底获取新的数据
   */
  onReachBottom() {
    // 判断节流阀是否正在请求数据
    if(this.isLoading) return
    // 判断数据是否加载完毕
    if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据已加载完毕',1500)
    // 页码+1
    this.queryObj.pagenum++
    this.getGoodsList()
  },
  /**
   * 下拉刷新周期函数
   */
  onPullDownRefresh() {
    // 重置关键数据
    this.queryObj.pagenum = 1
    this.total = 0
    this.isLoading = false
    this.goodsList = []
    // 重新获取商品数据
    this.getGoodsList(() => {
      uni.stopPullDownRefresh()
    })
  }
};
</script>
<style lang="scss">

</style>
