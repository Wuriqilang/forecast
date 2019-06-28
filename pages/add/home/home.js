// pages/add/home/home.js
const app = getApp();
//调用日期组件
import utils from '../../../utils/util.js'
Component({
  options: {
    addGlobalClass: true,
  },
	/**
	 * 组件的初始数据
	 */
	data: {

	},
  //生命周期函数
  attached(){
    
  },
	/**
	 * 组件的方法列表
	 */
	methods: {
    DateChange(e) {
      this.setData({
        date: e.detail.value,
        year:e.detail.value.substring(0,4),
        month:e.detail.value.substr(5,2)
      })
    },
    forecastNameChange(e){

    },
    textareaAInput(e) {
      this.setData({
        textareaAValue: e.detail.value
      })
    }, 
    formBindSubmit(e) {
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
