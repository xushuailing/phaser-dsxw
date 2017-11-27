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
		console.log(3)
		var url = c.ajax.URL + 'Desai_TeamService.ashx?pagetype=TeamInfo';
		$.ajax({
			type: 'POST',
			url: url,
			async:false,
			data: {
				uID: 89,
				iD: 1
			},
			success: function(data) {
				var data = eval('(' + data + ')').data;
				data.forEach(function(val) {
					// console.log(val);
					troopsNames.push(val.Name);
					troopsColors.push(val.Color);
					Icons.push(val.Pic);
					YuanNums.push(val.TeamEnergy);
				}, this);
				// console.log(troopsNames);
			}
		});
	};
	this.create = function() {
		console.log(2)
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
console.log()
		troops = game.add.image(0, 0, 'tpl_module');
		c.Title('队伍方阵');
		for (var i = 0; i < 8; i++) {
			var Icon = Icons[i],
				Yuan = Yuans[i],
				YuanBg = YuanBgs[i],
				troopsName = troopsNames[i],
				YuanNum = YuanNums[i],
				troopsColor = troopsColors[i];
			if (i % 2 == 0) {
				var y = arcY + 230 * i / 2;
				game.add.button(arcX - 45, arcY - 45 + 230 * i / 2, Icon, btnClick);
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
				game.add.button(x - 45, arcY - 45 + 230 * (i - 1) / 2, Icon, btnClick);
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
			var ruleBg = game.add.image(0, 0, 'tpl_module');
			var rule = game.add.image(114, 244, 'gameRule');
			var ruleTitle = c.Title('游戏规则');
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
		text = game.add.text(game.world.centerX, 210, '点击选择你支持的队伍，为他们攒火炬能量', {
			fill: '#000',
			font: '20px Arial',
			align: 'center'
		});
		text.anchor.set(0.5);
		function btnClick(e) {
			console.log(e.key);
			game.state.add('select', selectState);
			game.state.start('select');
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
		text = game.add.text(
			game.world.centerX,
			game.world.height - 90,
			'已经\t\t88888\t\t参加活动，快来参加吧',
			{fill: '#000', font: '25px Arial', align: 'center'}
		);
		text.anchor.set(0.5);
		text.addColor('#f00', 2);
		text.addColor('#000', 9);
		c.Title('运动模式');
		var click1 = game.add.button(252, 269, 'click', function() {
			c.data.GameType = 1;
			game.state.add('GameState', GameState);
			game.state.start('GameState');
		});
		var click2 = game.add.button(481, 403, 'click', function() {
			c.data.GameType = 2;
			game.state.add('GameState', GameState);
			game.state.start('GameState');
		});
		var click3 = game.add.button(309, 605, 'click', function() {
			c.data.GameType = 3;
			game.state.add('GameState', GameState);
			game.state.start('GameState');
		});
		var click4 = game.add.button(107, 815, 'click', function() {
			c.data.GameType = 4;
			game.state.add('GameState', GameState);
			game.state.start('GameState');
		});
		click1.scale.set(18, 15);
		click2.scale.set(18, 15);
		click3.scale.set(25, 15);
		click4.scale.set(30, 20);
	};
};
var GameState = function() {
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
			countDown = 3;
		game_bg = game.add.tileSprite(0, 0, 750, 1206, 'game_bg');
		c.data.GameType = 4;
		switch (c.data.GameType) {
			case 1:
				var sceneImg = 'game1';
				var hintText = '拿起手机上下摇30秒\n要出你的能量';
				var hand = 'hand1';
				break;
			case 2:
				var sceneImg = 'game2';
				var hintText = '狂戳手机30秒\n戳出你的能量';
				var hand = 'hand2';
				break;
			case 3:
				var sceneImg = 'game3';
				var hintText = '上下滑动手机30秒\n滑出你的能量';
				var hand = 'hand3';
				break;
			case 4:
				var sceneImg = 'game4';
				var hintText = '左右滑动手机30秒\n滑出你的能量';
				var hand = 'hand4';
				break;
		}
		position(circle, 'circle');
		circleTime = position(circleTime, 'circle_text');
		hand = position(hand, hand);
		hand.scale.set(0.7);
		hand.y = hand.y + 350;
		hint = game.add.text(game.world.centerX, game.world.centerY, hintText, {
			fill: '#000',
			font: '25px Arial',
			align: 'center'
		});
		hint.anchor.set(0.5);
		userScore = game.add.text(0, 761, '0', {
			fill: '#000',
			font: '30px Arial',
			align: 'center'
		});
		userScore.x = game.world.width - 40;
		userScore.anchor.set(0.5);
		scene = game.add.image(0, 0, sceneImg);
		scene.bottom = game.height;
		time = setInterval(function() {
			// 切换倒计时
			if (countDown == 0) {
				timing(); // 开启游戏倒计时
				clearInterval(time); // 停止倒计时
				circleTime.destroy(); // 杀死圆心内容
				return;
			}
			circleTime.destroy(); // 杀死圆心内容
			circleTime = position(circleTime, 'circle_' + countDown); // 更换圆心内容
			countDown--;
		}, 1000);
		function timing() {
			/**30s倒计时
			 * @time 计时器
			 * @numText 倒计时数字
			 * @grd 数字颜色
			 */
			var time, grd, numText;
			numText = game.add.text(
				game.world.centerX,
				game.world.centerY,
				gameTime,
				{
					fill: '#fff',
					font: '150px Arial',
					align: 'center'
				}
			);
			numText.y = 397 / 2 + 50;
			numText.anchor.set(0.5);
			grd = numText.context.createLinearGradient(10, 10, 100, numText.height);
			grd.addColorStop(0.25, '#cb1456');
			grd.addColorStop(0.5, '#f39d08');
			grd.addColorStop(0.75, '#70bc55');
			grd.addColorStop(1, '#26b8b8');
			numText.fill = grd; // 应用渐变
			switch (c.data.GameType) {
				case 1:
					paobu(); // 跑步游戏
					break;
				case 2:
					qianqiu(); // 铅球游戏
					break;
				case 3:
					tiaogao(); // 跳高游戏
					break;
				case 4:
					tiaoyuan(); // 跳远
					break;
			}
			time = setInterval(function() {
				gameTime--;
				numText.text = gameTime;
				if (gameTime < 1) {
					// 切换场景
					game.state.add('score', scoreState);
					game.state.start('score');
					clearInterval(time);
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
					if (speed > SHAKE_THRESHOLD) {
						game_bg.x -= DISTANCE;
						game_bg.width += DISTANCE;
						scene.x -= DISTANCE;
						paodao.x -= DISTANCE;
						paodao.width += DISTANCE;
						paodaoNum++;
						if (paodaoNum % 10 == 0) {
							console.log('震动了');
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
				flag = true;
				qianQiuNum++;
				userScore.text = qianQiuNum;
				if (qq_energyBg.height < 0) {
					qq_energyBg.height = 0;
					return;
				}
				qq_energyBg.height -= 0.7;
			}, this);
			document.addEventListener('touchend', touchend, false);
			function touchend(e) {
				if (flag) {
					qianQiuNum -= e.touches.length;
					qq_energyBg.height += 0.7 * e.touches.length;
					userScore.text = qianQiuNum;
					flag = false;
				}
			}
			setTimeout(function() {
				click.destroy();
				document.removeEventListener('touchend', touchend, false);
			}, gameTime * 1000);
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
					{y: langan.y + langan.height - 200},
					gameTime * 1000,
					'Linear',
					true
				);
			game.add
				.tween(langan.scale)
				.to({x: 1.5, y: 1.5}, gameTime * 1000, 'Linear', true);
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
							if (count[0] && count[1]) {
								console.log('滑动成功');
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
							if (count[0] && count[1]) {
								console.log('滑动成功');
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
				console.log('移除事件');
			}, gameTime * 1000);
		}
	};
};
var scoreState = function() {
	this.create = function() {
		/**
		 * @torch 火炬
		 * @scoreImg 分数框
		 * @scoreText 分数
		 * @p 文字说明
		 */
		var torch, scoreImg, scoreText, p;
		game.add.image(0, 0, 'game_bg');
		torch = c.AddTorch(260, 1);
		torch.y = torch.y + 60;
		scoreImg = game.add.image(game.world.centerX, 184, 'score');
		scoreText = game.add.text(game.world.centerX, 184, '888', {
			fill: '#fff',
			font: '140px Arial',
			align: 'center'
		});
		p = game.add.text(
			game.world.centerX,
			914,
			`你已经为德赛西威运动火炬攒出\t\t${88888}\t\t个能量`,
			{fill: '#000', font: '25px Arial', align: 'center'}
		);
		c.Click(-140, 1050, '排行榜', function() {
			game.state.add('Top', TopState);
			game.state.start('Top');
		});
		c.Click(140, 1050, '继续游戏', function() {
			game.state.add('select', selectState);
			game.state.start('select');
		});
		p.anchor.set(0.5);
		p.addColor('#f00', 14);
		p.addColor('#000', 21);
		scoreImg.anchor.set(0.5);
		scoreText.anchor.set(0.5);
		scoreImg.scale.set(1, 0.9);
	};
};
var TopState = function() {
	/**
	 * @top 排行榜内容元素
	 * @list 列表元素
	 * @user 个人信息元素
	 * @troops_list 列表html
	 * @user_info 个人信息html
	 */
	this.create = function() {
		var top,
			list,
			user,
			user_info,
			troops_list = '';
		top = document.getElementById('top');
		list = top.children[1];
		user = top.children[0];
		game.add.image(0, 0, 'tpl_module');
		game.add.image(game.world.centerX, 310, 'line3').anchor.set(0.5);
		var icons = [
			'icon1',
			'icon2',
			'icon3',
			'icon4',
			'icon5',
			'icon6',
			'icon7',
			'icon8'
		];
		var troopsNames = [
			'制造一队',
			'制造二队',
			'制造三队',
			'制造四队',
			'制造五队',
			'制造六队',
			'制造七队',
			'制造八队'
		];
		var troopsColors = [
			'EA5513',
			'0B6FBB',
			'07913B',
			'38BFEF',
			'E83956',
			'0BA299',
			'7EBC3D',
			'F09B1A'
		];

		var a = '人名';
		var b = '2';
		var cc = './images/game_bg.jpg';
		user_info = `<img class="user_icon" src="${cc}" alt="">
						 <p class="user_text">${a}\t\t，感谢你为德赛西威运动会火炬攒出888能量，你所在的队伍目前排名第${b}位。</p>`;
		c.Title('运动达人榜');
		for (var i = 0; i < 8; i++) {
			var troopsColor = troopsColors[i];
			var icon = icons[i];
			var troopsName = troopsNames[i];
			troops_list += `<li>
                <span>${i + 1}</span>
                <img src="./images/${icon}.png" alt="">
                <div>
                    <div class="name">${troopsName}</div>
                    <div class="score" style='background:#${troopsColor};'>888</div>
                </div>
			  </li>`;
		}
		list.innerHTML = troops_list;
		user.innerHTML = user_info;
		top.style.display = 'block';
		c.Click(-140, 1100, '邀请好基友', function() {
			console.log('邀请好基友');
		});

		c.Click(140, 1100, '朋友圈嘚瑟', function() {
			console.log('朋友圈嘚瑟');
		});
		c.close(function() {
			top.style.display = 'none';
			game.state.add('score', scoreState);
			game.state.start('score');
		});
	};
};
