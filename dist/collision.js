"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collision = void 0;
/**
 * Collision class for representing collisions between objects.
 */
var Collision = /** @class */ (function () {
    /**
     * @param {string} type
     * @param {Object} object1
     * @param {Object} object2
     */
    function Collision(type, object1, object2) {
        this.type = type;
        this.object1 = object1;
        this.object2 = object2;
    }
    /**
     * Get the combined friction of the two objects (capped at 1).
     * @returns {number}
     */
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
