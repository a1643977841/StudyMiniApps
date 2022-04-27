const myBehavior = require('../../behavior/my-behavior')
const myBehaviors = require("../../behavior/my-behavior")

Component({
  // 导入的behavior实例放进来
  behaviors: [myBehaviors],
  data: {
    username: 'ls'
  },
  properties: {
    count: Number
  },
  methods: {
    addCount() {
      this.setData({
        count: this.properties.count + 1
      })
      // 调用父组件方法
      this.triggerEvent('sync', {value: this.properties.count})
    }
  }
})