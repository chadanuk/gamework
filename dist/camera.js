"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
var vector_1 = require("./vector");
/**
 * Camera class for managing viewport and following objects in a scene.
 */
var Camera = /** @class */ (function () {
    /**
     * @param {string} name
     * @param {Object} viewPort
     * @param {Object} scene
     */
    function Camera(name, viewPort, scene) {
        this.id = "Camera-".concat(new Date().getTime());
        this.name = name;
        this.viewPort = viewPort;
        this.following = [];
        this.scrollPosition = new vector_1.Vector(this.viewPort.x, this.viewPort.y);
        this.currentScrollPosition = new vector_1.Vector(this.viewPort.x, this.viewPort.y);
        this.currentScrollPositionChange = new vector_1.Vector(this.viewPort.x, this.viewPort.y);
        this.scene = scene;
        this.padding = 100;
        this.zoom = 1;
        this.scrolling = false;
        this.effectDuration = 50;
        this.positionChangeRequired = new vector_1.Vector(0, 0);
        this.scene.setCamera(this);
        this._updateViewPortBasedOnCanvasSize();
    }
    /**
     * Update the viewport size based on the canvas size.
     * @private
     */
    Camera.prototype._updateViewPortBasedOnCanvasSize = function () {
        if (this.viewPort.width + this.viewPort.x > this.scene.game.canvas.width) {
            this.viewPort.width = this.scene.game.canvas.width - this.viewPort.x;
        }
        if (this.viewPort.height + this.viewPort.y > this.scene.game.canvas.height) {
            this.viewPort.height = this.scene.game.canvas.height - this.viewPort.y;
        }
    };
    /**
     * Set the camera padding.
     * @param {number} padding
     * @returns {Camera}
     */
    Camera.prototype.setPadding = function (padding) {
        this.padding = padding;
        return this;
    };
    /**
     * Follow a single object.
     * @param {Object} object
     * @param {number} [padding=100]
     */
    Camera.prototype.followObject = function (object, padding) {
        if (padding === void 0) { padding = 100; }
        this.padding = padding;
        this.following = [object];
    };
    /**
     * Follow multiple objects.
     * @param {Array} objects
     * @param {number} [padding=50]
     */
    Camera.prototype.followObjects = function (objects, padding) {
        if (padding === void 0) { padding = 50; }
        this.padding = padding;
        this.following = objects;
    };
    /**
     * Linear easing function.
     * @param {number} time
     * @param {number} currentValue
     * @param {number} endValue
     * @param {number} duration
     * @returns {number}
     */
    Camera.prototype._easeLinear = function (time, currentValue, endValue, duration) {
        var newValue = endValue * time / duration + currentValue;
        newValue = Math.min(endValue, newValue);
        if (newValue < 0) {
            newValue = Math.max(endValue, newValue);
        }
        return newValue;
    };
    /**
     * Ease the camera scroll.
     * @private
     */
    Camera.prototype._easeScroll = function () {
        if (this.positionChangeRequired.x === 0 && this.positionChangeRequired.y === 0) {
            this.scrolling = false;
            this.frame = 0;
            return;
        }
        this.frame += 1;
        if (this.frame >= this.effectDuration) {
            this.frame = 0;
            this.scrolling = false;
            return;
        }
        this.currentScrollPosition.x = this._easeLinear(this.frame, this.currentScrollPositionChange.x, this.positionChangeRequired.x, this.effectDuration);
        this.currentScrollPosition.y = this._easeLinear(this.frame, this.currentScrollPositionChange.y, this.positionChangeRequired.y, this.effectDuration);
    };
    /**
     * Start a smooth scroll.
     */
    Camera.prototype.startScroll = function () {
        if (this.scrolling) {
            return;
        }
        this.currentScrollPositionChange = new vector_1.Vector(0, 0);
        this.positionChangeRequired = new vector_1.Vector(0, 0);
        this.scrolling = true;
        this.frame = 0;
        this.positionChangeRequired = __assign({}, this.scrollPosition);
    };
    /**
     * Calculate the camera position based on followed objects.
     */
    Camera.prototype.calculatePosition = function () {
        if (this.following.length !== 1) {
            // Handle focusing on many objects
            return;
        }
        if (this.scrolling) {
            this._easeScroll();
            return;
        }
        var object = this.following[0];
        var dx = object.rectangle.x - this.viewPort.width / 2;
        var dy = object.rectangle.y - this.viewPort.height / 2;
        this.scrollPosition.x = dx;
        this.scrollPosition.y = dy;
    };
    /**
     * Prepare the context for drawing (apply camera transform).
     * @param {CanvasRenderingContext2D} context
     */
    Camera.prototype.preDraw = function (context) {
        this.calculatePosition();
        context.save();
        context.beginPath();
        context.rect(this.viewPort.x, this.viewPort.y, this.viewPort.width, this.viewPort.height);
        context.clip();
        context.translate(-this.scrollPosition.x, -this.scrollPosition.y);
    };
    /**
     * Restore the context after drawing.
     * @param {CanvasRenderingContext2D} context
     */
    Camera.prototype.postDraw = function (context) {
        context.translate(this.scrollPosition.x, this.scrollPosition.y);
    };
    return Camera;
}());
exports.Camera = Camera;
