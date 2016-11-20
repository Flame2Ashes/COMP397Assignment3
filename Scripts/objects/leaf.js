var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Leaf = (function (_super) {
        __extends(Leaf, _super);
        function Leaf() {
            _super.call(this, "leaf");
        }
        Leaf.prototype.setPosition = function (pos) {
            this.x = pos.x;
            this.y = pos.y;
        };
        Leaf.prototype.getPosition = function () {
            return new objects.Vector2(this.x, this.y);
        };
        return Leaf;
    })(objects.GameObject);
    objects.Leaf = Leaf;
})(objects || (objects = {}));
//# sourceMappingURL=leaf.js.map