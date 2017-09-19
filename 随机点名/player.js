//选手
function Player(pname, ele, hp){
	this.pname = pname;//姓名
	this.hp = hp; //血量
	this.ele = ele || null; //血条
	this.defaultLength = this.ele.offsetWidth;//血条初始长度
	this.enemy = null;
	this.initHp = hp;
	this.hpscale = 0.99;
	this.init = function(){
		this.hp = 100;
		this.ele.style.width = "25%";
		this.ele.background = "green";
		this.defaultLength = this.ele.offsetWidth;
	}
	
	this.atk = function(){
		//选择技能
		//再决定攻击力
		var sk = this.skilling();
		this.enemy.hurt(sk.damage);
		return sk;
	}
	this.hurt = function(damage){
		this.hp -= damage;//减少血量
		//设定血条比例
		this.hpscale = (this.hp/this.initHp) < 0 ? 0 : (this.hp/this.initHp);
		
		//控制血条
		var val = Math.ceil(this.defaultLength*this.hpscale);
		
		this.ele.style.width = (val>0 ? val : 0) +"px";
//		console.log(this.ele.style.width);
		this.setColor(val);
	}
	this.skilling = function(){
		var self = this;
		return {
			damage : parseInt(Math.random()*30),
			skillname : self.skList[parseInt(Math.random()*7)]
		};
	}
	
	this.setColor = function(val){
		var R = Math.ceil(255*(1-this.hpscale)).toString(16);
		var G = Math.ceil(255*this.hpscale).toString(16);
		var B = "00";
		var bgcolor = "#" + (R.length<2?("0"+R):R) + (G.length<2?("0"+G):G) + B;
//		console.log(bgcolor);
		this.ele.style.background = bgcolor;
	}
}

Player.prototype.skList = ["发起了猛烈的进攻，打的他满地找牙, 对方损失了",
					"使用了大招，对方的假发被打掉了！损失了",
					"使用了魅惑技能，对方被迷的神魂颠倒，瞬间掉了2W的粉丝，损失了",
					"查看了葵花宝典，逼格提升了51%，对方被吓破了胆，损失了",
					"炫耀了他的大块肌肉，对方损失了",
					"狠狠的鄙视了对方一下，造成了巨大伤害，对方损失",
					"使用了情侣花式虐狗秀恩爱，一下子打中了对方的小心脏，对方损失"
					];
















