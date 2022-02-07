/**
 * ALGO: ceci est une classe...
 * Vous verrez ça plus tard en détail avec Rémi, pour l'instant on n'a pas trop besoin de savoir à quoi ça sert.
 */
class Tableau1 extends Phaser.Scene {
    /**
     * Précharge les assets
     */
    preload() {
        this.load.image('ball', 'assets/cercle.png')
        this.load.image('square', 'assets/carre.png')
    }



    create() {

        //alert('Cliquez sur OK pour commencer');

        /**new Joueur(lives,score);**/

        this.largeur = 800

        //Mur Haut
        this.haut = this.physics.add.image(0, 0, 'square').setOrigin(0, 0);
        this.haut.setDisplaySize(this.largeur, 20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

        //Mur Gauche
        this.gauche = this.physics.add.image(0, 0, 'square').setOrigin(0, 0);
        this.gauche.setDisplaySize(20, this.largeur);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);

        //Mur Droite
        this.droite = this.physics.add.image(this.largeur - 20, 0, 'square').setOrigin(0, 0);
        this.droite.setDisplaySize(20, this.largeur);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);

        //Balle
        this.balle = this.physics.add.image(this.largeur / 2, this.largeur / 2, 'ball').setOrigin(0, 0);
        this.balle.setDisplaySize(20, 20);
        this.balle.setTintFill(0xffffff);
        this.balle.body.setBounce(1.2, 1.2);
        this.balle.body.setVelocityX(Phaser.Math.Between(-50,50));
        this.balle.body.setVelocityY(Phaser.Math.Between(50,100));
        this.balle.body.setMaxVelocity(1000, 1000);

        //Raquette
        this.raquette = this.physics.add.image(this.largeur / 2 - 100, this.largeur - 20, 'square').setOrigin(0, 0);
        this.raquette.setDisplaySize(200, 20);
        this.raquette.setTintFill(0xffffff);
        this.raquette.body.setAllowGravity(false);
        this.raquette.setImmovable(true);

        //Collisions
        let me = this;
        this.physics.add.collider(this.balle, this.haut);
        this.physics.add.collider(this.balle, this.gauche);
        this.physics.add.collider(this.balle, this.droite);
        this.physics.add.collider(this.balle, this.raquette, function () {
           me.rebond(me.raquette)
        });


        this.creerBrique()
        this.initKeyboard()

    }

    rebond(raquette){


        let largeurRaquette = raquette.displayWidth;

        let positionRelativeRaquette =(this.balle.x-raquette.x);

        positionRelativeRaquette = (positionRelativeRaquette/largeurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette*2-1);
        console.log(positionRelativeRaquette);

        this.balle.setVelocityX( this.balle.body.velocity.y + positionRelativeRaquette * largeurRaquette)


    }

    creerBrique(){
        let me = this;
        let brique;

        for(let y=0;y<5;y++){
            for(let x=0;x<9;x++){
                console.log("brique",x,y)
                brique = this.physics.add.sprite( 60*x+130, 30*y+150, 'square').setOrigin(0,0);
                brique.setDisplaySize(60,30);
                brique.body.setAllowGravity(false);
                brique.setImmovable(true);
            }
        }

        

        /**this.physics.add.collider(this.balle, brique, function () {
            console.log("touche brique");
            me.rebond(me.obstacles[i]);
            me.disparait(me.obstacles[i]);
        });**/
    }

    disparait(obstacle){

        obstacle.body.setEnable(false);
        obstacle.setVisible(false);
        obstacle.ombre.setVisible(false);
    }
    initKeyboard(){
        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.raquette.setVelocityX(1000);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.raquette.setVelocityX(-1000);
                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.raquette.setVelocityX(0);
                    break;
            }
        });
    }

    update() {

        if (this.balle.y > this.largeur) {
            this.balle.x = this.largeur / 2;
            this.balle.y = this.largeur / 2;
            this.balle.body.setVelocityX(Phaser.Math.Between(0,0));
            this.balle.body.setVelocityY(Phaser.Math.Between(50,100));
        }

        /**Délimiter la balle**/
        if(this.balle.x > this.largeur){
            this.balle.x = this.largeur;
        }
        if(this.balle.x < 0){
            this.balle.x = 0;
        }
        if(this.balle.y < 0){
            this.balle.y = 0;
        }

        /**Délimiter la raquette**/
        if (this.raquette.x > this.largeur-220){
            this.raquette.x = this.largeur-220;
        }
        if (this.raquette.x < 20){
            this.raquette.x = 20;
        }
    }
}
