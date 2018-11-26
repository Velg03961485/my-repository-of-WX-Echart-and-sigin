// 重新定义请求接口
// 在接收的页面js上，添加 import API from '../../utils/api.js'

const api = {
	// 登录模块
	userLog: '/mv1/user/login',     //登录接口
	sendMsg: '/mv1/user/send-sms',    //发送短信接口
	checkMsg: '/mv1/user/check-sms',    //验证短信接口
	passCodeChangePassword: '/mv1/user/change-password-forgot',    //通过短信验证修改密码

	// 我的模块
	modificationOsd: '/mv1/user/change-password',   //我的、修改密码
	deviceVersion:'/mv1/device-version/lists_results',   //版本信息
	userInfo:'/mv1/user/info',                          //用户信息
	resQ : '/mv2/brief/turnover-target-list-by-org',

	// 简报模块
	getBulletinInfo: '/mv1/analysis/briefing-data',       //简报信息接口
}



export default api


// 封装的请求模板

// const app = getApp();
// let postData = {

// }
// getApp().netRequest({
// 	url: API.resQ,
// 	data: postData,
// 	success: function (res) {
// 		console.log(res)
// 	}
// })