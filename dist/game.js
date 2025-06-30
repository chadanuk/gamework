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
exports.Game = void 0;
var constants_json_1 = require("./constants.json");
/**
 * Main Game controller for the 2D game engine.
 */
var Game = /** @class */ (function () {
    /**
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game.
     */
    function Game(canvas) {
        this.canvas = canvas;
        this.scale = window.devicePixelRatio;
        this.canvas.width = window.innerWidth * this.scale;
        this.canvas.height = window.innerHeight * this.scale;
        this.setUpCanvas = this.setUpCanvas.bind(this);
        this.scenes = [];
        this.showHitBoxes = false;
        this.paused = false;
        this.currentFrame = 0;
        this.pointerIsDown = false;
        this.pointerDownPosition = null;
        this.initialiseContext();
        // Use Set for efficient key tracking
        this.keysDown = new Set();
        this.keysToListenFor = [
            'ArrowUp',
            'w',
            'ArrowRight',
            'd',
            'ArrowDown',
            's',
            'ArrowLeft',
            'a',
            ' ',
            'shift',
            'control'
        ];
        this.constants = constants_json_1.default;
        window.gamework = this;
        // Bind event handlers once for add/remove
        this._handlePointerDown = this.handlePointerDown.bind(this);
        this._handlePointerMove = this.handlePointerMove.bind(this);
        this._handlePointerEnd = this.handlePointerEnd.bind(this);
        this._handleKeyDown = this.handleKeyDown.bind(this);
        this._handleKeyUp = this.handleKeyUp.bind(this);
        this.addEventListeners();
    }
    /**
     * Override or extend game constants.
     * @param {Object} constants
     * @returns {Game}
     */
    Game.prototype.setConstants = function (constants) {
        this.constants = __assign(__assign({}, this.constants), constants);
        return this;
    };
    /**
     * Pause the game loop.
     */
    Game.prototype.pause = function () {
        this.paused = true;
    };
    /**
     * Remove all event listeners.
     */
    Game.prototype.removeEventListeners = function () {
        window.removeEventListener('resize', this.setUpCanvas);
        this.canvas.removeEventListener('mousedown', this._handlePointerDown);
        this.canvas.removeEventListener('mousemove', this._handlePointerMove);
        this.canvas.removeEventListener('mouseup', this._handlePointerEnd);
        this.canvas.removeEventListener('mouseout', this._handlePointerEnd);
        this.canvas.removeEventListener('touchstart', this._handlePointerDown);
        this.canvas.removeEventListener('touchmove', this._handlePointerMove);
        this.canvas.removeEventListener('touchend', this._handlePointerEnd);
        document.removeEventListener('keydown', this._handleKeyDown);
        document.removeEventListener('keyup', this._handleKeyUp);
    };
    /**
     * Add all event listeners.
     */
    Game.prototype.addEventListeners = function () {
        window.addEventListener('resize', this.setUpCanvas, false);
        this.canvas.addEventListener('mousedown', this._handlePointerDown, false);
        this.canvas.addEventListener('mousemove', this._handlePointerMove, false);
        this.canvas.addEventListener('mouseup', this._handlePointerEnd, false);
        this.canvas.addEventListener('mouseout', this._handlePointerEnd, false);
        this.canvas.addEventListener('touchstart', this._handlePointerDown, false);
        this.canvas.addEventListener('touchmove', this._handlePointerMove, false);
        this.canvas.addEventListener('touchend', this._handlePointerEnd, false);
        document.addEventListener('keydown', this._handleKeyDown, false);
        document.addEventListener('keyup', this._handleKeyUp, false);
    };
    /**
     * Handle key down events.
     * @param {KeyboardEvent} event
     */
    Game.prototype.handleKeyDown = function (event) {
        var _this = this;
        if (!this.keysToListenFor.includes(event.key)) {
            return;
        }
        event.preventDefault();
        this.keysDown.add(event.key);
        this.scenes.forEach(function (scene) {
            scene.handleKeysDown(Array.from(_this.keysDown));
        });
    };
    /**
     * Handle key up events.
     * @param {KeyboardEvent} event
     */
    Game.prototype.handleKeyUp = function (event) {
        var _this = this;
        event.preventDefault();
        this.keysDown.delete(event.key);
        this.scenes.forEach(function (scene) {
            scene.handleKeyUp(Array.from(_this.keysDown), event.key);
        });
    };
    /**
     * Get pointer position from event.
     * @param {MouseEvent|TouchEvent} event
     * @returns {{x: number, y: number}}
     */
    Game.prototype.getPositionFromPointerEvent = function (event) {
        if (event.touches !== undefined && event.touches[0] !== undefined) {
            return { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
        return { x: event.pageX, y: event.pageY };
    };
    /**
     * Handle pointer down events.
     * @param {MouseEvent|TouchEvent} event
     */
    Game.prototype.handlePointerDown = function (event) {
        var _this = this;
        this.pointerIsDown = true;
        this.pointerDownPosition = this.getPositionFromPointerEvent(event);
        this.scenes.forEach(function (scene) {
            scene.handlePointerDown(_this.pointerDownPosition);
        });
    };
    /**
     * Handle pointer move events.
     * @param {MouseEvent|TouchEvent} event
     */
    Game.prototype.handlePointerMove = function (event) {
        var _this = this;
        var pointerPosition = this.getPositionFromPointerEvent(event);
        var dx = this.pointerIsDown && this.pointerDownPosition ? pointerPosition.x - this.pointerDownPosition.x : 0;
        var dy = this.pointerIsDown && this.pointerDownPosition ? pointerPosition.y - this.pointerDownPosition.y : 0;
        this.scenes.forEach(function (scene) {
            scene.handlePointerMovement({ dx: dx, dy: dy }, pointerPosition, _this.pointerIsDown);
        });
    };
    /**
     * Handle pointer end events.
     * @param {MouseEvent|TouchEvent} event
     */
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
    /**
     * Set up the canvas size.
     */
    Game.prototype.setUpCanvas = function () {
        this.canvas.width = window.innerWidth * this.scale;
        this.canvas.height = window.innerHeight * this.scale;
    };
    /**
     * Initialise the 2D context and scaling.
     */
    Game.prototype.initialiseContext = function () {
        this.context = this.canvas.getContext('2d');
        this.context.scale(this.scale, this.scale);
    };
    /**
     * Add a scene to the game.
     * @param {Object} scene
     * @returns {Game}
     */
    Game.prototype.addScene = function (scene) {
        if (this.showHitBoxes) {
            scene.setShowHitBoxes(true);
        }
        this.scenes.push(scene);
        scene.setGame(this);
        return this;
    };
    /**
     * Remove a scene from the game.
     * @param {Object} sceneToRemove
     */
    Game.prototype.removeScene = function (sceneToRemove) {
        sceneToRemove.remove();
        this.scenes = this.scenes.filter(function (scene) { return scene.id !== sceneToRemove.id; });
    };
    /**
     * Start the game loop.
     */
    Game.prototype.startLoop = function () {
        this.loop();
    };
    /**
     * Draw all scenes.
     */
    Game.prototype.draw = function () {
        var _this = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.scenes.forEach(function (scene) {
            scene.draw(_this.context);
        });
    };
    /**
     * Main game loop.
     */
    Game.prototype.loop = function () {
        if (!this.paused) {
            this.currentFrame += 1;
            this.draw();
        }
        requestAnimationFrame(this.loop.bind(this));
    };
    return Game;
}());
exports.Game = Game;
