// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    info: 'Hello World',
    imgSrc:'https://www.itheima.com/images/logo.png',
    randomNum1: Math.random() * 10,
    randomNum2: Math.random().toFixed(2),
    count: 0,
    msg: "",
    type: true,
    array:[1,2,3,4],
    userList:[
      { id: 1, name: "liuhao" }, { id: 2, name: "liuhao2" }, { id: 3, name: "liuhao3" }
    ]
  },
  /**
   * 切换男女
   * @param {event} e 
   */
  changeType(e) {
    this.setData({
      type: !this.data.type
    })
  },
  /**
   * 输入框和data之间的数据同步
   */
  iptHandler(e) {
    this.setData({
      msg: e.detail.value
    })
  },
  /**
   * input输入框的数据处理函数
   * @param {event} e 
   */
  inputHandler(e) {
    // e.detail.value 是改变后的值，文本框最新的值
    console.log(e.detail.value)
  },
  // 定义按钮的事件处理函数
  btnTapHandler(e) {
    console.log(e)
  },
  /**
   * 页面传参
   * @param {event} e 
   */
  btnTapHandler2(e) {
    console.log(e);
    // 获取参数
    console.log(e.target.dataset.info)
    // count+2
    this.setData({
      count: this.data.count + e.target.dataset.info
    })
  },
  /**
   * +1按钮的点击事件
   */
  countChange() {
    this.setData({
      count: this.data.count + 1
    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
