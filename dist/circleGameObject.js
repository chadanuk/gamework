"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CircleGameObject = void 0;
var collision_1 = require("./collision");
var gameObject_1 = require("./gameObject");
var rectangle_1 = require("./rectangle");
var CircleGameObject = /** @class */ (function (_super) {
    __extends(CircleGameObject, _super);
    function CircleGameObject(scene, name, circle, velocity, rotation) {
        if (rotation === void 0) { rotation = 0; }
        var _this = _super.call(this, scene, name, new rectangle_1.Rectangle(circle.x - circle.radius, circle.y - circle.radius, circle.radius * 2, circle.radius * 2), { velocity: velocity, rotation: rotation }) || this;
        _this.circle = circle;
        _this.shape = _this.circle;
        return _this;
    }
    CircleGameObject.prototype.setPosition = function (position) {
        this.rectangle.x = position.x - this.circle.radius;
        this.rectangle.y = position.y - this.circle.radius;
        this.shape.x = position.x;
        this.shape.y = position.y;
        this.circle.x = position.x;
        this.circle.y = position.y;
        return this;
    };
    CircleGameObject.prototype.detectCollisionsWithOtherCircle = function (object) {
        // ToDO detect circles colliding
    };
    CircleGameObject.prototype.detectCollisionsWithRectangle = function (object) {
        if (object.ignoreCollisions) {
            return;
        }
        var closestX = Math.max(object.rectangle.x, Math.min(this.circle.x, object.rectangle.x + object.rectangle.width));
        var closestY = Math.max(object.rectangle.y, Math.min(this.circle.y, object.rectangle.y + object.rectangle.height));
        var distance = Math.sqrt(Math.pow(this.circle.x - closestX, 2) + Math.pow(this.circle.y - closestY, 2));
        if (distance <= this.circle.radius) {
            var collision = void 0;
            if (closestX === object.rectangle.x) {
                collision = new collision_1.Collision('right', this, object);
                this.currentCollisions.push(collision);
            }
            if (closestX === object.rectangle.x + object.rectangle.width) {
                collision = new collision_1.Collision('left', this, object);
                this.currentCollisions.push(collision);
            }
            if (closestY === object.rectangle.y) {
                collision = new collision_1.Collision('bottom', this, object);
                this.currentCollisions.push(collision);
            }
            if (closestY === object.rectangle.y + object.rectangle.height) {
                collision = new collision_1.Collision('top', this, object);
                this.currentCollisions.push(collision);
            }
        }
    };
    CircleGameObject.prototype.detectCollisions = function (object) {
        if (object instanceof CircleGameObject) {
            this.detectCollisionsWithOtherCircle(object);
            return;
        }
        this.detectCollisionsWithRectangle(object);
    };
    CircleGameObject.prototype.drawHitBox = function (context) {
        context.strokeStyle = this.outlineColour;
        context.beginPath();
        context.arc(this.screenDrawObject.x, this.screenDrawObject.y, this.screenDrawObject.radius, 0, 2 * Math.PI);
        if (this.fillColour) {
            context.fillStyle = this.fillColour;
            context.fill();
        }
        else {
            context.stroke();
        }
        context.closePath();
    };
    return CircleGameObject;
}(gameObject_1.GameObject));
exports.CircleGameObject = CircleGameObject;
