module scenes {
    export class Gameover extends objects.Scene {
        //PRIVATE VARIABLES

        private _gamebg : createjs.Bitmap;
        private _playButton : objects.Button;
        private _scoreLabel : objects.Label;
        private _gameOverLabel : objects.Label;

        constructor() {
            super();
        }

        public start() : void {
            console.log("Game Over scene started");
        
            //Background
            this._gamebg = new createjs.Bitmap(assets.getResult("Game_BG"));
            this._gamebg.alpha = 0.5;
            this.addChild(this._gamebg);

            //Labels

            this._gameOverLabel = new objects.Label("GAME OVER", "100px Arial", "#000000", config.Screen.CENTER_X, 75);
            this.addChild(this._gameOverLabel);

            this._scoreLabel = new objects.Label("YOUR SCORE: " + score, "80px Arial", "#000000", config.Screen.CENTER_X, config.Screen.CENTER_Y);
            this.addChild(this._scoreLabel);

            //Button

            this._playButton = new objects.Button("playAgain", config.Screen.CENTER_X - 100, 350);
            this.addChild(this._playButton);
            this._playButton.on("click", this._playAgainClick, this);

            stage.addChild(this);
            
        }

         private _playAgainClick(event : createjs.MouseEvent) {
            //Reset score and send to menu
            score = 0;
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}