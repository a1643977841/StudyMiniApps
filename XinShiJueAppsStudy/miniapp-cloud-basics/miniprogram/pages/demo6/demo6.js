// pages/demo6/demo6.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    urlArr: [],
    filePaths: []
  },
  /**
   * 上传文件
   */
  pull() {
    wx.chooseImage({
      count: 9 // 最多可以选择多少张默认值9
    }).then(res => {
      console.log(res)
      this.data.filePaths = res.tempFilePaths
      let now = Date.now()
      this.data.filePaths.forEach((item, index) => {
        let fileName = now + '_' + index
        this.uploadFile(fileName, item)
      })
    })
  },
  /**
   * 上传图片方法
   * @param {图片地址} path
   */
  uploadFile(fileName, path) {
    wx.cloud
      .uploadFile({
        cloudPath: fileName,
        filePath: path
      })
      .then(res => {
        console.log(res)
        this.data.urlArr.push(res.fileID)
        if (this.data.filePaths.length === this.data.urlArr.length) {
          this.setData({
            urlArr: this.data.urlArr
          })
        }
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
