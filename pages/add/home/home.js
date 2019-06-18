// pages/add/home/home.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {
    date: '2019-01-01',
    date2: '2020-01-01',
    martisClock:""
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
    DateChange(e) {
      this.setData({
        date: e.detail.value
      })
    },
    textareaAInput(e) {
      this.setData({
        textareaAValue: e.detail.value
      })
    }, formBindSubmit(e) {
      console.log(e.detail.value);
      var that = this;
      setTimeout(function () {
        wx.request({
          method: 'POST',
          url: app.globalData.BaseURL + 'martisClock/martisClockSubmit', //接口地址
          data: e.detail.value,
          header: { 'content-type': 'application/json' },
          success: function (res) {
            console.log(res);
            if (res.statusCode == 200) {
              wx.showToast({
                title: res.data.code,
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }, 2000)
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
      }, 1000);
    },
	}
})
