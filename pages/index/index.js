//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
import API from '../../utils/api.js'
Page({
  data: {
    see:true,
    img:'../../images/closeEyes.png',
    isShowPassword:true,
    checked:false,
    username:'',
    password:'',
    usernameV:'',
    passeordV:'',
    iptType: 'password',
    hidden: false,
    hiddened: true,
    buttonClicked:false,
		buttonClick:false
  },
  onLoad: function () {
		wx.hideTabBar()
    let username = wx.getStorageSync('username');
    let password = wx.getStorageSync('password');
    let checked = wx.getStorageSync('checked');
		if (checked == true){
			this.setData({
				username: username,
				password: password,
				checked: checked,
			})
		} else if (checked == false){
			this.setData({
				username: '',
				password: '',
				checked: false,
			})
		}
		this.dialog = this.selectComponent("#dialog");
  },
  clickEyes:function(){
    this.data.password = this.data.password;
    this.setData({
      password:this.data.password
    })
    if(this.data.see == false){
      this.setData({
        see: true,
        isShowPassword : true,
        img: '../../images/closeEyes.png',
        hidden:false,
        hiddened:true,
      })
    }else{
      this.setData({
        see: false,
        isShowPassword: false,
        img: '../../images/eyes.png',
        hidden: true,
        hiddened: false,
      })
    }
    
  },
  rememberMe(e){
    let check = e.target.dataset.checked;
    console.log(check)
    if(check == false){
      this.setData({
        checked:true,
      })
      wx.setStorageSync('username', this.data.username);
      wx.setStorageSync('password', this.data.password);
      wx.setStorageSync('checked', this.data.checked);
    }else{
      this.setData({
        checked: false,
      })
      wx.setStorageSync('username', '');
      wx.setStorageSync('password', '');
      wx.setStorageSync('checked', this.data.checked);
    }
    
  },
  username(e){
    if(e.detail.value.length == 0){
      this.setData({
        usernameV:'用户名不能为空',
        // username:'',
      })
    } else if (e.detail.value.length > 0 && e.detail.value.length < 5){
      this.setData({
        usernameV: '账号由5-16位数字，中文，字母或下划线组成',
        // username: '',
      })
    }else{
      this.setData({
        usernameV: '',
        username: e.detail.value.replace(/\s+/g, ''),
      })
    }
   
  },
  password(e){
    this.data.password = e.detail.value;
    this.data.password = this.data.password;
    if (e.detail.value.length == 0) {
      this.setData({
        passwordV: '密码不能为空',
        // password: '',
      })
    } else if (e.detail.value.length > 0 && e.detail.value.length < 6){
      this.setData({
        passwordV: '密码需大于等于6位',
        // password:'',
      })
    }else{
      this.setData({
        passwordV: '',
        password: e.detail.value.replace(/\s+/g, ''),
      })
    }  
  },
  //事件处理函数
  bindViewTap: function () {
    util.buttonClicked(this);
		this.setData({
			buttonClick:true
		})
		wx.setStorageSync('username', '');
		wx.setStorageSync('password', '');
		wx.setStorageSync('checked', false);
    let _this = this;
    console.log(this.data.username, this.data.password);
		// 新接口请求

		let postData = {
			username: _this.data.username,
			password: _this.data.password,
		}
		getApp().netRequest({
			url: API.userLog,
			data: postData,
			success: function (res) {
				console.log(res);
				_this.setData({
					buttonClick: false
				})
				if (res.data.errno === 0) {
					if (_this.data.checked == true) {
						wx.setStorageSync('username', _this.data.username);
						wx.setStorageSync('password', _this.data.password);
						wx.setStorageSync('checked', _this.data.checked);
					} else if (_this.data.checked == false) {
						wx.setStorageSync('username', '');
						wx.setStorageSync('password', '');
						wx.setStorageSync('checked', false);
					}
					wx.setStorageSync('accessToken', res.data.data.access_token);
					// wx.setStorage({
					// 	key: app.globalData.access_token,
					// 	data: res.data.data.access_token,
					// })
					// wx.getStorage({
					// 	key: app.globalData.access_token,
					// 	success: function (res) {
					// 		console.log(res);
					// 	},
					// });
					wx.switchTab({
						url: '../home/home'
					})
					// 如果登录成功，存一状态，是否在登录在登录
					wx.setStorageSync('userIsSure', true);
				} else if (res.data.errno == 1000002) {
					if (_this.data.username != '' && _this.data.password == '') {
						_this.dialog.showDialog({
							'type': 'error',
							'message': '密码不能为空'
						});
					} else if (_this.data.password != '' && _this.data.username == '') {
						_this.dialog.showDialog({
							'type': 'error',
							'message': '用户名不能为空'
						});
					} else if (_this.data.username == '' && _this.data.password == '') {
						_this.dialog.showDialog({
							'type': 'error',
							'message': '用户名不能为空，密码不能为空'
						});
					} else {
						_this.dialog.showDialog({
							'type': 'error',
							'message': '账号名或密码不正确'
						});
					}

				} else {
					_this.dialog.showDialog({
						'type': 'error',
						'message': res.data.msg
					});
				}
			}
		})

  },


  forgotpsd:function(){
    wx.navigateTo({
      url: '../forgotpsd/forgotpsd'
      // url: '../telconfirm/telconfirm'
      //  url: '../changepsd/changepsd'
    })
  },

	
})
