const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function request(url, data, method = 'GET', callback, errorCallback) {
  var app = app || getApp();

  app.globalData.authorize = wx.getStorageSync('global.authorize');
  app.globalData.csrf = wx.getStorageSync('global.csrf');
  app.globalData.openid = wx.getStorageSync('global.openid');
  app.globalData.csrfFactor = wx.getStorageSync('global.csrfFactor');

  var ctype = 'application/json;charset=utf-8';
  if (method.toUpperCase() != 'GET')
    ctype = 'application/x-www-form-urlencoded;charset=utf-8';

  console.log(url)
  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      'content-type': ctype,
      'Authorization': 'Bearer ' + app.globalData.authorize,
      'X-CSRF-Token': app.globalData.csrf,
      'X-CSRF-UToken': app.globalData.openid,
      'X-CSRF-Factor': app.globalData.csrfFactor
    },

    success: function (res) {
      if (200 != res.statusCode) {
        console.log(res.data)
        return;
      }

      for (var i in res.data)
        console.log(i + '****' + res.data[i]);

      console.log('code=' + res.data.code);

      switch (res.data.code) {
        case 9999:
          console.log('不是微信小程序发出的请求');
          return;
        case 9998:
          console.log('缺少用户授权信息');
          return;
        case 9997:
          console.log('缺少 csrf 校验因素');
          return;
        case 9996:
          console.log('csrf 校验失败');
          return;
        case 8888:
          console.log('首次请求，自动生成 csrf');
      }

      if (!Object.prototype.hasOwnProperty.call(res.data, 'safeObj')) {
        console.log('接口返回数据缺少必要的 安全信息');
        return;
      }

      if (Object.prototype.hasOwnProperty.call(res.data.safeObj, 'X-CSRF-Factor'))
        wx.setStorageSync('global.csrfFactor', res.data.safeObj['X-CSRF-Factor']);

      if (Object.prototype.hasOwnProperty.call(res.data.safeObj, 'X-CSRF-Token'))
        wx.setStorageSync('global.csrf', res.data.safeObj['X-CSRF-Token']);

      if (Object.prototype.hasOwnProperty.call(res.data.safeObj, 'X-API-Token'))
        wx.setStorageSync('global.authorize', res.data.safeObj['X-API-Token']);

      if (8888 == res.data.code) {
        setTimeout(function () {
          request(url, data, method, callback, errorCallback)
        }, 200);
        return;
      }

      delete res.data.safeObj;
      (1 == res.data.code && typeof callback === 'function') ? callback(res.data) : (typeof errorCallback === 'function' && errorCallback(res.data));
    }
  })
}
function buttonClicked(self) {
  self.setData({
    buttonClicked: true
  })
  setTimeout(function () {
    self.setData({
      buttonClicked: false
    })
  }, 500)
}

  // function json2Form(json) {
    //   var str = [];
    //   for (var p in json) {
    //     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    //   }
    //   return str.join("&");
    // }

module.exports = {
  request: request,
  formatTime: formatTime,
  buttonClicked:buttonClicked
}
