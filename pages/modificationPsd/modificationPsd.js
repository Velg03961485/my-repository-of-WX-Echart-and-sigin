// pages/modificationPsd/modificationPsd.js
const app = getApp();
import API from '../../utils/api.js'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		psd:'',
		repsd:'',
		newRepsd:'',
		btnClick:false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.dialog = this.selectComponent("#dialog");
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

	},
	psd(e){
		console.log(e.detail.value)
		this.data.psd = e.detail.value
	},
	repsd(e){
		console.log(e.detail.value)
		this.data.repsd = e.detail.value
	},
	newRepsd(e){
		console.log(e.detail.value)
		this.data.newRepsd = e.detail.value
	},
	bindViewTap(){
		console.log(0)
		let that = this;
		console.log(that.data.psd)
		if (that.data.psd == '' || that.data.repsd == '' || that.data.newRepsd == ''){
			that.dialog.showDialog({
				'type': 'error',
				'message': '请输入密码',
			})
			return;
		}
		if (that.data.psd.length < 6 || that.data.repsd.length < 6 || that.data.newRepsd.length < 6){
			that.dialog.showDialog({
				'type': 'error',
				'message': '密码的长度不能低于六位',
			})
			return;
		}
		if (that.data.repsd != that.data.newRepsd){
			that.dialog.showDialog({
				'type': 'error',
				'message': '两次输入的密码不一致，请重新输入',
			})
			return;
		}
// 修改密码
		that.setData({
			btnClick:true
		})
		let postData = {
			old_password: that.data.psd,
			new_password: that.data.repsd,
			new_password2: that.data.newRepsd
		}
		getApp().netRequest({
			url: API.modificationOsd,
			data: postData,
			success: function (res) {
				console.log(res.data)
				if (res.data.errno === 0){
					that.dialog.showDialog({
						'type': 'success',
						'message':'修改成功',
					})
					// 修改成功，两秒后跳回 我的
					setTimeout(function () {
						wx.switchTab({
							url: '../home/home'
						})
					}, 2000)
					
				}else{
					that.dialog.showDialog({
						'type': 'error',
						'message': res.data.msg,
					})
					that.setData({
						btnClick: false
					})
				}
			}
		})

	}
})