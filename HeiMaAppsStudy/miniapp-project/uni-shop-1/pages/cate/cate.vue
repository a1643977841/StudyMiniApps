<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧滑动区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
        <view v-if="i === 0" class="left-scroll-view-item active" v-for="(item, i) in 50" :key="i">xxx</view>
        <view v-else class="left-scroll-view-item" v-for="(item, i) in 50" :key="i">xxx</view>
      </scroll-view>
      <scroll-view scroll-y="true" :style="{height: wh + 'px'}"><view v-for="(item, i) in 50" :key="i">xxx</view></scroll-view>
      <!-- 右侧滑动区域 -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      wh: 0
    };
  },
  onLoad() {
    const sysInfo = uni.getSystemInfoSync()
    console.log(sysInfo)
    this.wh = sysInfo.windowHeight
  }
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  
  .left-scroll-view {
    width: 120px;
    
    .left-scroll-view-item{
      background-color: #F7F7F7;
      line-height: 35px;
      text-align: center;
      font-size: 12px;
      
      &.active{
        background-color: #FFFFFF;
        position: relative;
        
        &::before {
          content: ' ';;
          display: block;
          width: 3px;
          height: 30px;
          background-color: #C00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
