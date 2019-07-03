//获取应用实例
const app = getApp();
//调用方法组
var query = require('../../../utils/query.js');


Page({
  options: {
    addGlobalClass: true,
  },
  data: {

    TabCur: 0,
    scrollLeft: 0,
    index: null,
    picker: ['所有人', '管理员',],
    textareaAValue: '',
    porperty: '',
    img: []
  },
  //组件创建时，获取数据
  onLoad() {
    let that = this;
    // 获取消息信息
    wx.request({
      url: app.globalData.BaseURL + 'message/forecast/admin', //真实的接口地址
      data: {},
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res);
        if (res.data == 'No Session') {
          wx.navigateTo({
            url: '/pages/welcome/home/home',
          })
        }
        else {
          console.log(res.data);
          var messageData = res.data;
          that.setData({
            Message: res.data //设置数据
          })

        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  formBindSubmit(e) {
    console.log(e.detail.value);
    //为部门重新赋值
    e.detail.value.messageTo = this.data.picker[e.detail.value.messageTo];
    var messageTo = 'admin';
    if (e.detail.value.messageTo == '所有人') {
      messageTo = 'all';
    }
    var that = this;
    setTimeout(function () {
      query.MessageSubmit('admin', messageTo, e.detail.value.messageContext, '通知','forecast')
    }, 1000);
    wx.showToast({
      title: '公告发布成功!',
    }, 2000)
    // 获取消息信息
    wx.request({
      url: app.globalData.BaseURL + 'message/forecast/' + app.globalData.user.userID, //真实的接口地址
      data: {},
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res);
        if (res.data == 'No Session') {
          wx.navigateTo({
            url: '/pages/welcome/home/home',
          })
        }
        else {
          console.log(res.data);
          var messageData = res.data;
          that.setData({
            Message: res.data //设置数据
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
    this.setData({
      TabCur:0
    })
  },

  methods: {
    onShareAppMessage() {
      return {
        title: 'ColorUI-高颜值的小程序UI组件库',
        imageUrl: 'https://image.weilanwl.com/color2.0/share2215.jpg',
        path: '/pages/basics/home/home'
      }
    },
  },
})