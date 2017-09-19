
function Bullet(game, myplane){
	Dom.call(this);
	this.game = game;
	this.myplane = myplane;
	this.body = document.createElement("div");	
}
Bullet.prototype = {
	init : function(){
		this.body.className = "bullet";
	},
	show : function(){
		this.init();
		this.game.body.appendChild(this.body);
		this.left(this.myplane.left()+this.myplane.width()/2-this.width()/2);
		this.top(this.myplane.top()-this.height());
		return this;
	},
	move : function(){
		this.movetimer = setInterval(function(){
			if(!new Game().pause) {
				this.top( this.top()-15 );
				new Game().isImpact(this)
				if(this.top() < -this.height()) {
					this.destroy();
					clearInterval(this.movetimer);
				}
			}
		}.bind(this), 30);
	},
	explode : function(){
		clearInterval(this.movetimer);
		this.body.className = "bullet_die";
		setTimeout(function(){
			this.body.style.background = "url(images/die2.png)";
			setTimeout(function(){
				this.destroy();
			}.bind(this), 100);
		}.bind(this),100);
	},
	destroy : function(){
		this.body.remove();
	}
}


