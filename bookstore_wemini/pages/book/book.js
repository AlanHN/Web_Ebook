// pages/book/book.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    showBooks: [],
    books: [],
    cart: [],
    orders: [],
    "carouselImgUrls": [{
      "url": "../../asserts/carousel/book1.jpg"
    }, {
      "url": "../../asserts/carousel/book2.jpg"
    }, {
      "url": "../../asserts/carousel/book3.jpg"
    }, {
      "url": "../../asserts/carousel/book4.jpg"
    }],
    active:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!app.globalData.userLogged) {
      wx.navigateTo({
        url: '../login/login'
      })
    } else {
      wx.request({
        url: 'http://localhost:8080/getBooks',
        method: "POST",
        data: {},
        header: {
          'content-type': 'application/json',
        },
        success(res) {
          console.log(res);
          that.setData({
            books: res.data,
            showBooks: res.data,
          })
        }
      });
    }
  },

  //点击书籍
  bindViewTap: function (event) {
    wx.navigateTo({
      url: '../bookDetail/bookDetail?id=' + event.currentTarget.dataset.book.bookId
    })
  },

  //搜索框
  searchChange(e) {
    console.log("change");
    this.setData({
      searchValue: e.detail,
    });
    let arr = [];
    let list = this.data.books;
    let search = this.data.searchValue;
    for (let i = 0; i < list.length; i++) {
      if (
        list[i].title.indexOf(search) >= 0 ||
        list[i].type.indexOf(search) >= 0 ||
        list[i].author.indexOf(search) >= 0 ||
        list[i].description.indexOf(search) >= 0
      ) {
        arr.push(list[i]);
      }
    };
    this.setData({
      showBooks: arr
    });
  },
})