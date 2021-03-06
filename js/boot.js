/**
 * 引动页面
 */
var bootState = function(game) {
	this.init = function() {
		game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		/* 参与人数 */
		$.ajax({
			type: 'POST',
			async: false,
			url: c.data.url + 'WXClientService.ashx?pagetype=memberInfo',
			data: {
				uID: c.data.uID
			},
			success: function(data) {
				var data = eval('(' + data + ')').data;
				c.data.memberInfo = data.MemberInfo;
			}
		});

		/* 查看已经游玩的次数以及游玩次数的限制和选择的队伍 */
		$.ajax({
			type: 'POST',
			url: c.data.url + 'Desai_RecordService.ashx?pagetype=playInfo',
			async: false,
			data: {
				uID: c.data.uID,
				id: c.data.iD,
				openID: c.data.wxID
			},
			success: function(data) {
				var data = eval('(' + data + ')');
				// console.log(data);
				c.data.userGameLimit = data.data;
				if (data.TeamID == '0') {
					return;
				}
				c.data.DesaiTeamID = data.TeamID;
				c.data.DesaiTeamName = data.TeamName;
			}
		});

		if (c.data.DesaiTeamID) {
			/* 用户排行 */
			$.ajax({
				type: 'POST',
				url: c.data.url + 'WXClientService.ashx?pagetype=rankInfo',
				async: false,
				data: {
					uID: c.data.uID,
					openID: c.data.wxID
				},
				success: function(data) {
					var data = eval('(' + data + ')').data;
					// console.log(data);
					c.data.userPic = data.Pic;
					c.data.userDesaiScore = data.DesaiScore;
					c.data.userScoreRank = data.ScoreRank;
					c.data.userURL = data.URL;
				}
			});
		}
	};
	this.preload = function() {
		game.load.image('login', 'images/login.jpg');
		game.load.image('torch', 'images/torch.png');
		game.load.image('line2', 'images/line2.png');
		game.load.atlasXML(
			'dot',
			'images/elf-dot/dot.png',
			'images/elf-dot/dot.xml'
		);
		game.load.atlasXML(
			'fire',
			'images/elf-fire/fire.png',
			'images/elf-fire/fire.xml'
		);
	};
	this.create = function() {
		game.state.add('loader', loaderState);
		game.state.start('loader');
		if (c.data.DesaiTeamID == null) {
			shareOption({
				title: `【爱运动，炬能量】一起来为德赛西威第七届运动火会炬添加能量！`,
				link: 'http://saas.zeego.cn/Project/DeSaiTorch',
				pic: `http://saas.zeego.cn/Project/DeSaiTorch/images/shareLogo.jpg`,
				desc: `【爱运动 炬能量】我是${c.data.wxName}，一起来为德赛西威第七届田径运动会火炬添加能量！`,
			});
		} else {
			shareOption({
				title: `【爱运动，炬能量】一起来为德赛西威第七届运动会火炬添加能量！`,
				link: c.data.userURL,
				pic: `http://saas.zeego.cn/Project/DeSaiTorch/images/icon${c.data
					.DesaiTeamID}.png`,
				desc: `${c.data.wxName}正在为德赛西威第七届田径运动会${c.data.DesaiTeamName}添加了${c.data
					.userDesaiScore}个能量，在所有选手中排名${c.data.userScoreRank}位。爱运动，一起来！`,
			});
		}
	};
};
