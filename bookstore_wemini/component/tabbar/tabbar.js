// component/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      active: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    active:0,
    url:['/pages/book/book','/pages/cart/cart','/pages/order/order','/pages/login/login']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      console.log(event.detail);
      wx.redirectTo({
        url: this.data.url[event.detail],
      })
    },  
  }
})
