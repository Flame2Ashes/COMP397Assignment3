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
            this.start();
        }
        Play.prototype.start = function () {
            this._bg = new createjs.Bitmap(assets.getResult("bg"));
            this._ground = new createjs.Bitmap(assets.getResult("floor"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("player");
            //Create objects and place them in the scene
            this._pipes = [];
            this._pipes.push(new objects.Pipe(config.PipeSize.SMALL, new objects.Vector2(1208, 450)));
            this._pipes.push(new objects.Pipe(config.PipeSize.MEDIUM, new objects.Vector2(1640, 408)));
            this._pipes.push(new objects.Pipe(config.PipeSize.LARGE, new objects.Vector2(1984, 363)));
            this._pipes.push(new objects.Pipe(config.PipeSize.LARGE, new objects.Vector2(2460, 363)));
            this._blocks = [];
            this._blocks.push(new objects.Block(new objects.Vector2(861, 364)));
            this._blocks.push(new objects.Block(new objects.Vector2(946, 364)));
            this._blocks.push(new objects.Block(new objects.Vector2(1031, 364)));
            this._qBlocks = [];
            this._qBlocks.push(new objects.qBlock(new objects.Vector2(688, 364)));
            this._qBlocks.push(new objects.qBlock(new objects.Vector2(906, 364)));
            this._qBlocks.push(new objects.qBlock(new objects.Vector2(993, 364)));
            this._qBlocks.push(new objects.qBlock(new objects.Vector2(948, 191)));
            //Scrollable Container. Make the thing scroll
            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            this._scrollableObjContainer.addChild(this._ground);
            for (var _i = 0, _a = this._pipes; _i < _a.length; _i++) {
                var pipe = _a[_i];
                this._scrollableObjContainer.addChild(pipe);
            }
            for (var _b = 0, _c = this._blocks; _b < _c.length; _b++) {
                var block = _c[_b];
                this._scrollableObjContainer.addChild(block);
            }
            for (var _d = 0, _e = this._qBlocks; _d < _e.length; _d++) {
                var qBlock = _e[_d];
                this._scrollableObjContainer.addChild(qBlock);
            }
            this._ground.y = 535;
            this.addChild(this._scrollableObjContainer);
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            createjs.Sound.play("theme");
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
            if (!this._player.getIsGrounded())
                this._checkPlayerWithFloor();
            for (var _i = 0, _a = this._pipes; _i < _a.length; _i++) {
                var p = _a[_i];
                if (this.checkCollision(this._player, p)) {
                    this._player.position.x = p.x - this._player.getBounds().width - 0.01;
                    this._player.setVelocity(new objects.Vector2(0, 0));
                    this._player.resetAcceleration();
                    this._player.isColliding = true;
                    console.log(p.name);
                }
                else {
                    this._player.isColliding = false;
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
            if (this._scrollableObjContainer.regX < 3071 - 815)
                this._scrollableObjContainer.regX = speed - 300;
        };
        Play.prototype._checkPlayerWithFloor = function () {
            if (this._player.y + this._player.getBounds().height > this._ground.y) {
                console.log("HIT GROUND");
                this._player.position.y = this._ground.y - this._player.getBounds().height - 20;
                this._player.setIsGrounded(true);
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