// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    /**
     * get请求
     */
    getRequest() {
        wx.request({
          url: 'https://www.escook.cn/api/get',
          method: 'GET',
          data: {
              name: 'zs',
              age: 22
          },
          success: (res) => {
              console.log(res)
          }
        })
    },
    /**
     * post请求
     */
    postRequest() {
        wx.request({
            url: 'https://www.escook.cn/api/post',
            method: 'POST',// 请求方式
            data: { // 参数
                name: 'ls',
                gender: '男'
            },
            success: (res) => {// 请求成功的回调
                console.log(res)
            }
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getRequest()
        this.postRequest()
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