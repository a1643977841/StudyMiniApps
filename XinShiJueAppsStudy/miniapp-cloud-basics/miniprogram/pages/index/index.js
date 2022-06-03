const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataObj: []
  },
  /**
   * 点击表单提交
   * @param {*} res 提交数据
   */
  btnSub(res) {
    // let title = res.detail.value.title
    // let author = res.detail.value.author
    // let content = res.detail.value.content
    let tabsData = ['数码', '智能', '科技', '电子', '财经', '网络', '置顶', '平板']
    let { title, author, content } = res.detail.value
    db.collection('demolist')
      .add({
        // 可以直接把对象给data
        data: {
          title: title,
          author: author,
          content: content,
          date: new Date(),
          hibs: Math.round(Math.random() * 1000),
          tabs: [tabsData[Math.round(Math.random() * tabsData.length)], tabsData[Math.round(Math.random() * tabsData.length)]]
        }
      })
      .then(res => {
        // 返回的插入的成功后的数据id
        console.log(res)
      })
  },
  /**
   * 插入一条数据
   */
  add() {
    db.collection('demolist')
      .add({
        data: {
          title: '测试title3',
          author: '张三',
          content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容'
        }
      })
      .then(res => {
        // 返回的插入的成功后的数据id
        console.log(res)
      })
  },
  /**
   * 获取数据
   */
  getData() {
    // db.collection('demolist').get().then(res => {
    //   console.log(res)
    //   this.setData({
    //     dataObj: res.data
    //   })
    // })
    db.collection('demolist')
      .where({
        author: '阿浩'
      })
      .get()
      .then(res => {
        console.log(res)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
