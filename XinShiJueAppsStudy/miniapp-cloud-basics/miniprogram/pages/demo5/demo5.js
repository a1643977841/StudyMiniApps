// pages/demo5/demo5.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },
  /**
   * 点击阅读量增加7
   */
  clickRow(res) {
    const { id, idx } = res.currentTarget.dataset
    wx.cloud
      .callFunction({
        name: 'demo5UptData',
        data: {
          id: id
        }
      })
      .then(res => {
        this.setData({
          dataList: []
        })
        this.getData(6, 0)
      })
  },
  getData(num = 6, page = 0) {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
    wx.cloud
      .callFunction({
        name: 'demo5GetData',
        data: {
          num: num,
          page: page
        }
      })
      .then(res => {
        console.log('云调用')
        console.log(res)
        this.setData({
          dataList: [...this.data.dataList, ...res.result.data]
        })
        wx.hideLoading()
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
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
  onReachBottom() {
    let page = this.data.dataList.length
    this.getData(6, page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
