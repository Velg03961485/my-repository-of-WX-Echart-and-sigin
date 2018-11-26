//app.js
App({
	onLoad:function () {
		
	},
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    access_token: '',
    // phone:'',
    // username:'',
    // code:'',
		format:''
  },

	// 时间转换插件
	changemsTodate: function (ms) {
		var format = function (time, format) {
			var t = new Date(time);
			var tf = function (i) {
				return (i < 10 ? '0' : '') + i
			};
			return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
				switch (a) {
					case 'yyyy':
						return tf(t.getFullYear());
						break;
					case 'MM':
						return tf(t.getMonth() + 1);
						break;
					case 'mm':
						return tf(t.getMinutes());
						break;
					case 'dd':
						return tf(t.getDate());
						break;
					case 'HH':
						return tf(t.getHours());
						break;
					case 'ss':
						return tf(t.getSeconds());
						break;
				}
			})
		}
		if (ms == null) {
			return "-";
		}
		var nDate = format(new Date(ms).getTime(), 'yyyy.MM.dd')
		return nDate;
	},
	// 封装请求函数
	netRequest:function({url,data,success}){
		// console.log(data)
		if(data == undefined){
			wx.showModal({
				title:'错误警告',
				content:'请传值data,或者传空对象'
			})
		}

		// 添加验证得到的access_token
		let accessToken = wx.getStorageSync('accessToken');
		// 如果access_token 存在的话走，验证access_token接口，其余是登录接口
		if (accessToken != ''){
			data.access_token = accessToken;
		}
		
		// 请求接口头
		let server = 'https://dev-api.yy.ibetwo.com'    //开发分支

		// let server = 'https://test.yy.ibetwo.com'    //测试分支

		// console.log(data)
		wx.request({
			url: server + url,
			data: data,
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: "post",
			success: function (res) {
				// console.log(res)
				success(res)
			},
		})




	}


})