
function initPage(obj, app) {
  obj.socket = require("websocket.js");
  obj.common = app.common();
  obj.data.error = errorCode();
  obj.data.staticHost = app.globalData.allowUrl.imageuri;
  obj.onLoad = function (options) {


    if ('{}' != JSON.stringify(options))
      this._Query = options;

    var that = this;
    app.globalData.thispage = this;

    obj.errorCallback = function (data) {
      console.log(data);
      wx.showToast({
        title: obj.data.error[data.code],
        image: '../../images/no.png',
        duration: 2000
      });
    }
    obj.request = function (uri, data, method, callback, errorCallback) {
      callback = callback || this.initData;
      errorCallback = errorCallback || obj.errorCallback;

      var host = app.globalData.allowUrl.api + uri;
      var request = setInterval(function () {
        if ('' != wx.getStorageSync('global.openid')) {
          clearInterval(request);
          obj.common.request(host, data, method, callback, errorCallback)
        }
      }, 100);
    }

  }
}
    module.exports = {
      initPage: initPage
    }