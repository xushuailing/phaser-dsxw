/**
 * 引动页面
 */
var bootState = function(game) {
	this.init = function() {
		game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		var url = location.href;
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
				c.data.userGameLimit = data.data;
				if (data.TeamID == '0') {
					return;
				}
				c.data.DesaiTeamID = data.TeamID;
				c.data.DesaiTeamName = data.TeamName;
				// alert(2)
			}
		});

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
				// console.log(data)
				c.data.userPic = data.Pic;
				c.data.userDesaiScore = data.DesaiScore;
				c.data.userScoreRank = data.ScoreRank;
				c.data.userURL = data.URL;
			}
		});

		if (url.indexOf('teamID') > 0 && c.data.DesaiTeamID == null) {
			// alert(1)
			c.data.isShareUrl = true;
			var teamID = url
				.split('?')[1]
				.split('=')[1]
				.split('&')[0];
			c.data.DesaiTeamID = teamID;
		}
		/* 查看队伍名 */
		$.ajax({
			type: 'POST',
			url: c.data.url + 'Desai_TeamService.ashx?pagetype=info',
			async: false,
			data: {
				iD: c.data.DesaiTeamID
			},
			success: function(data) {
				var data = eval('(' + data + ')');
				c.data.DesaiTeamName = data.data.Name;
			}
		});
		/* 绑定队伍 */
		$.ajax({
			type: 'POST',
			url: c.data.url + 'WXClientService.ashx?pagetype=update2',
			data: {
				uID: c.data.uID,
				openID: c.data.wxID,
				desaiTeamID: c.data.DesaiTeamID,
				desaiTeamName: c.data.DesaiTeamName
			},
			success: function(data) {
				console.log(data);
			}
		});
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
		if (
			c.data.isShareUrl ||
			c.data.DesaiTeamID == null
		) {
			shareOption({
				title: `【爱运动，炬能量】一起来为德赛西威第七届运动火炬添加能量！`,
				link: 'http://saas.zeego.cn/Project/DeSaiTorch',
				pic: `http://saas.zeego.cn/Project/DeSaiTorch/images/shareLogo.jpg`,
				desc: `【爱运动 炬能量】我是${c.data.wxName}，一起来为德赛西威第七届田径运动会火炬添加能量！`,
				success: function() {
					// 成功回调
					// console.log('成功');
				},
				cancel: function() {
					// console.log('失败');
					// 失败回调
				}
			});
		} else {
			shareOption({
				title: `【爱运动，炬能量】一起来为德赛西威第七届运动火炬添加能量！`,
				link: c.data.userURL,
				pic: `http://saas.zeego.cn/Project/DeSaiTorch/images/icon${c.data
					.DesaiTeamID}.png`,
				desc: `${c.data.wxName}正在为德赛西威第七届田径运动会${c.data.DesaiTeamName}添加了${c.data
					.userDesaiScore}个能量，在所有选手中排名${c.data.userScoreRank}位。爱运动，一起来！`,
				success: function() {
					// 成功回调
					// console.log('成功');
				},
				cancel: function() {
					// console.log('失败');
					// 失败回调
				}
			});
		}
	};
};
