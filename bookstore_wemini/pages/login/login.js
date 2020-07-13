// pages/login/login.js

const app = getApp()

Page({
  // 页面的初始数据
  data: {
    username:"",
    password:"",
    errorMessage:"",
  },

  /**
   * 输入用户名
   **/
  bindUsernameInput: function(event){
    this.setData({username : event.detail.value})
    console.log(event.detail.value);
  },

  /**
   * 输入用户名
   **/
  bindPasswordInput: function(event){
    this.setData({password : event.detail.value})
    console.log(event.detail.value);
  },

  /**
   * 登录
   **/
  login: function() {
    console.log("login");
    wx.request({
      url: 'http://localhost:8080/login', 
      method: "POST",
      data: {
        username: this.data.username,
        password: this.data.password
      },
      header: {
        'content-type': 'application/json',
      },
      success(res) {
        if(res.data.status >= 0){
          if(res.data.data.userType == -1){
            wx.showModal({
              cancelColor: 'cancelColor',
              title: "登录失败！",
              content: "您的账户已被禁用！"
            })
            console.log(res);
          }
          else{
            wx.showToast({
              title: '登录成功！',
              icon: 'success',
              duration: 2000
            })
            console.log(res);
            app.globalData.userLogged = true;
            wx.setStorageSync('user', JSON.stringify(res.data.data));
            wx.navigateTo({
              url: '../book/book',
            })
          }
        }else{
          wx.showModal({
            cancelColor: 'cancelColor',
            title: "登录失败！",
            content: "用户名或密码错误"
          })
          console.log(res);
        }
      }
    }); 
  },
})