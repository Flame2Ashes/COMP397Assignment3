module scenes {
    export class Play extends objects.Scene {

        private _bg : createjs.Bitmap;

        private _ground : createjs.Bitmap;
        private _player : objects.Player;
        private _sign : objects.Sign;

        private _lifeLabel : objects.Label;
        private _timeLabel : objects.Label;

        //Arrays for objects

        private _leaves : objects.Leaf[];
        private _salt : objects.Salt[];

        private _scrollableObjContainer : createjs.Container;

        private _scrollTrigger : number = 350;

        constructor() {
            super();
        }

        public start() : void {
            this._bg = new createjs.Bitmap(assets.getResult("Game_BG"));
            this._ground = new createjs.Bitmap(assets.getResult("floor"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("idle");
            this._player.regX = 75;
            this._ground.y = 663;

            //Create labels
             this._lifeLabel = new objects.Label("Life: " + life, "40px Arial", "#ffffff", config.Screen.CENTER_X - 300, 50);

            //Create salt and leaf objects and place them in the scene

            this._salt = [];
            this._salt.push(new objects.Salt());
            this._salt.push(new objects.Salt());
            this._salt.push(new objects.Salt());
            this._salt.push(new objects.Salt());
            this._salt.push(new objects.Salt());
            this._salt.push(new objects.Salt());

            this._leaves = [];
            this._leaves.push(new objects.Leaf());
            this._leaves.push(new objects.Leaf());
            this._leaves.push(new objects.Leaf());
            this._leaves.push(new objects.Leaf());
            this._leaves.push(new objects.Leaf());
            this._leaves.push(new objects.Leaf());
            this._leaves.push(new objects.Leaf());
            this._leaves.push(new objects.Leaf());

            //Add sign to the scene
            this._sign = new objects.Sign();
            this._sign.setPosition(new objects.Vector2(4000, 500));

          
            //Scrollable Container. Make the thing scroll

            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            this._scrollableObjContainer.addChild(this._ground);
            this._scrollableObjContainer.addChild(this._sign);



            for(let salt of this._salt) {
                salt.setPosition(new objects.Vector2(Math.random() * 4000 + 300, 600));
                salt.regX = salt.getBounds().width * 0.5;
                this._scrollableObjContainer.addChild(salt);
            }

            //Position the leaves
            this._leaves[0].setPosition(new objects.Vector2(1200, 500));
            this._leaves[0].scaleX = -1;

            this._leaves[1].setPosition(new objects.Vector2(1650, 300));

            this._leaves[2].setPosition(new objects.Vector2(2350, 500));
            this._leaves[2].scaleX = -1;

            this._leaves[3].setPosition(new objects.Vector2(2350, 250));
            this._leaves[3].scaleX = -1;

            this._leaves[4].setPosition(new objects.Vector2(2675, 400));
            this._leaves[5].setPosition(new objects.Vector2(2675, 150));

            this._leaves[6].setPosition(new objects.Vector2(2980, 450));
            this._leaves[6].scaleX = -1;

            this._leaves[7].setPosition(new objects.Vector2(3250, 350));

            for (let leaf of this._leaves) {
                leaf.regX = leaf.getBounds().width * 0.5;
                leaf.regY = leaf.getBounds().height * 0.5;
                this._scrollableObjContainer.addChild(leaf);
            }



            this.addChild(this._scrollableObjContainer);

            //Add labels last
            this.addChild(this._lifeLabel);

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;

            //createjs.Sound.play("theme");

            stage.addChild(this);
        }

        public update() : void {

            //Controls

            if(controls.LEFT) {
                this._player.moveLeft();
            }
            if(controls.RIGHT) { 
                this._player.moveRight();
            } 
            if(controls.JUMP) {
                this._player.jump();
            }

            if(!controls.RIGHT && !controls.LEFT)
            {
                this._player.resetAcceleration();
                
            }

             for (let leaf of this._leaves) {
                   this._checkPlayerWithLeaf(leaf);
                    if (!this._player.getIsOnLeaf()) {
                         this._checkPlayerWithFloor();
                    }
                }

            if(!this._player.getIsGrounded())
                this._checkPlayerWithFloor();
                

                //Check for collision 

                for(let salt of this._salt) {
               if (this.checkCollision(this._player, salt)) {
                    life -= 0.5;
                    this._lifeLabel.text = "Life: " + Math.floor(life);
                    if (life <= 0) {
                        console.log("Dead");
                        //Change to Gameover scene
                        scene = config.Scene.GAMEOVER;
                        changeScene();
                    }
                }
            }

               

           
            if (this.checkCollision(this._player, this._sign)) {
                scene = config.Scene.GAMEOVERWIN;
                changeScene();
            }

            this._player.update();

            if(this.checkScroll()) {
                this._scrollBGForward(this._player.position.x);
            }


        }

        private _onKeyDown(event: KeyboardEvent) : void {
             switch(event.keyCode) {
                case keys.W:
                    console.log("W key pressed");
                    controls.UP = true;
                    break;
                case keys.S:
                    console.log("S key pressed");
                    controls.DOWN = true;
                    break;
                case keys.A:
                    console.log("A key pressed");
                    controls.LEFT = true;
                    break;
                case keys.D:
                    console.log("D key pressed");
                    controls.RIGHT = true;
                    break;
                case keys.SPACE:
                    controls.JUMP = true;
                    break;
            }
        }

        private _onKeyUp(event : KeyboardEvent) : void {
            switch(event.keyCode) {
                case keys.W:
                    controls.UP = false;
                    break;
                case keys.S:
                    controls.DOWN = false;
                    break;
                case keys.A:
                    controls.LEFT = false;
                    break;
                case keys.D:
                    controls.RIGHT = false;
                    break;
                case keys.SPACE:
                    controls.JUMP = false;
                    break;
            }
        }

        private _scrollBGForward(speed : number) : void{
            if(this._scrollableObjContainer.regX < config.Screen.WIDTH - 1200)
                this._scrollableObjContainer.regX = speed - 300;
        }

        private _checkPlayerWithFloor() : void {
            if(this._player.y+ this._player.getBounds().height > this._ground.y) {
                console.log("HIT GROUND");
                this._player.position.y = this._ground.y - this._player.getBounds().height - 20;
                this._player.setIsGrounded(true);
            }
        }

      
        private _checkPlayerWithLeaf(leaf : objects.Leaf) : void {

            if ((Math.floor(this._player.y) + this._player.getBounds().height <= leaf.y 
            && Math.floor(this._player.y) + this._player.getBounds().height >= leaf.y - 20) 
            && Math.floor(this._player.x) > leaf.x - 100 
            && Math.floor(this._player.x) < leaf.x + 100) {
                this._player.position.y = leaf.y - this._player.getBounds().height - 20;
                console.log("Leaf");
                this._player.setIsOnLeaf(true);
            }
            else  {
                this._player.setIsOnLeaf(false); 
            }
            }
        
/*
         if ((Math.floor(this._player.y) + this._player.getBounds().height <= leaf.y 
            && Math.floor(this._player.y) + this._player.getBounds().height >= leaf.y - 20) 
            && Math.floor(this._player.x) > leaf.x - 50 
            && Math.floor(this._player.x) < leaf.x + 200) {
        */

        private checkScroll() : boolean {
            if(this._player.x >= this._scrollTrigger) {
                return true;
            }
            else {
                return false;
            }
        }

        private checkCollision(obj1 : objects.GameObject, obj2 : objects.GameObject) : boolean {

            if(obj2.x < obj1.x + obj1.getBounds().width &&
                obj2.x + obj2.getBounds().width > obj1.x &&
                obj2.y < obj1.y + obj1.getBounds().height &&
                obj2.y + obj2.getBounds().height > obj1.y - 10) {
                return true;
            }

            return false;
        }
    }
}