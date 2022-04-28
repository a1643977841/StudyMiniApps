import {action, observable} from 'mobx-miniprogram'
// 创建store
export const store = observable({
  numA: 1,
  numB: 2,
  activeTabBarIndex: 0,// tabbar的选中的索引
  // 计算属性 get代表只读
  get sum() {
    return this.numA + this.numB
  },
  // action方法，专门用来修改store中的属性
  updateNumA: action(function(step) {
    this.numA += step
  }),
  updateNumB: action(function(step) {
    this.numB += step
  }),
  updateActiveTabBarIndex: action(function(index) {
    this.activeTabBarIndex = index
  })
})