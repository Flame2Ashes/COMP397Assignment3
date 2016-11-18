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
            _super.apply(this, arguments);
        }
        return Leaf;
    })(objects.GameObject);
    objects.Leaf = Leaf;
})(objects || (objects = {}));
//# sourceMappingURL=leaf.js.map