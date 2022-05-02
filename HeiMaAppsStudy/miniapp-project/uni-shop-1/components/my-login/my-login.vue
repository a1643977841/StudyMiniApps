<template>
  <view class="login-container">
    <!-- 提示登录图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'my-login',
  computed: {
    ...mapState('m_user', ['redirectInfo'])
  },
  data() {
    return {}
  },
  methods: {
    getUserProfile(e) {
      uni.getUserProfile({
        desc: '你的授权信息',
        success: res => {
          // 将信息存到 vuex 中
          this.updateUserInfo(res.userInfo)
          // 获取token
          this.getToken(res)
        },
        fail: res => {
          console.log(res)
          return uni.$showMsg('您取消了登录授权')
        }
      })
    },
    /**
     * 获取token
     */
    async getToken(info) {
      const [err, res] = await uni.login().catch(err => err)
      // 判断是否 wx.login() 调用失败
      if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')
      // 准备参数对象
      const query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature
      }
      // 换token
      uni.$http.baseUrl = 'https://www.fastmock.site/mock/1479b8ee7fbb761269662b23b8f933fa/ssy'
      const { data: loginResult } = await uni.$http.post('/login', query)
      uni.$http.baseUrl = 'http://api-hmugo-web.itheima.net'
      if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
      uni.$showMsg('登录成功')
      // 更新token
      this.updateToken(loginResult.message.token)
      // 判断vuex中的redirectInfo是否为null
      // 如果不为null跳转到对应页面
      this.navigateBack()
    },
    /**
     * 返回之前的页面
     */
    navigateBack() {
      if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
        // 调用uni.switchTab
        uni.switchTab({
          url: this.redirectInfo.from,
          // 导航完成之后，清空redirectInfo对象信息,重置为null
          complete: () => {
            this.updateRedirectInfo(null)
          }
        })
      }
    },
    ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo'])
  }
}
</script>

<style lang="scss">
.login-container {
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }
  // 登录按钮样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }
  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
