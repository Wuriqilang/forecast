//获取应用实例
const app = getApp();
//调用日期组件
import utils from '../../../utils/util.js'
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    paddingCount: 0,
    alreadyCount: 0,
    alertCount: 0,
    iconList: [{
      icon: 'list',
      color: 'white',
      badge: 0,
      name: '进行中',
      type: 2,
      url: 'detail2'
    }, {
      icon: 'check',
      color: 'white',
      badge: 0,
      name: '已完成',
      type: 1,
      url: 'detail2'
    }, {
      icon: 'notice',
      color: 'white',
      badge: 0,
      name: '提醒',
      type: 3,
      url: 'detail2'
    }, {
      icon: 'comment',
      color: 'white',
      badge: 0,
      name: '通知',
      url: 'notice'
    },],
    dayStyle: [
    ],
    dataList: [], date: '',
    forecastInform: []
  },
  //生命周期函数
  attached() {
    //日期初始化
    this.setData({
      date: utils.formatTimeToMonth(new Date()),
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
    SubmitForecast(e) {
      var forecastInform = e.target.dataset.target;
      wx.navigateTo({
        url: "/pages/add/addPage/addPage?Nashuirenmingcheng=" + forecastInform.Nashuirenmingcheng + '&id=' + forecastInform.id + '&date=' + this.data.date
      })
    },
  }


})