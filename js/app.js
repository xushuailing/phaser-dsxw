var game = new Phaser.Game(750, 1206, Phaser.CANVAS, 'container');

/* 调位置 */
function key(name) {
	name.inputEnabled = true;
	name.input.enableDrag();
	name.events.onDragStop.add(function() {
		console.log('x:' + Math.floor(name.x) + ',' + Math.floor(name.y));
	}, this);
}
var c = {
	Arc: function(x, y, number, color) {
		if(!number) number = 0;
		if(!color) color = '0xff0000';
		// 队伍的得分百分比
		if (number > 360) number = 360;
		var g = game.add.graphics(0, 0),
			angle = Math.PI / -180,
			startAngle = -(1 / 2 * Math.PI), // 开始角度
			// , endAngle = startAngle + 2 * Math.PI // 结束角度
			xAngle = 1 * (Math.PI / 180); // 偏移角度
		g.lineStyle(20, color, 1);
		g.arc(x, y, 65, startAngle, startAngle + xAngle * number);
		return g;
	},
	Title: function(key) {
		// 标题
		var text = game.add.text(game.world.centerX, 50, key, {
			fill: '#fff',
			font: '45px Arial',
			align: 'center'
		});
		text.anchor.set(0.5);
		return text;
	},
	Click: function(x, y, text,img, callback) {
		var t = game.add.text(game.world.centerX + x, y, text, {
			fill: '#000',
			font: '30px Arial',
			align: 'center'
		});
		var click = game.add.button(game.world.centerX + x, y, img, function() {
			callback();
		});
		t.anchor.set(0.5);
		click.anchor.set(0.5);
		return click;
	},
	AddTorch: function(y, scale) {
		// 添加火炬
		/**
         * @y 火的y位置
         * @scale 火炬放大的值
         */
		var group = game.add.group();
		// var dot = game.add.sprite(game.world.centerX, game.world.centerY, 'dot');
		var fire = game.add.sprite(
			game.world.centerX + 5,
			game.world.centerY - y,
			'fire'
		);
		var torch = game.add.image(game.world.centerX, game.world.centerY, 'torch');
		fire.anchor.set(0.5);
		// dot.anchor.set(0.5);
		torch.anchor.set(0.5);
		fire.animations.add('fire', [0, 1, 2, 1]);
		fire.animations.play('fire', 3, true);
		// dot.animations.add('dot', [0, 1, 2, 1]);
		// dot.animations.play('dot', 3, true);
		group.addChild(fire);
		group.addChild(torch);
		// group.addChild(dot);
		torch.scale.set(scale);
		group.bringToTop = 10
		return group;
	},
	close: function(callback) {
		var text = game.add.text(640, 19, '×', {
			fill: '#fff',
			font: '50px Arial',
			align: 'center'
		});
		game.add
			.button(612, 9, 'click', function() {
				callback();
				text.destroy()
			})
			.scale.set(8);
	},
	hint: function(text) {
		/* 提示框 */
		var a = game.add.graphics(0, 0);
		a.beginFill(0x000000);
		a.drawRoundedRect(0, 0, 280, 120);
		a.x = (game.width - a.width) / 2;
		a.y = (game.height - a.height) / 2;
		a.endFill();
		a.alpha = 0.8;
		var b = game.add.text(375, 607, text, {
			fill: '#fff',
			fontSize: '25px',
			fontWeight: 400,
			align: 'center'
		});
		b.anchor.set(0.5);
		game.add.tween(b).to({alpha: 0}, 2000, 'Linear', true, 1000);
		game.add
			.tween(a)
			.to({alpha: 0}, 2000, 'Linear', true, 1000)
			.onComplete.add(function() {
				a.destroy();
				b.destroy();
			}, this);
	},
	_InitWXLogin: function() {
		var _wxInfo = {};
		function GetQueryString(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]);
			else return null;
		}
		if (GetQueryString('wxid') == null) {
			location.href =
				'http://saas.zeego.cn/Interface/WeiXinAuth/WXAuth.aspx?info=1&UID=89&backurl=' +
				encodeURIComponent(location.href.split('#')[0]);
			return;
		} else {
			_wxInfo.id = GetQueryString('wxid');
			_wxInfo.name = GetQueryString('wxname');
			_wxInfo.sex = GetQueryString('sex');
			_wxInfo.issub = GetQueryString('issub');
			_wxInfo.headimgsrc = GetQueryString('headimg');
		}
		return _wxInfo;
	},
	data: {

		/**
		 * @GameType 选择游戏的类型
		 * @url 接口前缀
		 * @iD 固定
		 * @uID 固定
		 * @memberInfo 参与总人数
		 * @wxID 微信id
		 * @wxName 微信名字
		 * @wxPic 微信头像
		 * @DesaiTeamID 已选队伍id
		 * @DesaiTeamName 已选队伍名
		 * @CoreNumber 计算分数的基数
		 * @userScore 用户分数
		 * @EnergyHighest 最高分数值
		 * @isShareUrl 是否点击分享进入
		 * @userGameLimit 用户剩余的游戏次数
		 * @userScoreRank 用户排行
		 * @userPic 用户头像
		 * @userDesaiScore 用户总分数
		 * @userURL 用户分享链接
		 * @openTopWay 打开排行榜方式
		 */
		GameType: null,
		url: 'http://saas.zeego.cn/Interface/DesaiTorch/',
		iD: 1,
		uID: 89,
		memberInfo: null,
		wxID: null,
		wxName: null,
		wxPic: null,
		DesaiTeamID: null,
		DesaiTeamName: null,
		userGameLimit: [],
		CoreNumber: null,
		userScore: null,
		EnergyHighest: null,
		isShareUrl:false,
		userScoreRank:null,
		userPic:null,
		userDesaiScore:null,
		userURL:null,
		openTopWay:null,
	}
};

// console.log(c._InitWXLogin())
c.data.wxID = c._InitWXLogin().id
c.data.wxName = c._InitWXLogin().name
c.data.wxPic = c._InitWXLogin().headimgsrc
// c.data.wxID = 'ocpe8wRb3HI2HoLTxtXIIe0zDbec';
// c.data.wxName = '许帅领';
// c.data.wxPic =
	// '"http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo0Rp1onxRjt2DUplibavP0qHibWsiaNIUicokmhHm1ia1V9LI3licmduOGm6t2oaPqHdJbHo0PkyN7uYkg/0"';
game.state.add('boot', bootState);
game.state.start('boot');