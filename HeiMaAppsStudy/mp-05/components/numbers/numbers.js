import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      numA: () => store.numA, // 第一种方式
      numB: (store) => store.numB,// 第二种方式
      sum: 'sum' // 第三种方式
    },
    actions: {
      updateNumB: 'updateNumB'
    }
  },
  data: {},
  properties: {},
  methods: {
    btnHandler2(e) {
      this.updateNumB(e.target.dataset.step)
    }
  }
})