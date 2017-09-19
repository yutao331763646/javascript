function MyPlane(game){
	Dom.call(this);
	this.game = game;
	this.body = document.createElement("div");
}

MyPlane.prototype = {
	init : function(){
		this.body.className = "my-warplain";
	},
	show : function(){
		this.init();
		this.game.body.appendChild(this.body);
		this.left(this.game.width()/2-this.width()/2);
		this.body.style.top = "80%";
		//添加控制监听
		this.startListener(MYPLANE_LISTENER_TYPE_MOUSE);
		//自动开火
		this.autoFire();
	},
	startListener : function(type){
		var self = this;
		switch(type) {
			case MYPLANE_LISTENER_TYPE_KEY : {
				break;
			}
			case MYPLANE_LISTENER_TYPE_MOUSE : {
				document.addEventListener("mousemove", function(e){
					if(!new Game().pause) {
						self.left( Math.min(self.game.width()-self.width(), Math.max(0, e.clientX - self.game.left() - self.width()/2) ) );
						self.top( Math.min(self.game.height()-self.height(), Math.max(0, e.clientY - self.game.top() - self.height()/2)) );
					}
				})
				break;
			}
		}
	},
	autoFire : function(){
		setInterval(function(){
//			console.log("发射，biu! biu! biu!");
			if(!new Game().pause) {
				new Bullet(this.game, this).show().move();
			}
		}.bind(this), this.game.hz);
	}
}
