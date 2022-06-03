// pages/demo1/demo1.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataArr: []
  },
  /**
   * 获取记录数
   */
  count() {
    db.collection('demolist')
      .count()
      .then(res => {
        console.log(res)
      })
  },
  /**
   * 根据id删除一条记录
   */
  removeById() {
    db.collection('demolist')
      .doc('684266796294ba0e0434f6745d2cf462')
      .remove()
      .then(res => {
        console.log(res)
      })
  },
  /**
   * 根据id更新一条数据
   */
  uodateById() {
    // 如果数据库本身没有的字段会自动增加
    db.collection('demolist')
      .doc('684266796294ba0e0434f6745d2cf462')
      .update({
        data: {
          author: '王五'
        }
      })
      .then(res => {
        console.log(res)
      })
    // 除了update还有set更新数据 区别在于set会把之前的删除再重新添加新的数据
    db.collection('demolist')
      .doc('b69f67c062943f2e051b033323654623')
      .set({
        data: {
          author: '王五'
        }
      })
      .then(res => {
        console.log(res)
      })
  },
  getData() {
    db.collection('demolist')
      .get()
      .then(res => {
        this.setData({
          dataArr: res.data
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取数据
    this.getData()
    // 数据库的监听
    db.collection('demolist').watch({
      onChange: res => {
        // 及时更新数据
        this.setData({
          dataArr: res.docs
        })
      },
      onError: err => {
        console.log(err)
      }
    })
  },

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
