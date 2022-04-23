// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 通过编程式导航到tabBar页面
     */
    goToMessage() {
        wx.switchTab({
          url: '/pages/message/message',
          success: (s) => {
            // 跳转成功的回调
            console.log(s)
          },
          fail: (e) => {
            // 跳转失败的回调
            console.log(e)
          },
          complete: (c) => {
            // 成功与否都会调用
            console.log(c)
          }
        })
    },
    /**
     * 通过编制式导航跳转到非tabBar页面
     */
    goToInfo() {
        wx.navigateTo(({
            url: '/pages/info/info',
            success: (s) => {
              // 跳转成功的回调
              console.log(s)
            },
            fail: (e) => {
              // 跳转失败的回调
              console.log(e)
            },
            complete: (c) => {
              // 成功与否都会调用
              console.log(c)
            }
          })
        )
    },
    /**
     * 编程式携带参数跳转info
     */
    goToInfoParme() {
        wx.navigateTo(({
            url: '/pages/info/info?name=lh&age=23',
            success: (s) => {
              // 跳转成功的回调
              console.log(s)
            },
            fail: (e) => {
              // 跳转失败的回调
              console.log(e)
            },
            complete: (c) => {
              // 成功与否都会调用
              console.log(c)
            }
          })
        )
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