// pages/shopList/shopList.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listParme: {},
    shopList: [], // 数据List
    page: 1, // 当前第几页
    pageSize: 10, // 每夜多少条
    total: 0, // 总数据条数
    isLoading: false, // 节流阀 false可以发送请求
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    // 存入data
    this.setData({
      listParme: options,
    });
    this.getShopList();
  },
  /**
   * 获取页面数据
   * @param {回调函数} cb
   */
  getShopList(cb) {
    // 设置节流阀
    this.setData({
      isLoading: true,
    });
    // 设置提示
    wx.showLoading({
      title: "数据加载中。。。",
    });
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.listParme.id}/shops`,
      method: "GET",
      data: {
        _page: this.data.page,
        _limit: this.data.pageSize,
      },
      success: (res) => {
        console.log(res);
        this.setData({
          shopList: [...this.data.shopList, ...res.data],
          total: res.header["X-Total-Count"] - 0,
        });
      },
      complete: () => {
        // 关闭提示
        wx.hideLoading();
        // 关闭节流阀
        this.setData({
          isLoading: false,
        });
        cb && cb();
      },
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.listParme.title,
    });
  },

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
  onPullDownRefresh() {
    // 下拉刷新
    this.setData({
      page: 1,
      shopList: [],
      total: 0,
    });
    // 重新获取数据，并且关闭下拉刷新
    this.getShopList(() => {
        wx.stopPullDownRefresh();
      });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.page * this.data.pageSize >= this.data.total) {
      return wx.showToast({
        title: "数据加载完毕！",
        icon: "none",
      });
    }
    // 如果当前请求未完成不发起
    if (this.data.isLoading) return;
    this.setData({
      page: this.data.page + 1,
    });
    // 调用获取数据
    this.getShopList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
