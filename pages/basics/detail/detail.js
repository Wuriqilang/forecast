// pages/basics/detail/detail.js
//获取应用实例
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		martisClockList:[],
    title:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//获取传入的日期数据
		var tempDate = JSON.parse(options.dataObj);
		var date = tempDate.year + '-' + tempDate.month + '-' + tempDate.day;
    this.setData({
      title:date
    })
		var that = this;
		wx.request({
			url: app.globalData.BaseURL + 'martisClock/' + app.globalData.user.userID+'/'+date,
			//真实的接口地址
			data: {},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				//console.log(res);
				if (res.data == 'No Session') {
					wx.navigateTo({
						url: '/pages/welcome/home/home',
					})
				} else {
					console.log(res.data);
					that.setData({
						martisClockList:res.data
					})
				}
			},
			fail: function (err) {
				console.log(err)
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})