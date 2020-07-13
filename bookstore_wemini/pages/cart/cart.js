// pages/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      cart:[],
      sum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCart();
  },

  getCart: function () {
    var that = this;
    console.log('getCart');
    let user = JSON.parse(wx.getStorageSync('user'));
    let userId = user.userId;
    wx.request({
      url: 'http://localhost:8080/getCart',
      method: "POST",
      data: {
        userId: userId,
      },
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        console.log(res.data);
        let tmp=0
        for(let i=0;i<res.data.length;i++)
        {
          tmp += res.data[i].bookNumber*res.data[i].bookPrice;
        }
        that.setData({
          cart: res.data,
          sum:tmp.toFixed(1),
        })
      }
    });
  },

  addOne: function(event){
    var that = this;
    console.log('addOne');
    let item = event.currentTarget.dataset.item;
    let itemId = item.itemId;
    let oldNumber = item.bookNumber;
    let newNumber = oldNumber + 1;
    wx.request({
     url: 'http://localhost:8080/editCartItemNumber', 
     method: "POST",
     data: {
       itemId: itemId,
       bookNumber: newNumber,
     },
     header: {
       'content-type': 'application/json',
     },
     success(res) {
       wx.showToast({
         title: '更改成功！',
         icon: 'success',
         duration: 2000
       })
       that.getCart();
     }
   }); 
 },

 minusOne: function(event){
  var that = this;
  console.log('minusOne');
  let item = event.currentTarget.dataset.item;
  let itemId = item.itemId;
  let oldNumber = item.bookNumber;
  let newNumber = oldNumber - 1;
  if(newNumber<=0)
  {
    wx.showToast({
      image:"/asserts/pictures/error.png",
      title: '数量太少啦！',
      duration: 2000
    })
    return;
  }
  wx.request({
   url: 'http://localhost:8080/editCartItemNumber', 
   method: "POST",
   data: {
     itemId: itemId,
     bookNumber: newNumber,
   },
   header: {
     'content-type': 'application/json',
   },
   success(res) {
     wx.showToast({
       title: '更改成功！',
       icon: 'success',
       duration: 2000
     })
     that.getCart();
   }
 }); 
},

deleteItem: function(event){
  var that = this;
  console.log('deleteItem');
  let item = event.currentTarget.dataset.item;
  let itemId = item.itemId;
  wx.request({
   url: 'http://localhost:8080/delCartItem', 
   method: "POST",
   data: {
     id: itemId,
   },
   header: {
     'content-type': 'application/json',
   },
   success(res) {
     wx.showToast({
       title: '删除成功！',
       icon: 'success',
       duration: 2000
     })
     that.getCart();
   }
 }); 
},

deleteCartItem: function(id){
  wx.request({
   url: 'http://localhost:8080/delCartItem', 
   method: "POST",
   data: {
     id: id,
   },
   header: {
     'content-type': 'application/json',
   },
   success(res) {
   }
 }); 
},

buyAll: function(event){
  var that = this;
  console.log('buyAll');
  let cart = this.data.cart;
  if(cart.length===0)
  {
    wx.showToast({
      image:"/asserts/pictures/error.png",
      title: '去挑一些书吧',
      duration: 2000
    })
    return;
  }
  let user = JSON.parse(wx.getStorageSync('user'));
  let userId = user.userId;
  let items = [];
  for (let item of cart){
    items.push({
      bookId: item.book.bookId,
      number: item.bookNumber,
      bookPrice:item.bookPrice
    });
    this.deleteCartItem(item.itemId);
  }
  console.log(items);
  wx.request({
   url: 'http://localhost:8080/addOrder', 
   method: "POST",
   data: {
     userId: userId,
     items: items
   },
   header: {
     'content-type': 'application/json',
   },
   success(res) {
     wx.showToast({
       title: '购买成功！',
       icon: 'success',
       duration: 2000
     })
     that.getCart();
   }
 }); 
},

})
