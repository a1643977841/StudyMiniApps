Component({
  data: {
    n1: 0,
    n2: 0,
    sum: 0
  },
  properties: {},
  methods: {
    /**
     * n1+1
     */
    addN1() {
      this.setData({
        n1: this.data.n1 + 1
      })
    },
    /**
     * n2+1
     */
    addN2() {
      this.setData({
        n2: this.data.n2 + 1
      })
    }
  },
  // 数据监听器
  observers: {
    'n1, n2': function(n1, n2) {
      // 参数n1和n2是改变后的新值
      this.setData({
        sum: n1 + n2 // 计算sum值
      })
    }
  }
})