// custom-tab-bar/index.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../store/store'
Component({
  // store
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      sum: 'sum',
      active: 'activeTabBarIndex'
    },
    actions: {
      updateActiveTabBarIndex: 'updateActiveTabBarIndex'
    }
  },
  options: {
    // van组件样式覆盖的时候需开启
    styleIsolation: 'shared'
  },
  observers: {
    // 监听sum变化，变化之后为list的info属性赋值
    'sum': function(val) {
      this.setData({
        'list[1].info': val
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      {
        "pagePath": "/pages/home/home",
        "text": "首页",
        "iconPath": "/images/tabs/home.png",
        "selectedIconPath": "/images/tabs/home-active.png"
      },
      {
        "pagePath": "/pages/message/message",
        "text": "消息",
        "iconPath": "/images/tabs/message.png",
        "selectedIconPath": "/images/tabs/message-active.png",
        info: 3
      },
      {
        "pagePath": "/pages/contact/contact",
        "text": "联系我们",
        "iconPath": "/images/tabs/contact.png",
        "selectedIconPath": "/images/tabs/contact-active.png"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // tabbar变化时，跳转路径
    onChange(event) {
      // 更新tabbar选中的索引
      this.updateActiveTabBarIndex(event.detail)
      // 跳转路径
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    },
  }
})
