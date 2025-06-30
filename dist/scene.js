"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
/**
 * Represents a scene containing game objects and handling input/camera.
 */
var Scene = /** @class */ (function () {
    /**
     * @param {string|null} name
     * @param {Object|null} game
     */
    function Scene(name, game) {
        if (name === void 0) { name = null; }
        if (game === void 0) { game = null; }
        this.id = "scene.".concat(Math.floor(new Date().getTime() * Math.random()));
        this.objects = new Map();
        this.objectsSelected = [];
        this.objectsHoveredOver = [];
        this.showHitBoxes = false;
        this.name = name || this.id;
        this.game = game;
        this.hidden = false;
        this.deleted = false;
        this.camera = null;
        if (this.game) {
            this.game.addScene(this);
        }
    }
    /**
     * Set the camera for this scene.
     * @param {Object} camera
     * @returns {Scene}
     */
    Scene.prototype.setCamera = function (camera) {
        this.camera = camera;
        return this;
    };
    /** Remove this scene and its objects. */
    Scene.prototype.remove = function () {
        this.deleted = true;
        this.clearObjects();
        this.game = null;
    };
    /**
     * Set the game for this scene.
     * @param {Object} game
     * @returns {Scene}
     */
    Scene.prototype.setGame = function (game) {
        this.game = game;
        return this;
    };
    /**
     * Show or hide hitboxes for all objects.
     * @param {boolean} show
     * @returns {Scene}
     */
    Scene.prototype.setShowHitBoxes = function (show) {
        this.showHitBoxes = show;
        return this;
    };
    /**
     * Add an object to the scene.
     * @param {Object} object
     * @returns {Scene}
     */
    Scene.prototype.addObject = function (object) {
        if (this.objects.has(object.id)) {
            this.objects.set(object.id, object);
            console.warn("object \"".concat(object.name, "\" already exists, updating"));
            return this;
        }
        object.setScene(this);
        this.objects.set(object.id, object);
        return this;
    };
    /** Remove all objects from the scene. */
    Scene.prototype.clearObjects = function () {
        this.objects.forEach(function (object) {
            object.remove();
        });
        this.objects.clear();
        return this;
    };
    /**
     * Find an object by name.
     * @param {string} name
     * @returns {Object|undefined}
     */
    Scene.prototype.findObjectByName = function (name) {
        for (var _i = 0, _a = this.objects.values(); _i < _a.length; _i++) {
            var object = _a[_i];
            if (object.name === name)
                return object;
        }
        return undefined;
    };
    /**
     * Remove objects whose name contains a substring.
     * @param {string} stringPartial
     */
    Scene.prototype.removeObjectsWithNameContaining = function (stringPartial) {
        for (var _i = 0, _a = this.objects.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], id = _b[0], object = _b[1];
            if (object.name.includes(stringPartial)) {
                object.remove();
                this.objects.delete(id);
            }
        }
    };
    /** Hide this scene. */
    Scene.prototype.hide = function () {
        this.hidden = true;
    };
    /** Show this scene. */
    Scene.prototype.show = function () {
        this.hidden = false;
    };
    /**
     * Find the index of an object in the scene (by id).
     * @param {Object} object
     * @returns {number|null}
     */
    Scene.prototype.findObjectIndex = function (object) {
        var idx = 0;
        for (var _i = 0, _a = this.objects.values(); _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.id === object.id)
                return idx;
            idx++;
        }
        return null;
    };
    /**
     * Handle keys down for all objects.
     * @param {Array<string>} keysDown
     */
    Scene.prototype.handleKeysDown = function (keysDown) {
        this.objects.forEach(function (object) {
            if (object.controlledByKeyPad) {
                object.handleKeysDown(keysDown);
            }
        });
    };
    /**
     * Handle key up for all objects.
     * @param {Array<string>} keysDown
     * @param {string} keyUp
     */
    Scene.prototype.handleKeyUp = function (keysDown, keyUp) {
        this.objects.forEach(function (object) {
            if (object.controlledByKeyPad) {
                object.handleKeyUp(keysDown, keyUp);
            }
        });
    };
    /**
     * Handle pointer down event for all objects.
     * @param {Object} position
     */
    Scene.prototype.handlePointerDown = function (position) {
        var _this = this;
        if (this.deleted || this.hidden) {
            return;
        }
        this.objects.forEach(function (object) {
            if (position.x > object.rectangle.x && position.x < object.rectangle.x + object.rectangle.width &&
                position.x > object.rectangle.y && position.y < object.rectangle.y + object.rectangle.height) {
                _this.objectsSelected.push(object);
                object.handlePointerDown(position);
            }
        });
    };
    /**
     * Handle pointer movement for all objects.
     * @param {Object} movement
     * @param {Object} pointerPosition
     * @param {boolean} pointerIsDown
     */
    Scene.prototype.handlePointerMovement = function (movement, pointerPosition, pointerIsDown) {
        var _this = this;
        if (this.deleted || this.hidden) {
            this.objectsHoveredOver = [];
            return;
        }
        var previousObjectsHoveredOver = __spreadArray([], this.objectsHoveredOver, true);
        this.objectsHoveredOver = [];
        this.objects.forEach(function (object) {
            var wasHovered = previousObjectsHoveredOver.findIndex(function (previousObjectsHoveredOverObject) {
                return object.id === previousObjectsHoveredOverObject.id;
            });
            object.handlePointerMovement(movement, pointerPosition, pointerIsDown);
            if (pointerPosition.x > object.rectangle.x && pointerPosition.x < object.rectangle.x + object.rectangle.width &&
                pointerPosition.x > object.rectangle.y && pointerPosition.y < object.rectangle.y + object.rectangle.height) {
                _this.objectsHoveredOver.push(object);
                object.handlePointerHover(pointerPosition, pointerIsDown);
                object.draw(_this.game.context);
                return;
            }
            if (wasHovered > -1) {
                object.handlePointerHoverLeave();
                object.draw(_this.game.context);
            }
        });
    };
    /**
     * Handle pointer end for all objects.
     * @param {Object} movement
     */
    Scene.prototype.handlePointerEnd = function (movement) {
        if (this.deleted || this.hidden) {
            this.objectsSelected = [];
            return;
        }
        this.objects.forEach(function (object) {
            object.handlePointerEnd(movement);
        });
        this.objectsSelected = [];
    };
    /**
     * Draw all objects in the scene.
     * @param {CanvasRenderingContext2D} context
     */
    Scene.prototype.draw = function (context) {
        var _this = this;
        if (this.deleted || this.hidden) {
            return;
        }
        if (this.camera) {
            this.camera.preDraw(context);
        }
        this.objects.forEach(function (object) {
            _this.objects.forEach(function (potentialCollisionObject) {
                if (potentialCollisionObject.id === object.id) {
                    return;
                }
                object.detectCollisions(potentialCollisionObject);
            });
            object.handleCollisions();
            object.calculatePosition();
            if (_this.showHitBoxes) {
                object.setShowHitBox(true);
                object.drawHitBox(context);
            }
            object.draw(context);
        });
        if (this.camera) {
            this.camera.postDraw(context);
        }
    };
    return Scene;
}());
exports.Scene = Scene;
