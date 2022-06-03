const db = wx.cloud.database()
const _ = db.command
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },
  update() {
    /**
     * 更新操作符
     * set()更新操作符，用于设定字段等于指定值
     * remove()更新操作符，用于表示删除某个字段
     * inc()更新操作符，原子操作，用于指示字段自增
     * mul()更新操作符，原子操作，用于指示字段自乘某个值
     * min()更新操作符，给定一个值，只有该值小于字段当前值才进行更新
     * max()更新操作符，给定一个值，只有该值大于字段当前值才进行更新
     * rename()更新操作符，字段重命名。如果需要对嵌套深层的字段做重命名，需要用点路径表示法。不能对嵌套在数组里的对象的字段进行重命名
     */
    db.collection('demolist')
      .doc('6d85a2b96294bfc607a7626d26bc1964')
      .update({
        data: {
          hits: _.inc(10) // 原子自增
        }
      })
      .then(res => {
        console.log('更新数据')
        console.log(res)
      })
    /**
     * push()数组更新操作符。对一个值为数组的字段，往数组添加一个或多个值。或字段原为空，则创建该字段并设数组为传入值。
     * pop()数组更新操作符，对一个值为数组的字段，将数组尾部元素删除
     * unshift() 数组更新操作符，对一个值为数组的字段，往数组头部添加一个或多个值。或字段原为空，则创建该字段并设数组为传入值
     * shift()数组更新操作符，对一个值为数组的字段，将数组头部元素删除。
     * pull() 数组更新操作符。给定一个值或一个查询条件，将数组中所有匹配给定值或查询条件的元素都移除掉。
     * pullAll() 数组更新操作符。给定一个值或一个查询条件，将数组中所有匹配给定值的元素都移除掉。跟 pull 的差别在于只能指定常量值、传入的是数组
     * addToSet()数组更新操作符。原子操作。给定一个或多个元素，除非数组中已存在该元素，否则添加进数组。
     */
    db.collection('demolist')
      .doc('6d85a2b96294bfc607a7626d26bc1964')
      .update({
        data: {
          tabs: _.push({
            each: ['新视觉'],
            position: 0
          })
        }
      })
      .then(res => {
        console.log('操作数组数据')
        console.log(res)
      })
  },
  getData() {
    /**
     * 比较操作符
     * eq 查询筛选条件，表示字段等于某个值。eq 指令接受一个字面量 (literal)，可以是 number, boolean, string, object, array, Date。
     * neq 查询筛选条件，表示字段不等于某个值。eq 指令接受一个字面量 (literal)，可以是 number, boolean, string, object, array, Date
     * lt 查询筛选操作符，表示需小于指定值。可以传入 Date 对象用于进行日期比较。
     * lte 查询筛选操作符，表示需小于或等于指定值。可以传入 Date 对象用于进行日期比较
     * gt 查询筛选操作符，表示需大于指定值。可以传入 Date 对象用于进行日期比较
     * gte 查询筛选操作符，表示需大于或等于指定值。可以传入 Date 对象用于进行日期比较
     * in 查询筛选操作符，表示要求值在给定的数组内。
     * nin 查询筛选操作符，表示要求值不在给定的数组内。
     * 字段操作符
     * exists 判断字段是否存在
     * mod 查询筛选操作符，给定除数 divisor 和余数 remainder，要求字段作为被除数时 value % divisor = remainder
     */
    db.collection('demolist')
      .where({
        hits: _.in([123])
      })
      .get()
      .then(res => {
        console.log('比较操作符')
        console.log(res)
        this.setData({
          dataList: res.data
        })
      })
    /**
     * 查询 逻辑操作符
     * and 查询操作符，用于表示逻辑 "与" 的关系，表示需同时满足多个查询筛选条件
     * or 查询操作符，用于表示逻辑 "或" 的关系，表示需同时满足多个查询筛选条件。或指令有两种用法，一是可以进行字段值的 “或” 操作，二是也可以进行跨字段的 “或” 操作
     * not 查询操作符，用于表示逻辑 "非" 的关系，表示需不满足指定的条件。
     * nor 查询操作符，用于表示逻辑 "都不" 的关系，表示需不满足指定的所有条件。如果记录中没有对应的字段，则默认满足条件。
     */
    db.collection('demolist')
      .where({
        // hits: _.and(_.gte(0), _.lte(90000000))
        hits: _.or(_.eq(32156), _.eq(123))
      })
      .get()
      .then(res => {
        console.log('逻辑操作符')
        console.log(res)
        this.setData({
          dataList: res.data
        })
      })
    // 多个字段连接
    db.collection('demolist')
      .where(
        _.or([
          {
            // hits: _.and(_.gte(0), _.lte(90000000))
            hits: _.or(_.eq(32156), _.eq(123))
          },
          {
            _id: _.eq('0a4ec1f96294c886079a10f95fda379e')
          }
        ])
      )
      .get()
      .then(res => {
        console.log('多个字段连接')
        console.log(res)
        this.setData({
          dataList: res.data
        })
      })
    /**
     * 查询数组操作符
     * all 数组查询操作符。用于数组字段的查询筛选条件，要求数组字段中包含给定数组的所有元素。
     * elemMatch 用于数组字段的查询筛选条件，要求数组中包含至少一个满足 elemMatch 给定的所有条件的元素
     * size 更新操作符，用于数组字段的查询筛选条件，要求数组长度为给定值
     */
    db.collection('demolist')
      .where({
        // tabs: _.size(1) // 要求数组长度为指定值
        tabs: _.all(['电器'])
      })
      .get()
      .then(res => {
        console.log('数组操作符')
        console.log(res)
        this.setData({
          dataList: res.data
        })
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
