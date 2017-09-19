
function Enemy(type){
	this.type = type;
	this.body = document.createElement("div");
	Dom.call(this);
}
Enemy.prototype = {
	init : function(){
		switch(this.type) {
			case ENEMY_TYPE_SMALL : {
				this.body.className = "enemy-small";
				this.speed = ENEMY_SMALL_SPEED;
				this.hp = ENEMY_SMALL_HP;
				this.dieimgs = ["plain1_die1.png","plain1_die2.png","plain1_die3.png"];
				this.left(randomInt(0, new Game().width()-this.width()));
				this.top(-0);
				break;
			}
			case ENEMY_TYPE_MIDDLE : {
				this.body.className = "enemy-middle";
				this.speed = ENEMY_MIDDLE_SPEED;
				this.hp = ENEMY_MIDDLE_HP;
				this.dieimgs = ["plain2_die1.png","plain2_die2.png","plain2_die3.png","plain2_die4.png"];
				this.left(randomInt(0, new Game().width()-this.width()));
				this.top(-0);
				break;
			}
			case ENEMY_TYPE_LARGE : {
				this.body.className = "enemy-large";
				this.speed = ENEMY_LARGE_SPEED;
				this.hp = ENEMY_LARGE_HP;
				this.dieimgs = ["plain3_die1.png","plain3_die2.png","plain3_die3.png","plain3_die4.png","plain3_die5.png","plain3_die6.png"];
				this.left(randomInt(0, new Game().width()-this.width()));
				this.top(-0);
				break;
			}
		}
	},
	show : function(){
		new Game().body.appendChild(this.body);
		this.init();
		return this;
	},
	move : function(){
		this.movetimer = setInterval(function(){
			if(!new Game().pause) {
				this.top( this.top()+this.speed );
				if(this.top() > new Game().height()) {
					clearInterval(this.movetimer);
					this.destroy();
					new Game().enemes.delete(this);
				}
			}
		}.bind(this),40);
		return this;
	},
	hurt : function(){
		if(--this.hp == 0) {
			this.explode();	
		}
	},
	explode : function(){
		clearInterval(this.movetimer);
		setTimeout(function(){
			if(this.dieimgs.length > 0) {
				this.body.style.background = "url(images/"+this.dieimgs.shift()+")";
				setTimeout(arguments.callee.bind(this),80);
			} else {
				this.destroy();
			}
		}.bind(this),80);
	},
	destroy : function(){
		this.body.remove();
	}
}
