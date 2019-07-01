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
    date: '',
    forecastInform:[]
	},
  //生命周期函数
  attached(){
    //日期初始化
    this.setData({
      date: utils.formatTimeToMonth(new Date()),
    })
    //获取列表
    //==========单位初始化==================
    var that = this;
    wx.request({
      url: app.globalData.BaseURL + 'forecastInform/'+this.data.date,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${app.globalData.token}`
      },
      success: res => {
        console.log(res.data)
        this.setData({
          forecastInform: res.data,
        })
      }
    })
  },
	/**
	 * 组件的方法列表
	 */
	methods: {
    DateChange(e) {
      this.setData({
        date: e.detail.value,
      })
      //获取列表
      //==========单位初始化==================
      var that = this;
      wx.request({
        url: app.globalData.BaseURL + 'forecastInform/' + this.data.date,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${app.globalData.token}`
        },
        success: res => {
          console.log(res.data)
          this.setData({
            forecastInform: res.data,
          })
        }
      })
    },
    SubmitForecast(e){
      var forecastInform = e.target.dataset.target;
      wx.navigateTo({
        url: "/pages/add/addPage/addPage?Nashuirenmingcheng="+forecastInform.Nashuirenmingcheng+'&id='+forecastInform.id+'&date='+this.data.date
      })
    },
	}
})
