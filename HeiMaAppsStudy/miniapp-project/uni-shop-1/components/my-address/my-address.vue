<template>
  <view>
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button @click="chooseAddress" type="primary" size="mini" class="btnChooseAddress">请选择收货地址+</button>
    </view>
    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-if="JSON.stringify(address) !== '{}'" @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">
            收货人：
            <text>{{ address.userName }}</text>
          </view>
        </view>
        <view class="row1-right">
          <view class="phone">
            电话：
            <text>{{ address.telNumber }}</text>
            <uni-icons type="arrowright" size="16"></uni-icons>
          </view>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{ addstr }}</view>
      </view>
    </view>
    <!-- 底部边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
/**
 * my-goods 商品列表
 * @property {Object} address 收货地址
 * @event {Function} chooseAddress 选择收货地址处理函数
 */
export default {
  name: 'my-address',
  computed: {
    ...mapState('m_user', ['address']),
    ...mapGetters('m_user', ['addstr'])
  },
  data() {
    return {
      // 使用store代替了
      //address: {}
    }
  },
  methods: {
    ...mapMutations('m_user', ['updateAddress']),
    async chooseAddress() {
      // 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
      const [err, succ] = await uni.chooseAddress().catch(err => err)
      // 用户成功选择了收货地址
      if (err === null && succ.errMsg === 'chooseAddress:ok') {
        // // 为data里面的收获地址对象赋值
        // this.address = succ
        this.updateAddress(succ)
      }
      // 用户没有授权
      if (err && err.errMsg === 'chooseAddress:fail auth deny') {
        // 调用重新授权
        this.reAuth()
      }
    },
    /**
     * 用户授权
     */
    async reAuth() {
      const [err2, confirmResult] = await uni.showModal({
        content: '检测到您没打开地址权限，是否设置打开？',
        confirmText: '确认',
        cancelText: '取消'
      })
      // 异常
      if (err2) return
      // 如果用户点击了取消，则提示用户取消了授权
      if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权!')

      // 如果用户点击了确认， 则调用uni.openSetting() 进入授权页面。让用户重新授权
      if (confirmResult.confirm)
        return uni.openSetting({
          // 授权结束，需要对授权结果做进一步处理
          success: settingResult => {
            // 地址授权的值等于true 提示用户授权成功
            if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
            // 地址授权等于false，提示用户"您取消了授权"
            else return uni.$showMsg('您取消了地址授权!')
          }
        })
    }
  }
}
</script>

<style lang="scss">
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}
// 请选择收获地址的盒子
.address-choose-box {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}
// 渲染收货信息的盒子
.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;
  // 第一行
  .row1 {
    display: flex;
    justify-content: space-between;
    .row1-right {
      display: flex;
      align-items: center;

      .phone {
        margin-right: 5px;
      }
    }
  }
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>
