// pages/changePsd/changepsd.js
const app = getApp();

import API from '../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    psd:'',
    repsd:'',
    code:'',
    username:'',
    psdV:'',
    repsdV:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {   
    let _this = this;
    let username = wx.getStorageSync('username');
    let code = wx.getStorageSync('code');
    _this.setData({
      username: username,
      code:code,
    })
    // console.log(_this.data.username,_this.data.code);
    this.dialog = this.selectComponent("#dialog");
  },
  psd(e){
    if (e.detail.value.length == 0) {
      this.setData({
        psdV: '密码不能为空',
        psd: e.detail.value.replace(/\s+/g, ' ')
      })
    } else if (e.detail.value.length > 0 && e.detail.value.length < 6){
      this.setData({
        psdV:'密码需大于等于6位',
        psd: e.detail.value.replace(/\s+/g, ' ')
      })
    }else{
      this.setData({
        psdV:'',
        psd: e.detail.value.replace(/\s+/g, ' ')
      })
    }
    
  },
  repsd(e){
    if (e.detail.value.length == 0) {
      this.setData({
        repsdV: '密码不能为空',
        repsd: e.detail.value.replace(/\s+/g, ' ')
      })
    } else if (e.detail.value.length > 0 && e.detail.value.length < 6) {
      this.setData({
        repsdV: '请再次输入密码',
        repsd: e.detail.value.replace(/\s+/g, ' ')
      })
    } else{
      this.setData({
        repsdV:'',
        repsd: e.detail.value.replace(/\s+/g, ' ')
      })
    } 
  },
  bindViewTap(){
    let _this = this;
    if (_this.data.psd != _this.data.repsd){
      _this.dialog.showDialog({
        'type':'error',
        'message': '两次输入的密码不一样',
      })
    }
    else if (_this.data.psd == _this.data.repsd){
    
			let postData = {
				username: _this.data.username,
				new_password: _this.data.psd,
				new_password2: _this.data.repsd,
				code: _this.data.code,
			}
			getApp().netRequest({
				url: API.passCodeChangePassword,
				data: postData,
				success: function (res) {
					console.log(res);
					if (res.data.errno === 0) {
						// 忘记密码修改成功之后跳登录页重新登录
						wx.redirectTo({
							url: '../index/index',
						})
					} else {
						_this.dialog.showDialog({
							'type': 'error',
							'message': res.data.msg,
						})
					}
				}
			})

    }
   
    
  }
})