Component({
  data: {
      count: 0
  },
  properties: {},
  methods: {
    addCount() {
      this.setData({
        count: this.data.count + 1
      })
      this._showConut()
    },
    _showConut() {
    
    }
  }
})