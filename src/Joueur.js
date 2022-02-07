class Joueur {
    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
        this.$score.textContent=  this._score;
        console.log(this)
    }

    get lives(){
        return this._lives;
    }

    set lives(value){
        this._lives = value;
        this.$lives.textContent = this._lives;
        console.log(this)
    }

    constructor(scoreId,livesId) {
        this._score = 0;
        this._lives = 3;
        this.scoreId = scoreId;
        this.livesId = livesId;
        this.$el = document.getElementById(scoreId);
        this.$el = document.getElementById(livesId);
        this.$score = this.$el.querySelector(".score")
        this.$lives = this.$el.querySelector(".lives")
    }


}