// pages/bulletin/bulletin.js
const app = getApp();
import API from '../../utils/api.js'
const CHARTS = require('../../utils/wxcharts.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		numberTime:'',
		totolNumber: 0,
		actionTime:0,
		dataInfo: [
			{
				id: 1,
				subNum: "C1609050001",
				percentage: 30,
				grade: "SPCC",
				spec: "2.5*1200*C",
				weight: 500
			},
			{
				id: 2,
				subNum: "A1609050001",
				percentage: 80,
				grade: "SPCC",
				spec: "3.5*1200*C",
				weight: 100
			}
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log('1')
		wx.showToast({

			title: '加载中...',

			icon: 'loading',

			duration: 2000//持续的时间

		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		console.log('2')
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		console.log('3')
		this.getAllInfo()
		this.ringShow()
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
	// 获取请求信息
	getAllInfo(){
		let _this = this;
		let postData = {
			type:'week'
		}
		getApp().netRequest({
			url: API.getBulletinInfo,
			data: postData,
			success: function (res) {
				// console.log(res.data.data.yearly.total_ct)
				_this.data.totolNumber = res.data.data.yearly.total_ct;
				_this.numBer()     //请求成功之后调用跳动计数
			}
		})
	},
	// 数字跳动测试
	numBer(){
		const that = this
		// console.log(that.data.totolNumber)
		let actionTime = 0;    //倒计时时间
		// 判断得到的总量分位,跳动数字在分位范围内
		let fission = 0;    //加值的大小
		let cardinalNum = 0;   //乘值的基数
		let getTotNum = that.data.totolNumber;
		let getTotNumLenGth = that.data.totolNumber.toString().length;
		// console.log(getTotNum)
		if (getTotNumLenGth == 1 || getTotNumLenGth == 2){
			fission = 10;
			cardinalNum = 50;
			console.log(0)
		}else if (getTotNumLenGth == 3){
			fission = 100;
			cardinalNum = 500;
			console.log(1)
		}else if (getTotNumLenGth == 4){
			fission = 1000;
			cardinalNum = 5000;
		}else{
			fission = 10000;
			cardinalNum = 50000;
		}
		that.setData({
			numberTime: setInterval(function () {

				// let number = 1000 + Math.round(Math.random() * 5000)
				let number = fission + Math.round(Math.random() * cardinalNum)
				actionTime += 1
				that.setData({
					actionTime: actionTime,
					totolNumber: number
				})
				// console.log(number)
				// console.log(actionTime)
				if (actionTime === 5) {
					clearInterval(that.data.numberTime);   //清除定时器
					// 如果定时器清除了，把数字跳动到，请求到的数
					that.setData({
						totolNumber: getTotNum
					})
					// actionTime = 0
				}
			}, 200)
		})
		
	},
	// 测试图表
	ringShow() {
		console.log(0)
		for (var i in this.data.dataInfo) {
			var item = this.data.dataInfo[i];
			console.log(item)
			let ring = {
				canvasId: "ringGraph" + item.id, // 与canvas-id一致
				type: "ring",
				series: [
					{
						name: "已完成",
						data: item.percentage,
						color: '#ff6600'
					},
					{
						name: "未完成",
						data: 100 - item.percentage,
						color: '#eeeeee'
					}
				],
				width: 100,
				height: 100,
				dataLabel: false,
				legend: false,
				title: { // 显示百分比
					name: item.percentage + '%',
					color: '#333333',
					fontSize: 14
				},
				extra: {
					pie: {
						offsetAngle: -90
					},
					ringWidth: 6,
				}
			};
			new CHARTS(ring);
		}
	},

})