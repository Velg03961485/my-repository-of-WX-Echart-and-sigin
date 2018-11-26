// pages/launchPage/launchPage.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		timer:'',
		timeNum:3,
		backHeight:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let windowsHeight = ''
		let res = wx.getSystemInfoSync();
		console.log(res.windowHeight)
		let that = this;
		that.setData({
			backHeight: res.windowHeight
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
		this.cheekaccessToken()
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

	},
	// 查看是否登录，选择跳转的页面
	cheekaccessToken: function () {
		let userIsSure = wx.getStorageSync('userIsSure');
		// 每次加载的时候，记得清一次倒计时
		clearInterval(this.data.timer);

		if (userIsSure == true){
			console.log('已经登录')
			this.countDown('bulletin');
		}else {
			console.log('需要重新登录')
			this.countDown('index');
		}
	},
	// 倒计时函数
	countDown:function (urlPass) {
		console.log(urlPass)
		let that = this;
		let timeNum = that.data.timeNum;

		that.setData({
			timer: setInterval(function () {

				timeNum--;

				that.setData({
					timeNum: timeNum
				})
				console.log(timeNum)
				if (timeNum == 0) {
					clearInterval(that.data.timer);
					//关闭定时器之后，可作其他处理codes go here
					console.log('倒计时已经结束')
					if (urlPass == 'index'){
						wx.navigateTo({
							url: '../' + urlPass + '/' + urlPass + ''
						})
					} else if (urlPass == 'bulletin') {
						wx.switchTab({
							url: '../' + urlPass + '/' + urlPass + '',
							success(res){
								console.log('完成跳转')
							},fail(){
								console.log('有问题')
							}
						})
					}
					
				}
			}, 1000)
		})
	}
})