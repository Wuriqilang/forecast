//获取应用实例
const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    paddingCount:0,
    alreadyCount:0,
    alertCount:0,
    iconList: [{
      icon: 'list',
      color: 'white',
      badge: 0,
      name: '进行中',
      type:2,
      url:'detail2'
    }, {
      icon: 'check',
      color: 'white',
      badge: 0,
      name: '已完成',
      type:1,
      url: 'detail2'
    }, {
      icon: 'notice',
      color: 'white',
      badge: 0,
      name: '提醒',
      type:3,
      url:'detail2'
    }, {
      icon: 'comment',
      color: 'white',
      badge: 0,
      name: '通知',
      url:'notice'
    }, ],
    dayStyle: [
    ],
		dataList:[],
  },
  //组件创建时，获取数据,获取当前数据
  created() {
    let that = this;
    // 获取消息信息
    wx.request({
      url: app.globalData.BaseURL + 'martisClock/' + app.globalData.user.userID,
        //真实的接口地址
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Bearer ${app.globalData.token}`
      },
      success: function(res) {
        console.log(res.data);
				if (res.data == 'No Token' || res.data=='token过期') {
					wx.showToast({
						title: '登陆超时，请重新登陆',
						duration: 2000
					})
          wx.navigateTo({
            url: '/pages/welcome/home/home',
          })
        } else {
          var dayData = new Array();
          var completedCount=0;
          var paddingCount=0;
          var alertCount=0;
          for (var i = 0; i < res.data.length; i++) {
            if (new Date(res.data[i].martisClockDate).getMonth() == new Date().getMonth()) {
              //将内容数据转换为对象
              dayData.push({
                month: 'current',
                day: new Date(res.data[i].martisClockDate).getDate(),
                color: 'white',
                background: '#DC143C'
              })
            }
            if(res.data[i].martisClockComplete){
              completedCount++;
            }else{
              paddingCount++;
              if (res.data[i].martisClockMargin<=res.data[i].martisClockAlert){
                alertCount++;
              }
            }
          }

          let paddingCountBadge = `iconList[0].badge`;
          let alreadyCountBadge = `iconList[1].badge`;
          let alertCountBadge = `iconList[2].badge`;

          that.setData({
            dayStyle: dayData,
						dataList: res.data,
            [paddingCountBadge]:paddingCount,
            [alreadyCountBadge]: completedCount,
            [alertCountBadge]: alertCount,
          })
          if(alertCount>0){
            wx.showToast({
              title: '有'+alertCount+'项任务提醒',
              image:'/images/tabbar/about.png'
            })
          }
        }
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  methods: {
     dayClick: function (event) {
			 wx.navigateTo({
				 url: '/pages/basics/detail/detail?dataObj=' + JSON.stringify(event.detail),
			 })
     },
		//前一个月
		prev: function (event) {
			var tempData = this.data.dataList;
			var dayData = new Array();
			for (var i = 0; i < tempData.length; i++) {
				if (new Date(tempData[i].martisClockDate).getMonth()+1 == event.detail.currentMonth && new Date(tempData[i].martisClockDate).getFullYear() == event.detail.currentYear) {
					//将内容数据转换为对象
					dayData.push({
						month: 'current',
						day: new Date(tempData[i].martisClockDate).getDate(),
						color: 'white',
            background: '#DC143C'
					})
				}
			}
			this.setData({
				dayStyle: dayData
			})
		},
		//下一个月
		next: function (event) {
      var tempData = this.data.dataList;
			var dayData = new Array();
			for (var i = 0; i < tempData.length; i++) {
				if (new Date(tempData[i].martisClockDate).getMonth()+1 == event.detail.currentMonth && new Date(tempData[i].martisClockDate).getFullYear() == event.detail.currentYear) {
					//将内容数据转换为对象
					dayData.push({
						month: 'current',
						day: new Date(tempData[i].martisClockDate).getDate(),
						color: 'white',
            background: '#DC143C'
					})
				}
			}
			this.setData({
				dayStyle: dayData
			})
		},
		//选择月份
		dateChange: function (event) {
			var tempData = this.data.dataList;
			var dayData = new Array();
			for (var i = 0; i < tempData.length; i++) {
				if (new Date(tempData[i].martisClockDate).getMonth()+1 == event.detail.currentMonth && new Date(tempData[i].martisClockDate).getFullYear() == event.detail.currentYear) {
					//将内容数据转换为对象
					dayData.push({
						month: 'current',
						day: new Date(tempData[i].martisClockDate).getDate(),
						color: 'white',
            background: '#DC143C'
					})
				}
			}
			this.setData({
				dayStyle: dayData
			})
		},
    refresh() {
      let that = this;
      // 获取消息信息
      wx.request({
        url: app.globalData.BaseURL + 'martisClock/' + app.globalData.user.userID,
        //真实的接口地址
        data: {},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': `Bearer ${app.globalData.token}`
				},
        success: function (res) {
					console.log(res.data);
					if (res.data == 'No Token' || res.data == 'token过期') {
						wx.showToast({
							title: '登陆超时，请重新登陆',
							duration:2000
						})
						wx.navigateTo({
							url: '/pages/welcome/home/home',
						})
					} else {
						var dayData = new Array();
						var completedCount = 0;
						var paddingCount = 0;
						var alertCount = 0;
						for (var i = 0; i < res.data.length; i++) {
							if (new Date(res.data[i].martisClockDate).getMonth() == new Date().getMonth()) {
								//将内容数据转换为对象
								dayData.push({
									month: 'current',
									day: new Date(res.data[i].martisClockDate).getDate(),
									color: 'white',
									background: '#DC143C'
								})
							}
							if (res.data[i].martisClockComplete) {
								completedCount++;
							} else {
								paddingCount++;
								if (res.data[i].martisClockMargin <= res.data[i].martisClockAlert) {
									alertCount++;
								}
							}
						}

						let paddingCountBadge = `iconList[0].badge`;
						let alreadyCountBadge = `iconList[1].badge`;
						let alertCountBadge = `iconList[2].badge`;

						that.setData({
							dayStyle: dayData,
							dataList: res.data,
							[paddingCountBadge]: paddingCount,
							[alreadyCountBadge]: completedCount,
							[alertCountBadge]: alertCount,
						})
						if (alertCount > 0) {
							wx.showToast({
								title: '有' + alertCount + '项任务提醒',
								image: '/images/tabbar/about.png'
							})
						}
					}
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  },

})