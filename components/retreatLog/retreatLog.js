
Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},
	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {
		isScreening: ['', 'screening-animation-open', 'screening-animation-closed'],//筛选动画状态

		screeningNo: 0, //筛选动画的选择项

		isShow: false, //下面是否显示

		isShowBJ: false, //背景是否显示

	
	
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		//点击请选择 弹出

		pleaseChose: function () {
			var that = this;

			
			wx.hideTabBar()
		
			
			setTimeout(function () {

				that.setData({

					screeningNo: 1, //动画开始

					isShow: true,

					isShowBJ: true,

				})

			}, 310)
			

		},
		//点击确认 弹回

		sureTime: function () {

			var that = this;

			that.setData({

				screeningNo: 2, //动画结束

			})
		
			this.triggerEvent('sureclick', {
				// value: backTime,
			});

			setTimeout(function () {

				that.setData({

					isShow: false,

					isShowBJ: false,

				})

			}, 310)

		},
		//点击取消 弹回

		cancelTime: function () {
			
			var that = this;

			that.setData({

				screeningNo: 2, //动画结束

			})

			setTimeout(function () {

				that.setData({

					isShow: false,

					isShowBJ: false,

				})
				wx.showTabBar()
			}, 310)
			

		},
	
	}
})
