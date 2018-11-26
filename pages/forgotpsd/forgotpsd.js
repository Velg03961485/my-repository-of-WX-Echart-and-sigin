// pages/forgotpsd/forgotpsd.js
const app = getApp();
import API from '../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    phone:'',
    usernameV:'',
    phoneV:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.dialog = this.selectComponent("#dialog");
  },
 
  username(e){
    if(e.detail.value.length == 0){
      this.setData({
        usernameV:'账号不能为空'
      })
    }else{
      this.setData({
        usernameV:'',
        username: e.detail.value.replace(/\s+/g, ''),
      })
    }   
    wx.setStorageSync('username', this.data.username);
  },
  phone(e){
    if(e.detail.value.length == 0){
      this.setData({
        phoneV:'手机号码不能为空',
      })
    }else {
      this.setData({
        phoneV:'',
        phone: e.detail.value.replace(/\s+/g, ''),
      })
    }    
      wx.setStorageSync('phone', this.data.phone);
  },
  //事件处理函数
  bindViewTap: function () {
    let _this = this;
    if(_this.data.username =='' && _this.data.phone == ''){
      _this.dialog.showDialog({
        'type':'error',
        'message':'账号名不能为空，电话号码不能为空'
      })
    } else if (_this.data.username != '' && _this.data.phone == '') {
      _this.dialog.showDialog({
        'type': 'error',
        'message': '电话号码不能为空'
      })
    } else if (_this.data.username == '' && _this.data.phone != '') {
      _this.dialog.showDialog({
        'type': 'error',
        'message': '账号名不能为空'
      })
    }else{
     
			let postData = {
				username: _this.data.username,
				phone: _this.data.phone,
			}
			getApp().netRequest({
				url: API.sendMsg,
				data: postData,
				success: function (res) {
					console.log(res)
					if (res.data.errno === 0) {
						wx.redirectTo({
							url: '../telconfirm/telconfirm'
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
    
  },

})