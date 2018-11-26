// components/dialog.js
Component({
	/**
	 * 组件的属性列表
	 */
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},
	properties: {
		// message:{
		// 	type: String ,
		// 	value:'报错提醒'
		// },
		// backColor:{
		// 	type: String ,
		// 	value:'error'
		// }
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		layShow: true,
		backColor: 'error',
		message: '',
		layerDownNum: 2,
		layerTimer: ''
	},

	/**
	 * 组件的方法列表
	 */
	methods: {

		hideDialog() {
			this.setData({
				// layShow: !this.data.layShow
				layShow: true    //采用直接赋值，不要用反值，会造成认值不清问题
			})
		},
		//展示弹框
		showDialog(data) {
			// console.log(data);
			this.setData({
				// layShow: !this.data.layShow
				layShow: false
			})
			// console.log(this.data.layShow)
			let that = this;
			let layerDownNum = 2;
			// let layerDownNum = that.data.layerDownNum;
			clearInterval(that.data.layerTimer);   //每次弹框的时候清空一下计时器，防止出现多次计时问题
			that.setData({
				backColor:data.type,
				message: data.message,
				layerTimer: setInterval(function () {
					layerDownNum--;
					that.setData({
						layerDownNum: 2
					})
					console.log(layerDownNum)
					if (layerDownNum == 0) {
						clearInterval(that.data.layerTimer);
						that.setData({
							layerDownNum: 2,
						})
						that.hideDialog();
					} 
				}, 1000)
			})
			
		},

	}
})
