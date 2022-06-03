// pages/demo2/demo2.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  getData() {
    // limit、orderBy、skip、field
    db.collection('demolist')
      .limit(10)
      .get()
      .then(res => {
        console.log('指定查询结果集数量上限')
        console.log(res)
      })
    db.collection('demolist')
      .orderBy('date', 'desc') // desc倒序
      .get()
      .then(res => {
        console.log('排序查询')
        console.log(res)
      })
    db.collection('demolist')
      .limit(3) // 取多少
      .skip(1) // 过滤前面多少条
      .orderBy('date', 'desc')
      .get()
      .then(res => {
        console.log('指定查询返回结果时从指定序列后的结果开始返回，常用于分页')
        console.log(res)
      })
    db.collection('demolist')
      .field({
        // 指定需要返回的字段
        title: true
      })
      .get()
      .then(res => {
        console.log('指定返回结果中记录需返回的字段')
        console.log(res)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
