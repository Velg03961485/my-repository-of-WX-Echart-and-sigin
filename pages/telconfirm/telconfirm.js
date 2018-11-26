// pages/telconfirm/telconfirm.js
const app = getApp();
import API from '../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: '',//定时器名字
    countDownNum: '60',
    see:true,
    cover:false,
    num:'',
    username:'',
    phone:'',
    Length: 4,    //输入框个数 
    isFocus: true,  //聚焦 
    Value: "",    //输入的内容 
    // ispassword: false, //是否密文显示 true为密文， false为明文。 
  },
  onLoad:function(){
    var app = getApp();
    let _this = this;
    let phone = wx.getStorageSync('phone');
    let username = wx.getStorageSync('username');
    console.log(phone,username);
    _this.setData({
      username:username,
      phone:phone,
    })
    console.log(_this.data.username,_this.data.phone);
    this.dialog = this.selectComponent("#dialog");
  },
onReady:function(){
  this.countDown();
},
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;
    that.setData({
      timer: setInterval(function () {
        countDownNum--;
        that.setData({
          countDownNum: countDownNum
        })
        if (countDownNum == 0) {
          clearInterval(that.data.timer);
          that.setData({        
            see:false,
            cover:true,
          })
        }
      }, 1000)
    })
  },
  endTime(){
    this.setData({
      see:true,
      cover:false,
      countDownNum: '60',
    })
    this.countDown();
    let _this = this;
   
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
					console.log('重新发送请求成功')
					// wx.navigateTo({
					//   url: '../telconfirm/telconfirm'
					// })
				} else {
					_this.dialog.showDialog({
						'type': 'error',
						'message': res.data.msg
					})
				}
			}
		})


  },
  Focus(e) {
    var that = this;
    var inputValue = e.detail.value;
    that.setData({
      Value: inputValue,
      num:inputValue
    })
  },
  Tap() {
    var that = this;
    that.setData({
      isFocus: true,
    })
  },
  formSubmit(e) {
    console.log(e.detail.value.password);
    this.goNext();
  },
  goNext(){
    let _this = this;
    console.log('成功跳转');
 
		let postData = {
			phone: _this.data.phone,
			code: _this.data.num,
		}
		getApp().netRequest({
			url: API.checkMsg,
			data: postData,
			success: function (res) {
				console.log(res);
				if (res.data.errno === 0) {
					console.log(res.data.data.code)
					wx.setStorageSync('code', res.data.data.code);
					wx.redirectTo({
						url: '../changepsd/changepsd',
					})
				} else if (res.data.errno == 1000002) {
					_this.dialog.showDialog({
						'type': 'error',
						'message': '验证码不能为空',
					})
				} else {
					_this.dialog.showDialog({
						'type': 'error',
						'message': res.data.msg,
					})
				}
			}
		})


  },

})