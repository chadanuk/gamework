"use strict";
exports.__esModule = true;
exports.Collision = void 0;
var Collision = /** @class */ (function () {
    function Collision(type, object1, object2) {
        this.type = type;
        this.object1 = object1;
        this.object2 = object2;
    }
    Collision.prototype.getFriction = function () {
        var friction = this.object1.getFriction() + this.object2.getFriction();
        if (friction > 1) {
            friction = 1;
        }
        return friction;
    };
    return Collision;
}());
exports.Collision = Collision;
