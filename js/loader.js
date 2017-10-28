/**
 * 加载资源
 */
var loaderState = function(game) {
	var text, login, torch, line2, group, time;
	this.init = function() {
		login = game.add.image(0, 0, 'login');
		game.add
			.text(256, 944, c.data.memberInfo, {
				fill: '#f00',
				font: '25px Arial',
				align: 'center'
			})
			.anchor.set(0.5);
		group = game.add.group();
		line2 = game.add.image(game.world.centerX, 868, 'line2');
		line2.anchor.set(0.5);
		line2.scale.y = 0.7;
		text = game.add.text(game.world.centerX, 870, '进入会场', {
			fill: '#fff',
			font: '25px Arial',
			align: 'center'
		});
		text.anchor.set(0.5);
		group.add(line2);
		group.add(text);
		group.alpha = 0;

		/* 点的渐变 */
		addYuan();
		torch = c.AddTorch(290, 1.2); // 添加火炬
		time = setInterval(function() {
			addYuan();
		}, 3000);
		function addYuan() {
			var graphics0,
				graphics1,
				graphics2,
				graphics3,
				graphics4,
				graphics5,
				graphics6,
				graphics7,
				graphics8,
				graphics9,
				graphics10,
				graphics11,
				graphics12,
				graphics13,
				graphics14,
				graphics15,
				graphics16,
				graphics17,
				graphics18,
				graphics19;
			var arr = [
				graphics0,
				graphics1,
				graphics2,
				graphics3,
				graphics4,
				graphics5,
				graphics6,
				graphics7,
				graphics8,
				graphics9,
				graphics10,
				graphics11,
				graphics12,
				graphics13,
				graphics14,
				graphics15,
				graphics16,
				graphics17,
				graphics18,
				graphics19
			];
			for (var i = 0; i < 20; i++) {
				var bigOrSmall = 10 + Math.floor(Math.random() * 10);
				var x = Math.floor(Math.random() * game.world.width);
				var y = 400 + Math.floor(Math.random() * 400);
				var Color = colorVal();
				arr[i] = game.add.graphics(0, 0);
				arr[i].beginFill('0x' + Color);
				arr[i].drawCircle(x, y, bigOrSmall);
				arr[i].endFill();
				arr[i].alpha = 0;
				game.add
					.tween(arr[i])
					.to({ alpha: 1 }, 1000, 'Linear', true, 500, 1, true);
				setTimeout(function() {
					for (var i = 0; i < arr.length; i++) {
						arr[i].destroy();
					}
				}, 5000);
			}
			function colorVal() {
				var sum = [];
				for (var i = 0; i < 6; i++) {
					sum.push(reckon());
				}

				function reckon() {
					var num = Math.floor(Math.random() * 16);
					switch (num) {
						case 10:
							num = 'a';
							break;
						case 11:
							num = 'b';
							break;
						case 12:
							num = 'c';
							break;
						case 13:
							num = 'd';
							break;
						case 14:
							num = 'e';
							break;
						case 15:
							num = 'f';
							break;
					}
					return num + '';
				}
				return sum.join('');
			}
		}
	};
	this.preload = function() {
		game.load.image('icon1', 'images/icon1.png');
		game.load.image('icon2', 'images/icon2.png');
		game.load.image('icon3', 'images/icon3.png');
		game.load.image('icon4', 'images/icon4.png');
		game.load.image('icon5', 'images/icon5.png');
		game.load.image('icon6', 'images/icon6.png');
		game.load.image('icon7', 'images/icon7.png');
		game.load.image('icon8', 'images/icon8.png');
		game.load.image('line1', 'images/line1.png');
		game.load.image('line3', 'images/line3.png');
		game.load.image('click1', 'images/click1.png');
		game.load.image('click', 'images/click.png');
		game.load.image('game_bg', 'images/game_bg.jpg');
		game.load.image('game1', 'images/game1.png');
		game.load.image('game2', 'images/game2.png');
		game.load.image('game22', 'images/game22.png');
		game.load.image('game3', 'images/game3.png');
		game.load.image('game33', 'images/game33.png');
		game.load.image('game4', 'images/game4.png');
		game.load.image('game_logo', 'images/game_logo.png');
		game.load.image('circle', 'images/circle.png');
		game.load.image('circle_text', 'images/circle_text.png');
		game.load.image('circle_1', 'images/circle_1.png');
		game.load.image('circle_2', 'images/circle_2.png');
		game.load.image('circle_3', 'images/circle_3.png');
		game.load.image('score', 'images/score.png');
		game.load.image('selectGame', 'images/selectGame.png');
		game.load.image('tpl_module', 'images/tpl_module.jpg');
		game.load.image('paodao', 'images/paodao.jpg');
		game.load.image('gameRule', 'images/GameRule.png');
		game.load.image('qq_energy', 'images/qq_energy.png');
		game.load.image('qq_energyBg', 'images/qq_energyBg.png');
		game.load.image('ty_line', 'images/ty_line.png');
		game.load.image('langan', 'images/langan.png');
		game.load.image('shareHint', 'images/shareHint.png');
		game.load.image('return', 'images/return.png');
		game.load.image('qianqiuHint', 'images/qianqiuHint.png');
		game.load.image('top1', 'images/top1.png');
		game.load.image('top2', 'images/top2.png');
		game.load.image('top3', 'images/top3.png');
		game.load.atlasXML(
			'hand4',
			'images/elf-zuoyou/elf.png',
			'images/elf-zuoyou/elf.xml'
		);
		game.load.atlasXML(
			'hand3',
			'images/elf-shangxia/elf.png',
			'images/elf-shangxia/elf.xml'
		);

		game.load.atlasXML(
			'hand2',
			'images/elf-dian/elf.png',
			'images/elf-dian/elf.xml'
		);
		game.load.atlasXML(
			'hand1',
			'images/elf-yao/elf.png',
			'images/elf-yao/elf.xml'
		);
		// game.load.onFileComplete.add(function (progress) {
		// progressText.text = progress + '%';
		// loading_line.width += 111
		// });
	};
	this.create = function() {
		group.alpha = 1;
		game.input.onTap.add(function() {
			clearInterval(time);
			game.state.add('main', mainState);
			game.state.start('main');
		}, this);

		// game.state.add('select', selectState)
		// game.state.start('select')
		// game.state.add('Game', GameState)
		// game.state.start('Game');
		// game.state.add('score', scoreState)
		// game.state.start('score');
		// game.state.add('TopState', TopState)
		// game.state.start('TopState');

		// progressText.destroy()
		// logo1.destroy()
		// logo2.destroy()
		// loading_line.destroy()
	};
};
