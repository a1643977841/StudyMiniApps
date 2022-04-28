<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    methods: {
      /**
       * 搜索框输入事件
       */ 
      input(e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 9999;
}
</style>
