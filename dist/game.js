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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Game = void 0;
var constants_json_1 = require("./constants.json");
var Game = /** @class */ (function () {
    function Game(canvas) {
        this.canvas = canvas;
        this.scale = window.devicePixelRatio;
        this.canvas.width = window.innerWidth * this.scale;
        this.canvas.height = window.innerHeight * this.scale;
        this.setUpCanvas();
        this.scenes = [];
        this.showHitBoxes = false;
        this.paused = false;
        this.currentFrame = 0;
        this.pointerIsDown = false;
        this.pointerDownPosition = null;
        this.initialiseContext();
        this.addEventListeners();
        this.keysDown = [];
        this.constants = constants_json_1["default"];
        window.gamework = this;
    }
    Game.prototype.setConstants = function (constants) {
        this.constants = __assign(__assign({}, this.constants), constants);
        return this;
    };
    Game.prototype.pause = function () {
        this.pause = true;
    };
    Game.prototype.removeEventListeners = function () {
        window.removeEventListener('resize', this.setUpCanvas);
        this.canvas.removeEventListener('mousedown', this.handlePointerDown);
        this.canvas.removeEventListener('mousemove', this.handlePointerMove);
        this.canvas.removeEventListener('mouseup', this.handlePointerEnd);
        this.canvas.removeEventListener('mouseout', this.handlePointerEnd);
        this.canvas.removeEventListener('touchstart', this.handlePointerDown);
        this.canvas.removeEventListener('touchmove', this.handlePointerMove);
        this.canvas.removeEventListener('touchend', this.handlePointerEnd);
        document.removeEventListener('keydown', this.handleKeyDown.bind);
        document.removeEventListener('keyup', this.handleKeyUp.bind);
    };
    Game.prototype.addEventListeners = function () {
        window.addEventListener('resize', this.setUpCanvas.bind(this), false);
        this.canvas.addEventListener('mousedown', this.handlePointerDown.bind(this), false);
        this.canvas.addEventListener('mousemove', this.handlePointerMove.bind(this), false);
        this.canvas.addEventListener('mouseup', this.handlePointerEnd.bind(this), false);
        this.canvas.addEventListener('mouseout', this.handlePointerEnd.bind(this), false);
        this.canvas.addEventListener('touchstart', this.handlePointerDown.bind(this), false);
        this.canvas.addEventListener('touchmove', this.handlePointerMove.bind(this), false);
        this.canvas.addEventListener('touchend', this.handlePointerEnd.bind(this), false);
        document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
        document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
    };
    Game.prototype.handleKeyDown = function (event) {
        var _this = this;
        this.keysDown.push(event.key);
        this.keysDown = __spreadArray([], new Set(this.keysDown), true);
        this.scenes.forEach(function (scene) {
            scene.handleKeysDown(_this.keysDown);
        });
    };
    Game.prototype.handleKeyUp = function (event) {
        var _this = this;
        this.keysDown = this.keysDown.filter(function (keyDown) {
            return keyDown !== event.key;
        });
        this.scenes.forEach(function (scene) {
            scene.handleKeyUp(_this.keysDown, event.key);
        });
    };
    Game.prototype.getPositionFromPointerEvent = function (event) {
        if (event.touches !== undefined && event.touches[0] !== undefined) {
            return { x: event.touches[0].clientX, y: event.touches[0].clientYY };
        }
        return { x: event.pageX, y: event.pageY };
    };
    Game.prototype.handlePointerDown = function (event) {
        var _this = this;
        this.pointerIsDown = true;
        this.pointerDownPosition = this.getPositionFromPointerEvent(event);
        this.scenes.forEach(function (scene) {
            scene.handlePointerDown(_this.pointerDownPosition);
        });
    };
    Game.prototype.handlePointerMove = function (event) {
        var _this = this;
        var pointerPosition = this.getPositionFromPointerEvent(event);
        var dx = this.pointerIsDown ? pointerPosition.x - this.pointerDownPosition.x : 0;
        var dy = this.pointerIsDown ? pointerPosition.y - this.pointerDownPosition.y : 0;
        this.scenes.forEach(function (scene) {
            scene.handlePointerMovement({ dx: dx, dy: dy }, pointerPosition, _this.pointerIsDown);
        });
    };
    Game.prototype.handlePointerEnd = function (event) {
        var pointerPosition = this.getPositionFromPointerEvent(event);
        if (pointerPosition && this.pointerDownPosition) {
            var dx_1 = pointerPosition.x - this.pointerDownPosition.x;
            var dy_1 = pointerPosition.y - this.pointerDownPosition.y;
            this.scenes.forEach(function (scene) {
                scene.handlePointerEnd({ dx: dx_1, dy: dy_1 });
            });
        }
        this.pointerIsDown = false;
        this.pointerDownPosition = null;
    };
    Game.prototype.setUpCanvas = function () {
        this.canvas.width = window.innerWidth * this.scale;
        this.canvas.height = window.innerHeight * this.scale;
    };
    Game.prototype.initialiseContext = function () {
        this.context = this.canvas.getContext('2d');
        this.context.scale(this.scale, this.scale);
    };
    Game.prototype.addScene = function (scene) {
        if (this.showHitBoxes) {
            scene.setShowHitBoxes(true);
        }
        this.scenes.push(scene);
        scene.setGame(this);
        return this;
    };
    Game.prototype.removeScene = function (sceneToRemove) {
        ;
        sceneToRemove.remove();
        this.scenes = this.scenes.filter(function (scene) { return scene.id !== sceneToRemove.id; });
    };
    Game.prototype.startLoop = function () {
        this.loop();
    };
    Game.prototype.draw = function () {
        var _this = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.scenes.forEach(function (scene) {
            if (_this.scenes.findIndex(function (fs) { return fs.id === scene.id; }) === -1) {
                return;
            }
            scene.draw(_this.context);
        });
    };
    Game.prototype.loop = function () {
        this.currentFrame += 1;
        this.draw.bind(this)();
        requestAnimationFrame(this.loop.bind(this));
    };
    return Game;
}());
exports.Game = Game;
