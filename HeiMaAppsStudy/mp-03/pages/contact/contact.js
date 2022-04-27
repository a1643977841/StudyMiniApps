// pages/contact/contact.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        colorList: [],
        isLoading: false // false可以发起网络数据请求
    },
    getColors() {
        // 设置节流阀
        this.setData({
            isLoading: true
        })
        // 展示loading
        wx.showLoading({
          title: '数据加载中',
        })
        wx.request({
          url: 'https://www.escook.cn/api/color',
          method: 'GET',
          success: ({data: res}) => {
            console.log(res)
            this.setData({
                colorList: [...this.data.colorList, ...res.data]
            })
          },
          complete: () => {
              // 关闭loading效果
              wx.hideLoading()
              // 关闭节流阀
              this.setData({
                  isLoading: false
              })
          }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getColors()
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
        console.log(this.data.isLoading)
        if(!this.data.isLoading) {
            // 获取下一页颜色
            this.getColors()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})