// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0
  },
  /**
   * 定义syncCount方法
   * 将来这个方法会被传递给子组件调用
   */
  syncCount(e) {
    // 子组件调用该方法传递的参数在e.detail
    this.setData({
      count: e.detail.value,
      username: 'ls'
    })
  },
  /**
   * 获取子组件的实力对象，从而调用子组件的任何属性和方法
   */
  getChild() {
    // 切记下面参数不能传递标签选择器，不然返回null，可以传id和class选择器
    const child = this.selectComponent('.childA')
    // 调用子组件方法
    child.addCount()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})