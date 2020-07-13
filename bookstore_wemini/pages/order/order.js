// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
orders:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.getOrder();
  },

  getOrder: function () {
    var that = this;
    console.log('getOrder');
    let user = JSON.parse(wx.getStorageSync('user'));
    let userId = user.userId;
    wx.request({
      url: 'http://localhost:8080/getOrders',
      method: "POST",
      data: {
        userId: userId,
      },
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        console.log(res.data);
        res.data.sort(function (a, b) {
          if (a.time > b.time) {
            return -1;
          } else if (a.time == b.time) {
            return 0;
          } else {
            return 1;
          }
        })
        that.setData({
          orders: res.data,
        })
      }
    });
  },
})