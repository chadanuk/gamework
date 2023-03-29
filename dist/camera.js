"use strict";
exports.__esModule = true;
exports.Camera = void 0;
var vector_1 = require("./vector");
var Camera = /** @class */ (function () {
    function Camera(name, viewPort, scene) {
        if (scene === void 0) { scene = null; }
        this.id = "Camera-".concat(new Date().getTime());
        this.name = name;
        this.viewPort = viewPort;
        this.following = [];
        this.currentPosition = new vector_1.Vector(0, 0);
        this.velocity = new vector_1.Vector(0, 0);
        this.scene = scene;
        this.padding = 100;
        this.panSpeed = 2;
        scene.setCamera(this);
    }
    Camera.prototype.setPanSpeed = function (speed) {
        this.panSpeed = speed;
        return this;
    };
    Camera.prototype.calculateVelocity = function () {
        if (this.following.length !== 1) {
            // Handle focusing on many objects
            return;
        }
        var object = this.following[0];
        if (this.viewPort.x - this.padding < object.shape.x) {
            this.velocity.x = -this.panSpeed;
        }
        if (this.viewPort.x + this.viewPort.width - this.padding > object.shape.x + object.shape.width) {
            this.velocity.x = this.panSpeed;
        }
        if (this.viewPort.y - this.padding < object.shape.y) {
            this.velocity.y = -this.panSpeed;
        }
        if (this.viewPort.y + this.viewPort.height - this.padding > object.shape.y + object.shape.height) {
            this.velocity.y = this.panSpeed;
        }
    };
    Camera.prototype.followObject = function (object, padding) {
        if (padding === void 0) { padding = 100; }
        this.padding = padding;
        this.following = [object];
        this.calculateVelocity();
    };
    Camera.prototype.followObjects = function (objects, padding) {
        if (padding === void 0) { padding = 50; }
        this.padding = padding;
        this.following = objects;
    };
    Camera.prototype.calculatePosition = function () {
        this.currentPosition.add(this.velocity);
    };
    Camera.prototype.updateViewPortPosition = function (position) {
        this.viewPort.x = position.x;
        this.viewPort.y = position.y;
    };
    Camera.prototype.update = function (context) {
        this.calculatePosition();
        context.translate(this.viewPort.x - this.currentPosition.x, this.currentPosition.y - this.viewPort.y);
        this.updateViewPortPosition(this.currentPosition);
    };
    return Camera;
}());
exports.Camera = Camera;
