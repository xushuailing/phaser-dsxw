(function() {
	function ajax(options) {
		options = options || {};
		var type = (options.type || 'GET').toUpperCase();
		var dataType = options.dataType || 'json';
		var url = options.url || '';
		var async = options.async || true;
		var data = options.data || null;
		var success = options.success || function() {};
		//创建 - 非IE6 - 第一步
		if (window.XMLHttpRequest) {
			var xhr = new XMLHttpRequest();
		} else {
			//IE6及其以下版本浏览器
			var xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}

		var params = [];
		for (var key in data) {
			params.push(key + '=' + data[key]);
		}
		var dataStr = params.join('&');
		if (type === 'POST') {
			xhr.open(type, url, async);
			xhr.setRequestHeader(
				'Content-Type',
				'application/x-www-form-urlencoded;charset=utf-8'
			);
			xhr.send(dataStr);
		} else {
			xhr.open(type, url + '?' + dataStr, async);
			xhr.send(null);
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				success(xhr.responseText);
			}
		};
	}
	function JSSDK(data) {
		wx.config({
			debug: false,
			// debug: true,
			appId: data.appid,
			timestamp: data.timestamp,
			nonceStr: data.noncestr,
			signature: data.signature,
			jsApiList: [
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'onMenuShareQZone',
				'startRecord',
				'stopRecord',
				'onVoiceRecordEnd',
				'playVoice',
				'pauseVoice',
				'stopVoice',
				'onVoicePlayEnd',
				'uploadVoice',
				'downloadVoice',
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage',
				'translateVoice',
				'getNetworkType',
				'openLocation',
				'getLocation',
				'hideOptionMenu',
				'showOptionMenu',
				'hideMenuItems',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem',
				'closeWindow',
				'scanQRCode',
				'chooseWXPay',
				'openProductSpecificView',
				'addCard',
				'chooseCard',
				'openCard'
			]
		});
	}
	function shareOption(share) {
		var title = share.title || '',
			link = share.link || '',
			desc = share.desc || '',
			pic = share.pic || '',
			success = share.success || function() {},
			cancel = share.cancel || function() {};
		wx.ready(function() {
			wx.onMenuShareTimeline({
				// 分享到朋友圈
				title: title, // 分享标题
				link: link, // 分享链接
				imgUrl: pic, // 分享图标
				success: success, // 用户取消分享后执行的回调函数
				cancel: cancel // 用户取消分享后执行的回调函数
			});
			wx.onMenuShareAppMessage({
				// 分享给朋友
				title: title, // 分享标题
				desc: desc, // 分享描述
				link: link, // 分享链接
				imgUrl: pic, // 分享图标
				success: success, // 用户确认分享后执行的回调函数
				cancel: cancel // 用户取消分享后执行的回调函数
			});
			wx.onMenuShareQQ({
				// 分享到QQ
				title: title, // 分享标题
				desc: desc, // 分享描述
				link: link, // 分享链接
				imgUrl: pic, // 分享图标
				success: success, // 用户确认分享后执行的回调函数
				cancel: cancel // 用户取消分享后执行的回调函数
			});
			wx.onMenuShareQZone({
				// 分享到QQ空间
				title: title, // 分享标题
				desc: desc, // 分享描述
				link: link, // 分享链接
				imgUrl: pic, // 分享图标
				success: success, // 用户确认分享后执行的回调函数
				cancel: cancel // 用户取消分享后执行的回调函数
			});
		});
		wx.error(function(res) {
			console.log(res);
		});
	}
	var URL = encodeURIComponent(window.location.href).split('?')[0];
	// console.log(URL)
	ajax({
		url: 'http://ext.zeego.cn/getZeegoJssdk.php?url=' + URL,
		type: 'post',
		success: function(data) {
			var data = JSON.parse(data);
			JSSDK(data);
		}
	});
	window.shareOption = shareOption;
})(window);
/* 
分享到朋友圈
function weixinShareTimeline(title,desc,link,imgUrl){
 WeixinJSBridge.invoke('shareTimeline',{
 "img_url":imgUrl,
 //"img_width":"640",
 //"img_height":"640",
 "link":link,
 "desc": desc,
 "title":title
 }); 
}
发送给好友
function weixinSendAppMessage(title,desc,link,imgUrl){
 WeixinJSBridge.invoke('sendAppMessage',{
 //"appid":appId,
 "img_url":imgUrl,
 //"img_width":"640",
 //"img_height":"640",
 "link":link,
 "desc":desc,
 "title":title
 });
分享到腾讯微博
 function weixinShareWeibo(title,link){
 WeixinJSBridge.invoke('shareWeibo',{
 "content":title + link,
 "url":link
 });
}
}

关注指定的微信号
function weixinAddContact(name){
 WeixinJSBridge.invoke("addContact", {webtype: "1",username: name}, function(e) {
 WeixinJSBridge.log(e.err_msg);
 //e.err_msg:add_contact:added 已经添加
 //e.err_msg:add_contact:cancel 取消添加
 //e.err_msg:add_contact:ok 添加成功
 if(e.err_msg == 'add_contact:added' || e.err_msg == 'add_contact:ok'){
  //关注成功，或者已经关注过
 }
 })
}
*/
