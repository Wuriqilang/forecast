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
      name: '已填报',
      type: 2,
      url: 'already'
    }, {
      icon: 'check',
      color: 'white',
      badge: 0,
      name: '未填报',
      type: 1,
      url: 'padding'
    }, {
      icon: 'notice',
      color: 'white',
      badge: 0,
      name: '统计',
      type: 3,
      url: 'summary'
    }, {
      icon: 'comment',
      color: 'white',
      badge: 0,
      name: '通知',
      url: 'notice'
    },],
    dayStyle: [
    ],
    dataList: [], 
		date: '',
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
		this.DataUpdate();
  },

  methods: {
		DataUpdate(){
			var that = this;
			wx.request({
				url: app.globalData.BaseURL + 'forecastInform/' + this.data.date,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': `Bearer ${app.globalData.token}`
				},
				success: res => {
					var alreadyCount=0;
					var paddingCount=0;
					for (let i of res.data) {
						if (i.forecastID){
							alreadyCount++
						}else{
							paddingCount++
						}
					}
					console.log(alreadyCount);
					let alreadyCountBadge = `iconList[0].badge`;
					let paddingCountBadge = `iconList[1].badge`;
					//获取已经添加的数量,获取未添加的数量
					this.setData({
						forecastInform: res.data,
						[alreadyCountBadge]:alreadyCount,
						[paddingCountBadge]:paddingCount
					})
				}
			})
		},
    DateChange(e) {
      this.setData({
        date: e.detail.value,
      })
      //获取列表
      //==========单位初始化==================
      this.DataUpdate();
    },
    SubmitForecast(e) {
      var forecastInform = e.target.dataset.target;
      wx.navigateTo({
        url: "/pages/add/addPage/addPage?Nashuirenmingcheng=" + forecastInform.Nashuirenmingcheng + '&id=' + forecastInform.id + '&date=' + this.data.date
      })
    },
		forecastDetail(e){
			var forecastInform = e.target.dataset.target;
			wx.navigateTo({
				url: "/pages/basics/detail/detail?Nashuirenmingcheng=" + forecastInform.Nashuirenmingcheng + '&id=' + forecastInform.id + '&date=' + this.data.date+ '&forecastID=' + forecastInform.forecastID
			})
		}
  }


})