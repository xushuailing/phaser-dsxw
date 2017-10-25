## 文字创建
- `game.add.text(x,y,text,style?,group?)`
    - fill: 文字颜色
    - font: 文字字体
    - fontSize: 文字大小
    - fontWeight: 文字粗细
    - style.background: 文字背景
    - stroke: 描边颜色
    - strokeThickness: 描边宽度
    - wordWrap: 是否换行
    - wordWrapWidth: 换行宽度
    - lineSpacing = -20
    - fontStyle:样式
    - 设置数字颜色
		- grd = numText.context.createLinearGradient(0, 0, 0, numText.height);
		- grd.addColorStop({0-1}, '#26b8b8');
		- numText.fill = grd;// 应用渐变
    - {fill: '#000',font: '20px Arial',align: 'center'}
## 图形创建
- var graphics = game.add.graphics(0,0) // 创建
- graphics.beginFill(0x000000); // 背景颜色
- graphics.drawRect(0,0,100,100) //创建方形
- graphics.drawCircle(180,100,100) //创建圆形
- graphics.drawRoundedRect(x，y，width，height，radius)// 创建圆角矩形
- graphics.drawEllipse(150,200,100,50) //创建椭圆
- graphics.arc(100,300,50,0,Math.PI) //创建半圆
- graphics.drawPolygon(50,380,200,300,250,430,180,480,20,450) //创建多边形
- graphics.endFill(); // 填充
- graphics.lineStyle(粗细,0x000000)// 描边
- graphics.moveTo(50,50) // 起点
- graphics.lineTo(300,100) // 下一个点
- graphics.clear() // 清除

## 对象的操作
- Obj.alpha // 不透明度
- Obj.x // x坐标位置
- Obj.y // y坐标位置
- Obj.scale.set(x,y) // 缩放
- Obj.anchor.set(x,y) // 位置
- Obj.destroy() // 杀死对象
- Obj.visible // 显示隐藏
- Obj.angle // 旋转
- Obj.bringToTop // 层级
- Obj.input.enableDrag(); // 开启拖动
## 创建组
- `var group = game.add.group()`
- [https://www.phaser-china.com/docs/Phaser.Group.html#toc0]
### 添加组的子元素
- 组名.create(x,y,key,frame?,exists?) // 创建子元素并添加
- 组名.add(key) // 直接添加

## 音频
- `game.add.audio('key',音量大小1-0,是否循环)`
    - play(标记?,位置?,音量?,是否循环?,是否强制?) // 播放
    - pause() // 暂停
    - resume() // 恢复
    - stop() // 停止
    - obj.onStop.add(fun,this)

## 按钮
`game.add.button（x，y，key，callback，callbackContext，overFrame，outFrame，downFrame，upFrame，group）`


## 补间动画
- `game.add.tween(Obj)`
> 从当前状态到指定状态
- `tween.to(properties(指定状态),duration(持续的时间),ease(缓动函数{Linear}),autoStart(是否立即开始),delay(延迟),repeat(重复次数),yoyo(是否反向运动)) `
> 从指定状态到当前状态
- `tween.from(properties(当前状态),duration(持续的时间),ease(缓动函数),autoStart(是否立即开始),delay(延迟),repeat(重复次数),yoyo(是否反向运动))`
    - tween.stare() // 开始
    - tween.stop() // 停止
    - tween.pause() // 暂停
    - tween.resume() // 恢复

## Animation
- 必须是**spritesheet**对象和**atlas**对象加载的图片
> 定义动画
- `Obj.animations.add(name,frames)`
> 播放动画
- `Obj.animations.play(name,frames,loop(是否循环),killOnComplete(执行完是否移除))`
> 停止动画
- `Obj.animations.stop(name)`

## Atlas
- `game.load.atlasXML(key,imgURL,xmlURL)`

## 定时器
- 开启定时器
    - `game.time.events.loop(time,fun)`
- 关闭定时器
    - `game.time.events.remove(Obj);`
- 开启延时器
    - `game.time.events.add(time, fun, this);`


- onStart.add(fun, this); // 开始回调
- onComplete.add(fun, this); // 结束回调