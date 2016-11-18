var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Gameover = (function (_super) {
        __extends(Gameover, _super);
        function Gameover() {
            _super.call(this);
        }
        Gameover.prototype.start = function () {
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
        };
        Gameover.prototype._playAgainClick = function (event) {
            //Reset score and send to menu
            score = 0;
            scene = config.Scene.MENU;
            changeScene();
        };
        return Gameover;
    })(objects.Scene);
    scenes.Gameover = Gameover;
})(scenes || (scenes = {}));
//# sourceMappingURL=gameover.js.map