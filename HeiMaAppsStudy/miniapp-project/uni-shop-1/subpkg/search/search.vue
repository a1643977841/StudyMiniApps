<template>
  <view>
    <view class="search-box"><uni-search-bar :value="kw" @input="input" :radius="100" cancelButton="none"></uni-search-bar></view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list"   v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="goToDetail(item)">
        <view class="goods-name">
          {{item.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="goToGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  computed:{
    histories() {
      //计算属性 解决历史记录前后顺序问题
      return [...this.historyList].reverse()
    }
  },
  data() {
    return {
      timer: null, // 延时器
      kw: null, // 输入的值
      searchResults: [], // 搜索的结果列表
      historyList:[] // 搜索历史记录
    };
  },
  onLoad() {
    // 初始化历史数据
    this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
  },
  methods: {
    /**
     * 跳转商品详情页
     * @param {Object} item 每一个商品对象
     */
    goToDetail(item) {
      uni.navigateTo({
        url: '/subpkg/goods_detail/goods_detail?goods_id' + item.goods_id
      })
    },
    /**
     * 搜索框输入事件
     */
    input(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.kw = e;
        this.getSearchList();
      }, 500);
    },
    /**
     * 获取搜索列表
     */
    async getSearchList() {
      if (this.kw.length === 0) {
        this.searchResults = [];
        return;
      }
      const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw });
      if(res.meta.status !== 200) return uni.$showMsg()
      this.searchResults = res.message
      // 保存搜索历史记录
      this.saveSearchHistory()
    },
    /**
     * 保存搜索历史
     */
    saveSearchHistory() {
      // this.historyList.push(this.kw)
      const set = new Set(this.historyList)
      set.delete(this.kw)
      set.add(this.kw)
      this.historyList = Array.from(set)
      // 持久化存储
      uni.setStorageSync('kw', JSON.stringify(this.historyList))
    },
    /**
     * 点击历史搜索记录名称跳转商品列表页面
     * @param {Object} item 历史搜索记录名称
     */
    goToGoodsList(item) {
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?query=' + item
      })
    },
    /**
     * 清空历史记录
     */
    clearHistory() {
      this.historyList = []
      uni.setStorageSync('kw', '[]')
    }
  }
};
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 9999;
}
.sugg-list {
  padding: 0 5px;
  .sugg-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    .goods-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.history-box {
  padding: 0 5px;
  .history-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }
  .history-list {
    .uni-tag{
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
