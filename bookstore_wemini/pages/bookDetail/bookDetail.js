// pages/bookDetail/bookDetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    book:'',
    buyShow: false,
    addCartShow: false,
    value:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var bookId = options.id;
    console.log(bookId);
    var that = this;
    wx.request({
      url: 'http://localhost:8080/getBook?id='+bookId,
      method: "POST",
        data: {
        },
        header: {
          'content-type': 'application/json',
        },
        success(res) {
          console.log(res);
          that.setData({
            book: res.data
          })
        }
      });
  },

  clickAddCart: function(){
    this.setData({addCartShow: true});
  },

  clickBuy: function(){
    this.setData({buyShow: true});
  },

  changeValue(event) {
    console.log(event.detail);
    this.setData({value: event.detail});
  },

  addCart: function(event){
     console.log('addCart');
     let user = JSON.parse(wx.getStorageSync('user'));
     let userId = user.userId;
     wx.request({
      url: 'http://localhost:8080/addCart', 
      method: "POST",
      data: {
        userId: userId,
        bookId: this.data.book.bookId,
        bookNumber: this.data.value,
        bookPrice:this.data.book.price,
      },
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        wx.showToast({
          title: '加入成功！',
          icon: 'success',
          duration: 2000
        })
      }
    }); 
  },

  buyNow: function(event){
    console.log('buyNow');
    let user = JSON.parse(wx.getStorageSync('user'));
    let userId = user.userId;
    let items=[];
    let book= this.data.book;
    let bookId = book.bookId;
    let bookNumber = this.data.value;
    let bookPrice = book.price;
    let newN = book.stock-bookNumber;
    book.stock = newN;
    this.setData({book: book});
    items[0] = {bookId: bookId, number: bookNumber, bookPrice: bookPrice};
    let json = {
      userId: userId,
      items: items
  };
    wx.request({
     url: 'http://localhost:8080/addOrder', 
     method: "POST",
     data: JSON.stringify(json),
     header: {
       'content-type': 'application/json',
     },
     success(res) {
       wx.showToast({
         title: '购买成功！',
         icon: 'success',
         duration: 2000
       })
     }
   }); 
  }
})