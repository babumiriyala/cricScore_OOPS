'use strict'

class Player{
	constructor(name,strike){
		this.playerName=name;
		this.striker=strike;
		this.score=0;
	}
	addRuns(runScored){
		if (runScored < 0){
			return;
		}
		this.score+=runScored;
	}
	setStrike(strike){
		this.striker=strike;
	}
	isStriker(){
		return this.striker;
	}
	printScore(){
		console.log(this.playerName+' has scored '+this.score);
	}

}

class Scorer{
	constructor(player1,player2){
		this.totalScore=0;
		this.player1=player1;
		this.player2=player2;
		this.currentStriker=null;
		this.ballsBowled=0;
	}
	checkOverCompleted(){
		if (this.ballsBowled%6 === 0){
			return true;
		}else{
			return false;
		}
	}
	rotateStrike(){
		if (player1.isStriker()){
			player1.setStrike(false);
			player2.setStrike(true);
			this.currentStriker=player2;
		}else{
			player2.setStrike(false);
			player1.setStrike(true);
			this.currentStriker=player1;
		}
	}
	checkCurrentStriker(){
		if (player1.isStriker()){
			this.currentStriker=player1;
		}else{
			this.currentStriker=player2;
		}
	}
	computePlayerScore(arrRuns){
		this.checkCurrentStriker();
		var arrLen=arrRuns.length;
		var i=0;
		for(i=0;i<arrLen;i++){
			// Take the run scored and add it to the 
			// player on strike
			var currentRun=arrRuns[i];
			this.currentStriker.addRuns(currentRun);
			// Check if the strike needs to be rotated based
			// on the runs scored - odd --> rotate strike
			if (currentRun%2 != 0){
				this.rotateStrike();
			}
			this.ballsBowled++;
			// Check if the over is completed
			if (this.checkOverCompleted()){
				this.rotateStrike();
			}

		}

	}
}

var player1=new Player('Sachin',true);
var player2=new Player('Dravid',false);

console.log(player1);
console.log(player2);

var scoreObj = new Scorer(player1,player2);
scoreObj.computePlayerScore([2,3,0,0,4,6,1,2,3,4,2,1]);

player1.printScore();
player2.printScore();