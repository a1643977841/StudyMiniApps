Component({
  options: {
    pureDataPattern: /^_/ // 指定所有以下划线开头的属性为纯数据字段
  }
  ,
  data: {
    // 改造rgb为纯数据字段
    _rgb: {
      r: 0,
      g: 0,
      b: 0
    },
    fullColor: '0, 0, 0'
  },
  properties: {},
  methods: {
    changeR() {
      this.setData({
        '_rgb.r': this.data._rgb.r + 5 > 255? 255 : this.data._rgb.r + 5
      })
    },
    changeG() {
      this.setData({
        '_rgb.g': this.data._rgb.g + 5 > 255? 255 : this.data._rgb.g + 5
      })
    },
    changeB() {
      this.setData({
        '_rgb.b': this.data._rgb.b + 5 > 255? 255 : this.data._rgb.b + 5
      })
    },
    /**
     * 随机生成rgb颜色
     */
    _randomColor() {
      this.setData({
        _rgb: {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256)
        }
      })
    }
  },
  observers: {
    '_rgb.**': function(rgb) {
      this.setData({
        fullColor: `${rgb.r}, ${rgb.g}, ${rgb.b}`
      })
    }
  },
  // 组件生命周期函数
  lifetimes: {
    /**
     * 组件实例 刚被创建好 的时候， created 生命周期函数会被触发
     * 此时还不能调用 setData
     * 通常在这个生命周期函数中，只应该用于给组件的 this 添加一些自定义的属性字段
     */
    created() {
      console.log('created')
    },
    /**
     * 在组件 完全初始化完毕、进入页面节点树后 ， attached 生命周期函数会被触发
     * 此时， this.data 已完全初始化完毕
     * 这个生命周期很有用，绝大多数初始化的工作可以在这个时机进行（例如发请求获取初始数据）
     */
    attached() {
      console.log('attached')
    },
    /**
     *  在组件 离开页面节点树后 ， detached 生命周期函数会被触发
     * 退出一个页面时，会触发页面内每个自定义组件的 detached 生命周期函数
     * 此时适合做一些清理性质的工作
     */
    detached() {
      console.log('detached')
    }
  },
  pageLifetimes: {
    /**
     * 页面展示时
     */
    show: function() {
      console.log('show')
      // 页面展示时随机生成RGB颜色
      this._randomColor()
    },
    hide: function() {console.log('hide')},// 页面隐藏时
    resize: function() {console.log('resize')}// 页面尺寸变化
  }
})