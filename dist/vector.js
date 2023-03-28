"use strict";
exports.__esModule = true;
exports.Vector = void 0;
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.diff = function (vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    };
    Vector.prototype.distanceFrom = function (vector) {
        var distance = this.diff(vector);
        return Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
    };
    Vector.prototype.angleToVector = function (vector) {
        return Math.atan2(vector.x - this.x, vector.y - this.y) * 180 / Math.PI;
    };
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
