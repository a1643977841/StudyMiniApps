<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧滑动区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{ height: wh + 'px' }">
        <block v-for="(item, i) in cateList" :key="i">
          <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChange(i)">{{ item.cat_name }}</view>
        </block>
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view scroll-y="true" :style="{ height: wh + 'px' }" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item, i) in cateLevel2" :key="i">
          <!-- 二级分类 -->
          <view class="cate-lv2-title">/{{ item.cat_name }}/</view>
          <!-- 三级分类 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item2, i2) in item.children" :key="i2" @click="goToGoodsList(item2)">
              <!-- 三级分类图片 -->
              <image :src="item2.cat_icon"></image>
              <!-- 三级分类文本 -->
              <text>{{item2.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      wh: 0, // 动态的可用手机高度
      cateList: [], // 分类数据
      active: 0, // 当前选中的一级标签的下表
      cateLevel2: [] ,// 二级分类的列表
      scrollTop: 0 //滚动条距离顶部的距离
    };
  },
  onLoad() {
    // 获取手机信息
    const sysInfo = uni.getSystemInfoSync();
    this.wh = sysInfo.windowHeight;
    // 获取分类数据
    this.getCateList();
  },
  methods: {
    /**
     * 跳转商品列表界面
     */
    goToGoodsList(item) {
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
      })
    },
    /**
     * 选中标签变化事件处理函数
     */
    activeChange(i) {
      this.active = i;
      // 标签变化的时候，重新获取二级分类
      this.cateLevel2 = this.cateList[i].children;
      // 重置滚动条为0 目的是为了解决切换标签的时候 二级分类滚动条不会自动回到顶部的问题
      this.scrollTop = this.scrollTop === 0 ? 1 : 0 
    },
    /**
     * 获取分类数据
     */
    async getCateList() {
      const { data: res } = await uni.$http.get('/api/public/v1/categories');
      console.log(res);
      if (res.meta.status !== 200) return uni.$showMsg();
      this.cateList = res.message;
      // 为二级分类赋值
      this.cateLevel2 = res.message[0].children;
    }
  }
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      background-color: #f7f7f7;
      line-height: 35px;
      text-align: center;
      font-size: 12px;
      // 选中的样式
      &.active {
        background-color: #ffffff;
        position: relative;
        // 选中时候 小竖条
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
.cate-lv3-list{
  display: flex;
  flex-wrap: wrap;
  
  .cate-lv3-item {
    width: 33.33%;
    display: flex;
    // 纵向布局
    flex-direction: column;
    // 居中
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    image {
      width: 60px;
      height: 60px;
    }
    text {
      font-size: 12px;
    }
  }
}
</style>
