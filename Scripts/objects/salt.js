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
        function Salt() {
            _super.apply(this, arguments);
        }
        return Salt;
    })(objects.GameObject);
    objects.Salt = Salt;
})(objects || (objects = {}));
//# sourceMappingURL=salt.js.map