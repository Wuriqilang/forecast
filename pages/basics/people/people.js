const app = getApp();
Page({
  data: {
    pickerIndex: null,
    picker: ['办公室', '收入核算股', '征收管理股', '税源管理股', '党建工作股', '纪检组', '纳税服务股', '税政股', '劳务外聘', '物业公司'],
  },
  onLoad() {
    console.log('onLoad')
    var that = this
    wx.request({
      url: app.globalData.BaseURL+'getUsers' , //真实的接口地址
      data: {},
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data == 'No Session') {
          wx.navigateTo({
            url: '/pages/welcome/home/home',
          })
        }
        else {
          let dataList = res.data; //获取到的数据
          dataList.forEach((item) => {
            item.createdAt = item.createdAt.substring(0, 10); //要截取字段的字符串
          })
          that.setData({
            People: res.data //设置数据
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  showModal(e) {
    console.log(e);
    e.target.dataset.target.none='';
    this.setData({
      modalType: '用户编辑',
      modalData: e.target.dataset.target
    })
  },
  showModal2(e) {
    console.log(e);
    this.setData({
      modalType: '添加用户',
      modalData: e.target.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalType: null,
      pickerIndex:null,
      modalData: null,
    })
  },

  submitModal(e) {
    //为部门重新赋值
    if (this.data.pickerIndex){
      console.log(this.data.pickerIndex)
      e.detail.value.department = this.data.picker[e.detail.value.department];
    }
    else{
      e.detail.value.department = e.detail.target.dataset.target.department;
    }
    
    if(e.detail.value.password==''){
      e.detail.value.password=e.detail.target.dataset.target.password;
    }
    var modalData = e.detail.value;
    console.log(modalData)
    //将信息处理为信息流，发送给后端
    var that =this;
    wx.request({
      method: 'POST',
      url: app.globalData.BaseURL+'ChangePeople', //接口地址
      data: modalData,
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: res.data.result,
            icon: 'success',
            duration: 2000
          })
        }
        else {
          wx.showToast({
            title: '失败，请注意输入格式！',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        console.log('Error' + ':' + res)
      }
    })
    this.setData({
      modalType: null,
      pickerIndex: null,
      modalName: null
    })
    setTimeout(function () {
      that.onLoad()}, 500)
    
  },

  submitModal2(e) {
    //为部门重新赋值
    e.detail.value.department = this.data.picker[e.detail.value.department];

    var modalData = e.detail.value;
    console.log(modalData)
    //将信息处理为信息流，发送给后端
    var that = this;
    wx.request({
      method: 'POST',
      url: app.globalData.BaseURL+'SubmitPeople', //接口地址
      data: modalData,
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: res.data.result,
            icon: 'success',
            duration: 2000
          })
        }
        else {
          wx.showToast({
            title: '失败，请注意输入格式！',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        console.log('Error' + ':' + res)
      }
    })
    this.setData({
      modalType: null,
      pickerIndex: null,
      modalName: null
    })
    setTimeout(function () {
      that.onLoad()
    }, 500)

  },

  DeletePeople(e) {
    //判断用户
    if (app.globalData.user.userID == 'admin') {
      var that =this;
      wx.showModal({
        title: '提醒',
        content: '确定要删除该用户吗？',
        cancelText: '取消',
        confirmText: '确定',
        success: res => {
          if (res.confirm) {
            wx.request({
              method: 'POST',
              url: app.globalData.BaseURL+'DeletePeople',
              data: { userID: e.target.dataset.target.userID },
              header: { 'content-type': 'application/json' },
              success: function (res) {
                if (res.statusCode == 200) {
                  wx.showToast({
                    title: res.data.result,
                    icon: 'success',
                    duration: 2000
                  })
                  setTimeout(function () {
                    that.onLoad()
                  }, 500)
                }
                else {
                  wx.showToast({
                    title: '操作失败，请联系管理员',
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
          }
        }
      })

    } else {
      wx.showToast({
        title: '您并非管理员!',
        icon: 'none'
      }, 1000)
    }
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  PickerChange(e) {
    this.setData({
      pickerIndex: e.detail.value
    })
  },

})