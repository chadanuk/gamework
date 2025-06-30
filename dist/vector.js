"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
/**
 * Vector class for 2D vector math operations.
 */
var Vector = /** @class */ (function () {
    /**
     * @param {number} x
     * @param {number} y
     */
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Returns the difference between this vector and another.
     * @param {Vector} vector
     * @returns {Vector}
     */
    Vector.prototype.diff = function (vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    };
    /**
     * Returns the distance from this vector to another.
     * @param {Vector} vector
     * @returns {number}
     */
    Vector.prototype.distanceFrom = function (vector) {
        var distance = this.diff(vector);
        return Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
    };
    /**
     * Returns the angle to another vector in degrees.
     * @param {Vector} vector
     * @returns {number}
     */
    Vector.prototype.angleToVector = function (vector) {
        return Math.atan2(vector.y - this.y, vector.x - this.x) * 180 / Math.PI;
    };
    /**
     * Subtracts another vector or scalar from this vector.
     * @param {Vector|number} vector
     * @returns {Vector}
     */
    Vector.prototype.subtract = function (vector) {
        if (typeof vector === 'number') {
            this.x -= vector;
            this.y -= vector;
            return this;
        }
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    };
    /**
     * Adds another vector or scalar to this vector.
     * @param {Vector|number} vector
     * @returns {Vector}
     */
    Vector.prototype.add = function (vector) {
        if (typeof vector === 'number') {
            this.x += vector;
            this.y += vector;
            return this;
        }
        this.x += vector.x;
        this.y += vector.y;
        return this;
    };
    /**
     * Multiplies this vector by another vector or scalar.
     * @param {Vector|number} vector
     * @returns {Vector}
     */
    Vector.prototype.multiply = function (vector) {
        if (typeof vector === 'number') {
            this.x *= vector;
            this.y *= vector;
            return this;
        }
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    };
    /**
     * Divides this vector by another vector or scalar.
     * @param {Vector|number} vector
     * @returns {Vector}
     */
    Vector.prototype.divide = function (vector) {
        if (typeof vector === 'number') {
            this.x /= vector;
            this.y /= vector;
            return this;
        }
        this.x /= vector.x;
        this.y /= vector.y;
        return this;
    };
    return Vector;
}());
exports.Vector = Vector;
