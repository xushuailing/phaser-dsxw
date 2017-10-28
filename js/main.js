var mainState = function() {
	/**
	 * @troops 背景图
	 * @line1 规则按钮
	 * @line1_text 按钮文字
	 * @text 文字介绍
	 * @Icons 队伍图片
	 * @Yuans 队伍能量圈值
	 * @YuanNums 队伍能量值
	 * @YuanBgs 队伍能量圈背景
	 * @troopsNames 队伍名字
	 * @troopsColors 队伍的颜色
	 */
	var troopsColors = [],
		troopsNames = [],
		Icons = [],
		YuanNums = [];
	this.init = function() {
		/* 队伍信息 */
		$.ajax({
			type: 'POST',
			url: c.data.url + 'Desai_TeamService.ashx?pagetype=TeamInfo',
			async: false,
			data: {
				uID: c.data.uID,
				iD: c.data.iD
			},
			success: function(data) {
				var data = eval('(' + data + ')').data;
				data.forEach(function(val) {
					troopsNames.push(val.Name);
					troopsColors.push(val.Color);
					Icons.push(val.ID);
					YuanNums.push(val.TeamEnergy);
				}, this);
			}
		});
	};
	this.create = function() {
		var troops, line1, line1_text, text;
		var arcX = 160 + 65,
			arcY = 320;
		var YuanBgs = [
				'd1YuanBg',
				'd2YuanBg',
				'd3YuanBg',
				'd4YuanBg',
				'd5YuanBg',
				'd6YuanBg',
				'd7YuanBg',
				'd8YuanBg'
			],
			Yuans = [
				'd1Yuan',
				'd2Yuan',
				'd3Yuan',
				'd4Yuan',
				'd5Yuan',
				'd6Yuan',
				'd7Yuan',
				'd8Yuan'
			];

		troops = game.add.image(0, 0, 'tpl_module');
		c.Title('队伍方阵');

		var ruleBg = game.add.image(0, 0, 'tpl_module');
		var rule = game.add.image(114, 244, 'gameRule');
		var ruleTitle = c.Title('游戏规则');
		c.close(function() {
			rule.destroy();
			ruleBg.destroy();
			ruleTitle.destroy();
			for (var i = 0; i < 8; i++) {
				var Icon = Icons[i],
					Yuan = Yuans[i],
					YuanBg = YuanBgs[i],
					troopsName = troopsNames[i],
					YuanNum = YuanNums[i],
					troopsColor = troopsColors[i];
				if (i % 2 == 0) {
					var y = arcY + 230 * i / 2;
					var btn = game.add.button(
						arcX - 45,
						arcY - 45 + 230 * i / 2,
						'icon' + Icon,
						btnClick
					);
					btn.name = troopsName;
					btn.id = Icon;
					YuanBg = c.Arc(arcX, y, 360, '0xaaaaaa');
					Yuan = c.Arc(arcX, y, YuanNum * 3.6, '0x' + troopsColor);
					game.add
						.text(arcX, y + 100, troopsName, {
							fill: '#000',
							font: '25px Arial',
							align: 'center'
						})
						.anchor.set(0.5);
					game.add
						.text(arcX, y + 130, YuanNum + '%', {
							fill: '#' + troopsColor,
							font: '25px Arial',
							align: 'center'
						})
						.anchor.set(0.5);
				} else {
					var y = arcY + 230 * (i - 1) / 2,
						x = game.width - arcX;
					var btn = game.add.button(
						x - 45,
						arcY - 45 + 230 * (i - 1) / 2,
						'icon' + Icon,
						btnClick
					);
					btn.name = troopsName;
					btn.id = Icon;
					YuanBg = c.Arc(x, y, 360, '0xaaaaaa');
					Yuan = c.Arc(x, y, YuanNum * 3.6, '0x' + troopsColor);
					game.add
						.text(x, y + 100, troopsName, {
							fill: '#000',
							font: '25px Arial',
							align: 'center'
						})
						.anchor.set(0.5);
					game.add
						.text(x, y + 130, YuanNum + '%', {
							fill: '#' + troopsColor,
							font: '25px Arial',
							align: 'center'
						})
						.anchor.set(0.5);
				}
			}
			line1 = game.add.button(game.world.centerX, 150, 'line1', function() {
				ruleBg = game.add.image(0, 0, 'tpl_module');
				rule = game.add.image(114, 244, 'gameRule');
				ruleTitle = c.Title('游戏规则');
				c.close(function() {
					rule.destroy();
					ruleBg.destroy();
					ruleTitle.destroy();
				});
			});
			line1.anchor.set(0.5);
			line1_text = game.add.text(game.world.centerX, 153, '活动规则', {
				fill: '#000',
				font: '30px Arial',
				align: 'center'
			});
			line1_text.anchor.set(0.5);
			if (c.data.DesaiTeamID == null) {
				text = game.add.text(game.world.centerX, 210, '点击选择你支持的队伍，为他们添加火炬能量', {
					fill: '#000',
					font: '20px Arial',
					align: 'center'
				});
			} else {
				text = game.add.text(
					game.world.centerX,
					210,
					'您已选择\t' + c.data.DesaiTeamName + '\t的队伍，为他们添加火炬能量',
					{
						fill: '#000',
						font: '20px Arial',
						align: 'center'
					}
				);
			}
			text.anchor.set(0.5);
		});
		function btnClick(e) {
			if (c.data.DesaiTeamID == null) {
				/* 队伍选择 */
				$.ajax({
					type: 'POST',
					url: c.data.url + 'WXClientService.ashx?pagetype=update2',
					data: {
						uID: c.data.uID,
						openID: c.data.wxID,
						desaiTeamID: Number(e.id),
						desaiTeamName: e.name
					},
					success: function(data) {
						game.state.add('select', selectState);
						game.state.start('select');
					}
				});
			} else if (c.data.DesaiTeamID != e.id) {
				c.hint('您选择的队伍为\n' + c.data.DesaiTeamName + '!');
			} else {
				game.state.add('select', selectState);
				game.state.start('select');
			}
		}
	};
};
var selectState = function() {
	this.create = function() {
		/**
		 * @troops 背景
		 * @selectGame 选择卡关
		 * @text 文字介绍
		 * @click 点击进入游戏
		 */
		var troops, selectGame, text;
		troops = game.add.image(0, 0, 'tpl_module');
		selectGame = game.add.image(0, 0, 'selectGame');
		c.Click(175, 901, '个人榜', 'line1', function() {
			openTopWay = 'gameBegin';
			rankingID = '个人';
			game.state.add('Top', TopState);
			game.state.start('Top');
		});
		c.Click(175, 981, '团队榜', 'line1', function() {
			openTopWay = 'gameBegin';
			rankingID = '队伍';
			game.state.add('Top', TopState);
			game.state.start('Top');
		});
		game.add
			.text(
				game.world.centerX,
				game.world.height - 90,
				'已经\t\t\t\t\t\t\t\t\t\t参加活动，快来参加吧',
				{ fill: '#000', font: '25px Arial', align: 'center' }
			)
			.anchor.set(0.5);
		game.add
			.text(
				game.world.centerX - 100,
				game.world.height - 90,
				c.data.memberInfo,
				{ fill: '#f00', font: '25px Arial', align: 'center' }
			)
			.anchor.set(0.5);
		c.Title('运动模式');
		var click1 = game.add.button(202, 147, 'click', clickFun);
		var click2 = game.add.button(483, 272, 'click', clickFun);
		var click3 = game.add.button(309, 495, 'click', clickFun);
		var click4 = game.add.button(99, 703, 'click', clickFun);
		click1.scale.set(22, 23);
		click2.scale.set(20, 22);
		click3.scale.set(25, 20);
		click4.scale.set(30, 26);
		click1.id = 1;
		click2.id = 2;
		click3.id = 3;
		click4.id = 4;
		function clickFun(e) {
			var userGameLimit = c.data.userGameLimit[e.id - 1].PlayTime;
			if (userGameLimit > 4) {
				c.hint('该项目次数以达上限\n请参加别的项目!');
				return;
			}
			c.data.GameType = e.id;
			game.state.add('GameState', GameState);
			game.state.start('GameState');
		}
	};
};
var GameState = function() {
	this.init = function() {
		/* 运动模式信息 */
		$.ajax({
			type: 'POST',
			url: c.data.url + 'Desai_SportsModeService.ashx?pagetype=SportsModeInfo',
			async: false,
			data: {
				uID: c.data.uID
			},
			success: function(data) {
				var data = eval('(' + data + ')').data;
				c.data.CoreNumber = data.CoreNumber;
				c.data.EnergyHighest = data.EnergyHighest;
			}
		});
	};
	this.create = function() {
		/**
		 * @c.data.GameType 游戏模式
		 * @circle 圆
		 * @hint 提示文字
		 * @scene 游戏模式图片
		 * @hand 手势
		 * @circleTime 圆心logo
		 * @userScore 用户次数
		 * @game_bg 游戏背景图片
		 * @time 定时器
		 * @countDown 开始游戏倒计时
		 * @gameTime 游戏时间
		 * @Interval 游戏30s计时器
		 * @Return 返回
		 * @begin 开始计数
		 */
		var game_bg,
			userScore,
			circle,
			hint,
			hand,
			scene,
			circleTime,
			time,
			gameTime = 30,
			Interval,
			Return,
			begin,
			countDown = 3;
		game_bg = game.add.tileSprite(0, 0, 750, 1206, 'game_bg');
		switch (c.data.GameType) {
			case 1:
				var sceneImg = 'game4';
				var hintText = '左右滑动手机30秒\n滑出你的能量';
				var hand = 'hand4';
				break;
			case 2:
				var sceneImg = 'game3';
				var hintText = '上下滑动手机30秒\n滑出你的能量';
				var hand = 'hand3';

				break;
			case 3:
				var sceneImg = 'game2';
				var hintText = '狂戳圆心30秒\n戳出你的能量';
				var hand = 'hand2';
				break;
			case 4:
				var sceneImg = 'game1';
				var hintText = '拿起手机摇30秒\n摇出你的能量';
				var hand = 'hand1';
				break;
		}
		position(circle, 'circle');
		circleTime = position(circleTime, 'circle_text');
		circleTime.inputEnabled = true;
		var fire = game.add.sprite(
			game.world.centerX,
			game.world.centerY - 100,
			hand
		);
		fire.anchor.set(0.5);
		fire.scale.set(0.3);
		fire.animations.add(hand, [0, 1, 2, 3]);
		fire.animations.play(hand, 3, true);
		hint = game.add.text(game.world.centerX, game.world.centerY, hintText, {
			fill: '#000',
			font: '25px Arial',
			align: 'center'
		});
		hint.anchor.set(0.5);
		Return = game.add.button(34, 220, 'return', function() {
			clearInterval(time);
			clearInterval(Interval);
			game.state.add('select', selectState);
			game.state.start('select');
		});
		scene = game.add.image(0, 0, sceneImg);
		scene.bottom = game.height;
		if (c.data.GameType == 3) {
			var btn = game.add.button(0, 0, 'qianqiuHint', function() {
				btn.destroy();
				circleTime.events.onInputUp.add(function() {
					circleTime.destroy(); // 杀死圆心内容
					circleTime = position(circleTime, 'circle_' + countDown); // 更换圆心内容
					countDown--;
					qianqiu(); // 铅球游戏
					time = setInterval(function() {
						// 切换倒计时
						if (countDown == 0) {
							timing(); // 开启游戏倒计时
							clearInterval(time); // 停止倒计时
							circleTime.destroy(); // 杀死圆心内容
							begin = true;
							return;
						}
						circleTime.destroy(); // 杀死圆心内容
						circleTime = position(circleTime, 'circle_' + countDown); // 更换圆心内容
						countDown--;
					}, 1000);
				});
			});
		} else {
			circleTime.events.onInputUp.add(function() {
				circleTime.destroy(); // 杀死圆心内容
				circleTime = position(circleTime, 'circle_' + countDown); // 更换圆心内容
				countDown--;
				time = setInterval(function() {
					// 切换倒计时
					if (countDown == 0) {
						timing(); // 开启游戏倒计时
						clearInterval(time); // 停止倒计时
						circleTime.destroy(); // 杀死圆心内容
						begin = true;
						return;
					}
					circleTime.destroy(); // 杀死圆心内容
					circleTime = position(circleTime, 'circle_' + countDown); // 更换圆心内容
					countDown--;
				}, 1000);
				switch (c.data.GameType) {
					case 1:
						tiaoyuan(); // 跳远
						break;
					case 2:
						tiaogao(); // 跳高游戏
						break;
					case 3:
						qianqiu(); // 铅球游戏
						break;
					case 4:
						paobu(); // 跑步游戏
						break;
				}
			});
		}
		function timing() {
			/**30s倒计时
			 * @time 计时器
			 * @numText 倒计时数字
			 */
			var numText;

			userScore = game.add.text(game.world.centerX, game.world.centerY, '0', {
				fill: '#fff',
				font: '130px Arial',
				align: 'center'
			});
			userScore.y = 397 / 2 + 50;
			userScore.anchor.set(0.5);

			numText = game.add.text(0, 731, gameTime + 's', {
				fill: '#000',
				font: '40px Arial',
				align: 'center'
			});
			numText.x = game.world.centerX;
			numText.anchor.set(0.5);

			Interval = setInterval(function() {
				gameTime--;
				numText.text = gameTime + 's';
				if (gameTime == 0) {
					// 用户得分
					c.data.userScore = userScore.text;
					// 切换场景
					setTimeout(function() {
						game.state.add('score', scoreState);
						game.state.start('score');
						var userScore;
						if (c.data.userScore * c.data.CoreNumber > c.data.EnergyHighest) {
							userScore = c.data.EnergyHighest;
						} else {
							userScore = c.data.userScore * c.data.CoreNumber;
						}
						/* 能量增加 */
						$.ajax({
							type: 'POST',
							url: c.data.url + 'Desai_RecordService.ashx?pagetype=add2',
							async: false,
							data: {
								uID: c.data.uID,
								openID: c.data.wxID,
								sportsModeID: c.data.GameType,
								sportsModeName:
									c.data.userGameLimit[c.data.GameType - 1].SportsModeName,
								score: userScore
							},
							success: function(data) {
								// console.log(data);
							}
						});
					}, 2000);
					clearInterval(Interval);
					return;
				}
			}, 1000);
		}
		function position(Obj, img) {
			Obj = game.add.image(0, 0, img);
			Obj.anchor.set(0.5);
			Obj.x = game.world.centerX;
			Obj.y = Obj.height / 2 + 50;
			return Obj;
		}
		function paobu() {
			/**跑步游戏
			 * @SHAKE_THRESHOLD 摇晃的灵敏度
			 * @DISTANCE 摇晃一下走的距离
			 * @paodaoNum 用户得分
			 * @paodao 游戏跑道
			 */
			var SHAKE_THRESHOLD = 2000,
				DISTANCE = 20,
				paodaoNum = (last_update = x = y = z = last_x = last_y = last_z = 0);
			var paodao = game.add.tileSprite(game.world.width, 260, 1, 373, 'paodao');
			paodao.bottom = game.height;
			if (window.DeviceMotionEvent) {
				window.addEventListener('devicemotion', deviceMotionHandler, false);
			} else {
				alert('not support mobile event');
			}
			function deviceMotionHandler(eventData) {
				var acceleration = eventData.accelerationIncludingGravity;
				var curTime = new Date().getTime();
				if (curTime - last_update > 100) {
					var diffTime = curTime - last_update;
					last_update = curTime;
					x = acceleration.x;
					y = acceleration.y;
					z = acceleration.z;
					var speed =
						Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
					if (speed > SHAKE_THRESHOLD && begin) {
						game_bg.x -= DISTANCE;
						game_bg.width += DISTANCE;
						scene.x -= DISTANCE;
						paodao.x -= DISTANCE;
						paodao.width += DISTANCE;
						paodaoNum++;
						if (paodaoNum % 10 == 0) {
							// console.log('震动了');
							if (navigator.vibrate) {
								navigator.vibrate(1000);
							} else if (navigator.webkitVibrate) {
								navigator.webkitVibrate(1000);
							}
						}
						userScore.text = paodaoNum;
					}
					last_x = x;
					last_y = y;
					last_z = z;
				}
			}
			setTimeout(function() {
				window.removeEventListener('devicemotion', deviceMotionHandler, false);
			}, gameTime * 1000);
		}
		function qianqiu() {
			/**铅球游戏
			 * @qianQiuNum 用户得分
			 * @click 游戏事件
			 * @qq_energy 能量值
			 * @qq_energyBg 能量值遮罩
			 * @flag 防止用户多点触摸
			 */
			var click,
				qq_energy,
				qq_energyBg,
				flag,
				qianQiuNum = 0;
			qq_energy = game.add.image(198, 842, 'qq_energy');
			qq_energyBg = game.add.image(198, 842, 'qq_energyBg');
			qq_energyBg.scale.set(70, 25);
			game.add.image(0, 0, 'game22').bottom = game.height;
			click = game.add.image(266, 954, 'click');
			click.scale.set(22);
			click.inputEnabled = true;
			click.events.onInputUp.add(function() {
				if (begin) {
					flag = true;
					qianQiuNum++;
					userScore.text = qianQiuNum;
					if (qq_energyBg.height < 0) {
						qq_energyBg.height = 0;
						return;
					}
					qq_energyBg.height -= 0.7;
				}
			}, this);
			document.addEventListener('touchend', touchend, false);
			setTimeout(function() {
				click.destroy();
				document.removeEventListener('touchend', touchend, false);
			}, gameTime * 1000 + 3000);

			function touchend(e) {
				if (flag) {
					qianQiuNum -= e.touches.length;
					qq_energyBg.height += 0.7 * e.touches.length;
					userScore.text = qianQiuNum;
					flag = false;
				}
			}
		}
		function tiaogao() {
			/**跳高游戏
			 * @langan 栏杆
			 */
			scene.destroy();
			var langan;
			game.add.image(0, 0, 'game33').bottom = game.height;
			langan = game.add.image(game.world.centerX, 0, 'langan');
			langan.anchor.set(0.5);
			langan.bottom = game.height;
			game.add
				.tween(langan)
				.to(
					{ y: langan.y + langan.height - 200 },
					gameTime * 1000,
					'Linear',
					true
				);
			game.add
				.tween(langan.scale)
				.to({ x: 1.5, y: 1.5 }, gameTime * 1000, 'Linear', true);
			touch('y');
		}
		function tiaoyuan() {
			// 跳远
			var ty_line = game.add.tileSprite(0, 0, 10, scene.height - 1, 'ty_line');
			ty_line.x = game.world.width;
			ty_line.bottom = game.world.height;
			touch('x', ty_line);
		}
		function touch(direction, Obj) {
			/**
			 * @direction 左右滑动(x)||上下滑动(y)
			 * @Obj 游戏操作的对象
			 * @start 触摸滑动的值
			 * @click 第一次触摸的值(用于计算滑动的角度)
			 * @step 第一次触摸的值(触摸的位置与滑动的距离是否在规定范围内)
			 * @ang 第一次触摸的值到当前触摸点的距离
			 * @turnXia 记录向下的转折点
			 * @turnShang 记录向上的转折点
			 * @angle 角度
			 * @score 分数
			 * @count 是否满足得分
			 * @distance 滑动的距离
			 */
			var startX,
				startY,
				clickX,
				clickY,
				stepX,
				stepY,
				angX,
				angY,
				turnXiaX,
				turnShangX,
				turnShangY,
				turnXiaY,
				angle,
				distance,
				score = 0,
				count = [];
			document.addEventListener('touchmove', touchMove, false);
			document.addEventListener('touchstart', touchStart, false);
			function touchStart(e) {
				turnX = stepX = clickX = e.touches[0].pageX;
				turnY = stepY = clickY = e.touches[0].pageY;
				turnXiaX = turnShangX = e.touches[0].pageX;
				turnShangY = turnXiaY = e.touches[0].pageY;
			}
			function touchMove(e) {
				startX = e.touches[0].pageX;
				startY = e.touches[0].pageY;
				angX = startX - clickX;
				angY = startY - clickY;
				angle = Math.floor(Math.abs(Math.atan2(angY, angX) * 180 / Math.PI));
				if (direction == 'x') {
					// console.log('左右滑动' )
					if (clickX >= startX) {
						// console.log('向左滑动')
						count[0] = true;
						turnShangX = startX;
						stepX = turnXiaX;
					} else {
						// console.log('向右滑动')
						count[1] = true;
						turnXiaX = startX;
						stepX = turnShangX;
					}
				} else if (direction == 'y') {
					// console.log('上下滑动' )
					if (clickY >= startY) {
						// console.log('向上滑动')
						count[0] = true;
						turnShangY = startY;
						stepY = turnXiaY;
					} else {
						// console.log('向下滑动')
						count[1] = true;
						turnXiaY = startY;
						stepY = turnShangY;
					}
				}
				if (direction == 'x') {
					distance = Math.floor(document.documentElement.clientWidth / 8);
					if (angle > 130 || angle < 45 || angle == 0) {
						// console.log('角度符合')
						clickX = startX;
						clickY = startY;
						if (stepX - distance >= startX || stepX + distance <= startX) {
							// console.log('距离符合')
							if (count[0] && count[1] && begin) {
								// console.log('滑动成功');
								score++;
								userScore.text = score;
								Obj.width += 2;
								Obj.x -= 2;
								scene.x -= 2;
								count[0] = count[1] = false;
							}
						}
					}
				} else if (direction == 'y') {
					distance = Math.floor(document.documentElement.clientHeight / 7);
					if ((angle < 130 && angle > 45) || angle == 0) {
						// console.log('角度符合')
						clickX = startX;
						clickY = startY;
						if (stepY - distance >= startY || stepY + distance <= startY) {
							// console.log('距离符合')
							if (count[0] && count[1] && begin) {
								// console.log('滑动成功');
								score++;
								userScore.text = score;
								count[0] = count[1] = false;
							}
						}
					}
				}
			}
			setTimeout(function() {
				document.removeEventListener('touchmove', touchMove, false);
				document.removeEventListener('touchstart', touchStart, false);
				// console.log('移除事件');
			}, gameTime * 1000 + 3000);
		}
	};
};
var scoreState = function() {
	var userScore;
	this.init = function() {
		if (c.data.userScore * c.data.CoreNumber > c.data.EnergyHighest) {
			userScore = c.data.EnergyHighest;
		} else {
			userScore = c.data.userScore * c.data.CoreNumber;
		}
	};
	this.create = function() {
		/**
		 * @torch 火炬
		 * @scoreImg 分数框
		 * @scoreText 分数文本
		 * @score 分数
		 * @p 文字说明
		 */
		var torch, scoreImg, scoreText, p;
		game.add.image(0, 0, 'game_bg');
		torch = c.AddTorch(260, 1);
		torch.y = torch.y + 60;
		scoreImg = game.add.image(game.world.centerX, 184, 'score');
		scoreText = game.add.text(game.world.centerX, 184, userScore, {
			fill: '#fff',
			font: '140px Arial',
			align: 'center'
		});
		p = game.add.text(
			game.world.centerX,
			914,
			'你本次为德赛西威运动会火炬添加\t\t\t\t\t\t\t\t\t个能量',
			{ fill: '#000', font: '25px Arial', align: 'center' }
		);
		c.Click(-140, 1050, '排行榜', 'line2', function() {
			openTopWay = 'gameEnd';
			rankingID = '个人';
			game.state.add('Top', TopState);
			game.state.start('Top');
		});
		c.Click(140, 1050, '继续游戏', 'line2', function() {
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
				}
			});
			game.state.add('select', selectState);
			game.state.start('select');
		});
		p.anchor.set(0.5);
		game.add
			.text(523, 915, userScore, {
				fill: '#f00',
				font: '25px Arial',
				align: 'center'
			})
			.anchor.set(0.5);
		scoreImg.anchor.set(0.5);
		scoreText.anchor.set(0.5);
		scoreImg.scale.set(1, 0.9);
	};
};
var TopState = function() {
	/**
	 * @userData 个人信息
	 * @troopsData 队伍排行
	 * @userTopData 个人排行
	 */
	var userData, troopsData, userTopData;
	this.init = function() {
		if (rankingID == '队伍' || rankingID == '个人') {
			/* 用户信息 */
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
					c.data.userPic = data.Pic;
					c.data.userDesaiScore = data.DesaiScore;
					c.data.userScoreRank = data.ScoreRank;
					c.data.userURL = data.URL;
				}
			});
		}
		if (rankingID == '个人') {
			/* 个人排行 */
			$.ajax({
				type: 'POST',
				url: c.data.url + 'WXClientService.ashx?pagetype=rankInfo2',
				async: false,
				data: {
					uID: c.data.uID
				},
				success: function(data) {
					var data = eval('(' + data + ')').data;
					userTopData = data;
				}
			});
		} else if (rankingID == '队伍') {
			/* 队伍排行榜 */
			$.ajax({
				type: 'POST',
				url: c.data.url + 'Desai_TeamService.ashx?pagetype=rankInfo',
				async: false,
				data: {
					uID: c.data.uID
				},
				success: function(data) {
					var data = eval('(' + data + ')').data;
					var arr = [];
					var arrData = [];
					data.forEach(function(e) {
						arr.push(parseInt(e.TeamEnergy));
					}, this);
					arr.sort(function(a, b) {
						return b - a;
					});
					for (var i = 0; i < arr.length; i++) {
						for (var j = 0; j < data.length; j++) {
							var e = data[j];
							if (parseInt(e.TeamEnergy) == arr[i]) {
								arrData.push(e);
							}
						}
					}
					troopsData = arrData;
				}
			});
		}
	};
	this.preload = function() {
		if (rankingID == '队伍' || rankingID == '个人') {
			game.load.image('userPic', c.data.userPic);
		}
		if (rankingID == '个人') {
			for (var i = 0; i < userTopData.length; i++) {
				var e = userTopData[i];
				game.load.image('userPic' + (i + 1), e.Pic);
			}
		}
	};
	this.create = function() {
		game.add.image(0, 0, 'tpl_module');
		c.Title('能量榜');
		game.add.image(game.world.centerX, 310, 'line3').anchor.set(0.5);
		var PicShadeLine = game.add.graphics(0, 0); // 边框
		var PicShade = game.add.graphics(0, 0); // 遮罩
		var userPic = game.add.image(94, 161, 'userPic'); // 用户头像
		var userTextString =
			c.data.wxName +
			'，感谢你为德赛西威第七届田径运动会火炬添加' +
			c.data.userDesaiScore +
			'个能量，在小伙伴排名第' +
			c.data.userScoreRank +
			'位。';
		var userTextConcent = '';
		var numColorBeg = userTextString.indexOf('名第') + 2;
		var numColorEnd = userTextString.length - 2;
		var sumColorBeg = userTextString.indexOf('添加') + 2;
		var sumColorEnd = userTextString.indexOf('个能量');
		for (var i = 0; i < userTextString.length; i++) {
			var t = userTextString[i];
			if (i % 16 == 0 && i > 0) {
				userTextConcent += '\n';
			}
			if (Number(t)) {
				t_String = t + '';
				t = ToDBC(t_String);
				function ToDBC(txtstring) {
					var tmp = '';
					for (var i = 0; i < txtstring.length; i++) {
						if (txtstring.charCodeAt(i) == 32) {
							tmp = tmp + String.fromCharCode(12288);
						}
						if (txtstring.charCodeAt(i) < 127) {
							tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
						}
					}
					return tmp;
				}
			}
			userTextConcent += t;
		}
		var userText = game.add.text(230, 161, userTextConcent, {
			fill: '#000',
			font: '25px Arial'
		});
		userText.addColor('#f00', sumColorBeg);
		userText.addColor('#000', sumColorEnd);
		userText.addColor('#f00', numColorBeg);
		userText.addColor('#000', numColorEnd);
		PicShadeLine.beginFill(0xff0000);
		PicShadeLine.drawRoundedRect(92, 159, 124, 124, 20);
		PicShade.beginFill(0x000000);
		PicShade.drawRoundedRect(92, 159, 124, 124, 15);
		userPic.width = 120;
		userPic.height = 120;
		userPic.mask = PicShadeLine;
		if (rankingID == '个人') {
			for (var i = 0; i < userTopData.length; i++) {
				var e = userTopData[i]; // 每条数据
				var sum = i * 70; // 上下间隔
				var graphics = game.add.graphics(0, 0); // 遮罩
				var graphics1 = game.add.graphics(0, 0); // 队名框
				var graphics2 = game.add.graphics(0, 0); // 得分框
				var usePicShade = game.add.graphics(0, 0);
				var text = i + 1;
				if (text < 4) text = '';
				game.add
					.text(104, 380 + sum, text, {
						fill: '#000',
						font: '35px Arial',
						align: 'center'
					})
					.anchor.set(0.5);
				var user_pic = game.add.image(137, 352 + sum, 'userPic' + (i + 1));

				user_pic.width = 55;
				user_pic.height = 55;
				usePicShade.beginFill(0x000000);
				usePicShade.drawCircle(163, 377 + sum, 48);
				user_pic.mask = usePicShade;
				graphics.beginFill(0x000000);
				graphics.drawRoundedRect(213, 350 + sum, 442, 55, 10);
				graphics1.beginFill(0xcccccc);
				graphics1.drawRoundedRect(208, 345 + sum, 320, 65, 10);
				graphics2.beginFill(0x132c81);
				graphics2.drawRoundedRect(518, 345 + sum, 140, 65, 10);
				graphics1.mask = graphics;
				graphics2.mask = graphics;
				game.add
					.text(588, 380 + sum, e.TeamEnergy, {
						fill: '#fff',
						font: '30px Arial',
						align: 'center'
					})
					.anchor.set(0.5);
				game.add
					.text(370, 380 + sum, e.Name, {
						fill: '#000',
						font: '25px Arial',
						align: 'center'
					})
					.anchor.set(0.5);
			}
			game.add.image(86, 348, 'top1').scale.set(0.5);
			game.add.image(88, 427, 'top2').scale.set(0.5);
			game.add.image(90, 496, 'top3').scale.set(0.5);
		}
		if (rankingID == '队伍') {
			for (var i = 0; i < troopsData.length; i++) {
				var e = troopsData[i]; // 每条数据
				var sum = i * 84; // 上下间隔
				var graphics = game.add.graphics(0, 0); // 遮罩
				var graphics1 = game.add.graphics(0, 0); // 队名框
				var graphics2 = game.add.graphics(0, 0); // 得分框
				game.add.text(94, 358 + sum, i + 1, {
					fill: '#000',
					font: '35px Arial',
					align: 'center'
				});
				game.add.image(132, 347 + sum, 'icon' + e.Pic).scale.set(0.7);
				graphics.beginFill(0x000000);
				graphics.drawRoundedRect(213, 350 + sum, 442, 55, 10);
				graphics1.beginFill(0xcccccc);
				graphics1.drawRoundedRect(208, 345 + sum, 320, 65, 10);
				graphics2.beginFill('0x' + e.Color);
				graphics2.drawRoundedRect(518, 345 + sum, 140, 65, 10);
				graphics1.mask = graphics;
				graphics2.mask = graphics;
				game.add
					.text(588, 380 + sum, e.TeamEnergy, {
						fill: '#fff',
						font: '30px Arial',
						align: 'center'
					})
					.anchor.set(0.5);
				game.add
					.text(370, 380 + sum, e.Name, {
						fill: '#000',
						font: '25px Arial',
						align: 'center'
					})
					.anchor.set(0.5);
			}
		}
		c.close(function() {
			if (openTopWay === 'gameEnd') {
				game.state.add('score', scoreState);
				game.state.start('score');
			} else {
				game.state.add('select', selectState);
				game.state.start('select');
			}
		});
		c.Click(-140, 1100, '邀请好友', 'line2', function() {
			shareHint();
		});
		c.Click(140, 1100, '朋友圈嘚瑟', 'line2', function() {
			shareHint();
		});
		function shareHint() {
			var btn = game.add.button(0, 0, 'shareHint', function() {
				btn.destroy();
			});
		}
	};
};
