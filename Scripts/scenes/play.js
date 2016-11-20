var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
            this._scrollTrigger = 350;
        }
        Play.prototype.start = function () {
            this._bg = new createjs.Bitmap(assets.getResult("Game_BG"));
            this._ground = new createjs.Bitmap(assets.getResult("floor"));
            this._sign = new createjs.Bitmap(assets.getResult("sign"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("idle");
            this._player.regX = 75;
            this._ground.y = 663;
            //Create labels
            this._lifeLabel = new objects.Label("Life: " + life, "40px Arial", "#ffffff", config.Screen.CENTER_X - 300, 50);
            //Create salt and leaf objects and place them in the scene
            this._salt = [];
            this._salt.push(new objects.Salt());
            this._leaves = [];
            this._leaves.push(new objects.Leaf());
            //Scrollable Container. Make the thing scroll
            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            this._scrollableObjContainer.addChild(this._ground);
            //Add labels to stage
            /*        for(let leaf of this._leaves) {
                        this._scrollableObjContainer.addChild(leaf);
                    }
                    */
            for (var _i = 0, _a = this._salt; _i < _a.length; _i++) {
                var salt = _a[_i];
                salt.setPosition(new objects.Vector2(900, 600));
                salt.regX = salt.getBounds().width * 0.5;
                this._scrollableObjContainer.addChild(salt);
            }
            for (var _b = 0, _c = this._leaves; _b < _c.length; _b++) {
                var leaf = _c[_b];
                leaf.setPosition(new objects.Vector2(1200, 500));
                leaf.regX = leaf.getBounds().width * 0.5;
                leaf.regY = leaf.getBounds().width * 0.15;
                this._scrollableObjContainer.addChild(leaf);
            }
            this.addChild(this._scrollableObjContainer);
            this.addChild(this._lifeLabel);
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            //createjs.Sound.play("theme");
            stage.addChild(this);
        };
        Play.prototype.update = function () {
            //Controls
            if (controls.LEFT) {
                this._player.moveLeft();
            }
            if (controls.RIGHT) {
                this._player.moveRight();
            }
            if (controls.JUMP) {
                this._player.jump();
            }
            if (!controls.RIGHT && !controls.LEFT) {
                this._player.resetAcceleration();
            }
            this._checkPlayerWithLeaf();
            if (!this._player.getIsGrounded() || !this._player.getIsOnLeaf())
                this._checkPlayerWithFloor();
            //Check for collision 
            for (var _i = 0, _a = this._salt; _i < _a.length; _i++) {
                var salt = _a[_i];
                if (this.checkCollision(this._player, salt)) {
                    life -= 0.1;
                    this._lifeLabel.text = "Life: " + Math.floor(life);
                    console.log("Salty " + life);
                    if (life <= 0) {
                        console.log("Dead");
                    }
                }
            }
            this._player.update();
            if (this.checkScroll()) {
                this._scrollBGForward(this._player.position.x);
            }
        };
        Play.prototype._onKeyDown = function (event) {
            switch (event.keyCode) {
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
        };
        Play.prototype._onKeyUp = function (event) {
            switch (event.keyCode) {
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
        };
        Play.prototype._scrollBGForward = function (speed) {
            if (this._scrollableObjContainer.regX < config.Screen.WIDTH - 1005)
                this._scrollableObjContainer.regX = speed - 300;
        };
        Play.prototype._checkPlayerWithFloor = function () {
            if (this._player.y + this._player.getBounds().height > this._ground.y) {
                console.log("HIT GROUND");
                this._player.position.y = this._ground.y - this._player.getBounds().height - 20;
                this._player.setIsGrounded(true);
            }
        };
        Play.prototype._checkPlayerWithLeaf = function () {
            for (var _i = 0, _a = this._leaves; _i < _a.length; _i++) {
                var leaf = _a[_i];
                if ((Math.floor(this._player.y) + this._player.getBounds().height <= leaf.y
                    && Math.floor(this._player.y) + this._player.getBounds().height >= leaf.y - 20)
                    && Math.floor(this._player.x) > leaf.x - 50
                    && Math.floor(this._player.x) < leaf.x + 200) {
                    this._player.position.y = leaf.y - this._player.getBounds().height - 20;
                    console.log("Leaf");
                    this._player.setIsOnLeaf(true);
                }
                else {
                    console.log("Not leaf");
                    this._player.setIsOnLeaf(false);
                }
            }
        };
        Play.prototype.checkScroll = function () {
            if (this._player.x >= this._scrollTrigger) {
                return true;
            }
            else {
                return false;
            }
        };
        Play.prototype.checkCollision = function (obj1, obj2) {
            if (obj2.x < obj1.x + obj1.getBounds().width &&
                obj2.x + obj2.getBounds().width > obj1.x &&
                obj2.y < obj1.y + obj1.getBounds().height &&
                obj2.y + obj2.getBounds().height > obj1.y - 10) {
                return true;
            }
            return false;
        };
        return Play;
    })(objects.Scene);
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map