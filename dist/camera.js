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
        this.currentPosition = new vector_1.Vector(this.viewPort.x, this.viewPort.y);
        this.velocity = new vector_1.Vector(0, 0);
        this.scene = scene;
        this.padding = 100;
        this.friction = 0.2;
        this.panSpeed = 2;
        this.zoom = 1;
        scene.setCamera(this);
    }
    Camera.prototype.setPadding = function (padding) {
        this.padding = padding;
        return this;
    };
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
        this.velocity.x = this.velocity.x * this.friction;
        this.velocity.y = this.velocity.y * this.friction;
        if (object.shape.x - this.viewPort.x < this.padding) {
            this.velocity.x = -this.panSpeed;
        }
        if (this.viewPort.x + this.viewPort.width - object.shape.x + object.shape.width < this.padding) {
            this.velocity.x = this.panSpeed;
        }
        if (object.shape.y - this.viewPort.y < this.padding) {
            this.velocity.y = -this.panSpeed;
        }
        if (this.viewPort.y + this.viewPort.height - object.shape.y + object.shape.height < this.padding) {
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
        // this.updateViewPortPosition(this.currentPosition);
    };
    Camera.prototype.updateViewPortPosition = function (position) {
        this.viewPort.x = position.x;
        this.viewPort.y = position.y;
    };
    // update(context) {
    //     this.calculateVelocity();
    //     this.calculatePosition();
    //     console.log(this.viewPort, this.currentPosition);
    //     //  Save context pre-clip
    //     context.save();
    //     context.beginPath();
    //     context.rect(this.currentPosition.x, this.currentPosition.y, this.viewPort.width, this.viewPort.height);
    //     context.clip();
    // }
    Camera.prototype.transformObject = function (object) {
        // if(object.circle !== undefined) {
        // return object.setPosition({x: object.circle.x - this.currentPosition.x, y: object.circle.y - this.currentPosition.y});
        // }
        return object.setPosition({ x: object.circle.x - this.currentPosition.x, y: object.circle.y - this.currentPosition.y });
    };
    return Camera;
}());
exports.Camera = Camera;
