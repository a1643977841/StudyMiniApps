Component({
  data: {
      count: 0
  },
  properties: {
    max: Number, // 简化方式，无法指定默认值
    max1: { // 完整方式
      type: Number,
      value: 10
    }
  },
  methods: {
    /**
     * count + 1
     * 事件处理函数
     */
    addCount() {
      if(this.properties.max == this.data.count) {
        return 
      }
      this.setData({
        count: this.data.count + 1,
        max: this.properties.max + 1
      })
      this._showConut()
    },
    /**
     * 自定义方法建议都以下划线开头
     */
    _showConut() {
      wx.showToast({
        title: 'count的值是' + this.data.count,
        icon: 'none'
      })
    },
    /**
     * 本质上data和properties是同一个对象,都是可读可写
     */
    showInfo() {
      console.log(this.properties)
      console.log(this.data)
      console.log(this.properties === this.data)
    }
  }
})