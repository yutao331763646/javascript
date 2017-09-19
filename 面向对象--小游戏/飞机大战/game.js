function Game(level){
	if(Game.instance){
		return Game.instance;
	}
	this.hz = level*200;
	this.pause = false;
	this.enemes = new Set();
	Dom.call(this);
	this.body = document.getElementsByClassName("main")[0];
	Game.instance = this;
}

Game.prototype = {
	start : function(){
		//背景的移动
		this.bgmove();
		//加载动画
		this.loadding(function(){
			//我的飞机出现
			new MyPlane(this).show();
			//生成敌机
			this.autoCreateEnemes();
		}.bind(this));
	},
	loadding : function(callback){//加载动画
		var logo = document.createElement("div");
		logo.className = "logo";
		this.body.appendChild(logo);
		
		var loadbar = document.createElement("div");
		loadbar.className = "loading";
		this.body.appendChild(loadbar);
		
		var index = 1;
		var loadtimer = setInterval(function(){
			if(index > 3) index = 1;			
			loadbar.style.background = "url(images/loading"+ index++ +".png) no-repeat";
		},300);
		
		setTimeout(function(){
			clearInterval(loadtimer);
			logo.remove();
			loadbar.remove();
			callback();
		},4000);
	},
	bgmove : function(){//背景移动
		var val = 0;
		setInterval(function(){
			if(!this.pause) {
				this.body.style.backgroundPositionY = (val+=3) + "px";
			}
		}.bind(this),50);
	},
	autoCreateEnemes : function(){
		setInterval(function(){
			if(!this.pause) {
				var p1 =  Math.random();
				var p2 = Math.random();
				var p3 = Math.random();
				if(p1>0.3) { //生成一架小飞机
					this.enemes.add(new Enemy(ENEMY_TYPE_SMALL).show().move());
				}
				if(p2>0.7) { //
					this.enemes.add(new Enemy(ENEMY_TYPE_MIDDLE).show().move());
				}
				if(p3>0.95) { //生成一架大飞机
					this.enemes.add(new Enemy(ENEMY_TYPE_LARGE).show().move());
				}
			}
		}.bind(this),500);
	},
	isImpact : function(bullet){
		//观察者模式, 当观察成本过高， 让被观察者发生变化时，主动通知观察者做出反映
		//bullet ---->  this.enemes
		for(var enemy of this.enemes.values()) {
			var leftside = enemy.left()-bullet.width();
			var rightside = enemy.left()+enemy.width();
			var upside = enemy.top()-bullet.height();
			var downside = enemy.top()+enemy.height();
			
			if(bullet.left() > leftside && bullet.left() < rightside && bullet.top()>upside && bullet.top() < downside ) {
				bullet.explode();
				enemy.hurt();
			}
		}
	}
}
