var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Sign = (function (_super) {
        __extends(Sign, _super);
        function Sign() {
            _super.call(this, "sign");
        }
        Sign.prototype.setPosition = function (pos) {
            this.x = pos.x;
            this.y = pos.y;
        };
        Sign.prototype.getPosition = function () {
            return new objects.Vector2(this.x, this.y);
        };
        return Sign;
    })(objects.GameObject);
    objects.Sign = Sign;
})(objects || (objects = {}));
//# sourceMappingURL=sign.js.map