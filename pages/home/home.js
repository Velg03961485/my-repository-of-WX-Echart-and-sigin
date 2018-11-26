// pages/home/home.js
const app = getApp()
//接口
import API from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
		isScreening: ['', 'screening-animation-open', 'screening-animation-closed'],//筛选动画状态

		screeningNo: 0, //筛选动画的选择项
		isShow: false, //下面是否显示

		isShowBJ: false, //背景是否显示
		deviceVersion:'1.1.0',
		userName:'',
		userLaber:'',
		headImg:'../../images/myDown.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
	onReady: function () {
		wx.showTabBar()
		this.timeChoose = this.selectComponent("#time-choose");
	},
  onLoad: function (options) {
		this.retreatLog = this.selectComponent("#retreatLog");
		this.getInfoDevice();
		this.getInfoUser();
  },
	onUnload: function () {
	
	},
	// 忘记密码
	changepasswordClick() {
		console.log('可以')
		wx.navigateTo({
			url: '../modificationPsd/modificationPsd',
		})
	},
	// 获取用户信息
	getInfoUser(){
		let _this = this;
		let postData = {

		}
		getApp().netRequest({
			url: API.userInfo,
			data: postData,
			success: function (res) {
				console.log(res)
				let Data = res.data.data.user
				_this.setData({
					userName: Data.username,
					userLaber: Data.role_name,
				})
			}
		})
	},
	// 获取版本信息
	getInfoDevice(){
		console.log(0)
		let _this = this;
		let postData = {

		}
		getApp().netRequest({
			url: API.deviceVersion,
			data: postData,
			success: function (res) {
				console.log(res.data.data[0].val)
				
				_this.setData({
					deviceVersion: res.data.data[0].val
				})
			}
		})
	},
  bindViewTap(){	
		this.retreatLog.pleaseChose()
  },
	datePickerOnSureClick: function (e) {
		// 点击确认，退登
		// 退出登录的时候，设置状态为false
		wx.setStorageSync('userIsSure', false);
		// 退出登录的时候，一定要清空accessToken
		wx.setStorageSync('accessToken', '');
    wx.redirectTo({
      url: '../index/index',
    })
	},

	
	ceshiBtn: function () {
		console.log(API.resQ);
		let postData = {
			
		}
		getApp().netRequest({
			url: API.resQ,
			data: postData,
			success: function (res) {
				console.log(res)
			}
		})
	}
})