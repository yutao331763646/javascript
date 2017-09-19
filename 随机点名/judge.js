//裁判
function Judge(){
	var self = this;
	this.isPking = false;//是否比赛中
	this.times = 1;//第几轮攻击
	this.attacker = null;//进攻方
	this._screen = document.getElementsByClassName("pkcontent")[0];//大屏幕
	this.winner = null;
	this.timer = null;
	this.firetimer = null;
	
	this.init = function(){
		this.times = 1;
		this.winner = null;
		this._screen.innerHTML = "";
		$(".gameover").fadeOut();
		this.firetimer ? clearInterval(this.firetimer) : "";
		this.attacker.init();
		this.attacker.enemy.init();
	}
	
	this.start = function(){
		if(this.isPking) {
			return;
		} else {
			this.isPking = true;
			this.init();
		}
		this.timer = setInterval(self.fight, 500);
	}
	
	this.fight = function(){
		var atk = self.attacker.atk();
		var oP = document.createElement("p");
		oP.innerHTML = "第"+ self.times++ +"轮：【"+ self.attacker.pname +"】"+ atk.skillname + atk.damage +"点血量";
		self._screen.appendChild(oP);
		oP.scrollIntoView();
		if(self.attacker.enemy.hp <= 0) {
			clearInterval(self.timer);//清理定时器
			
			var over = document.createElement("p");
			over.style.color = "red";
			over.innerHTML = self.attacker.enemy.pname +"精疲力尽，挂掉了！";
			self.winner = self.attacker.pname;
			self._screen.appendChild(over);//增加最后一行，输出游戏结束
			over.scrollIntoView();
			self.isPking = false; //打斗标识设为false,标识打完了
			self.finish();
		}
		//转换攻击选手
		self.attacker = self.attacker.enemy;
	}
	
	this.finish = function(){
		$gv = $(".gameover");
		$gv.html(this.winner+"胜利！");
		$gv.fadeIn(500);
		this.firetimer = setInterval(function(){
			var coord = {
				x:randomInt(1,$(window).innerWidth()),
				y:randomInt(1,$(window).innerHeight())
			};
			//console.log(coord);
			launch(coord);
		},1500);
	}
}
