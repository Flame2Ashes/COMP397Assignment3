//Salt object
//If touched, player dies
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Salt = (function (_super) {
        __extends(Salt, _super);
        function Salt(defaultPosition) {
            _super.call(this, "salt");
        }
        Salt.prototype.setPosition = function (pos) {
            this.x = pos.x;
            this.y = pos.y;
        };
        Salt.prototype.getPosition = function () {
            return new objects.Vector2(this.x, this.y);
        };
        Salt.prototype.doDamage = function (life) {
            life -= 0.5;
        };
        return Salt;
    })(objects.GameObject);
    objects.Salt = Salt;
})(objects || (objects = {}));
//# sourceMappingURL=salt.js.map