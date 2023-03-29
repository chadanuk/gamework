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
exports.__esModule = true;
exports.Scene = void 0;
var Scene = /** @class */ (function () {
    function Scene(name, game) {
        if (name === void 0) { name = null; }
        if (game === void 0) { game = null; }
        this.id = "scene.".concat(Math.floor(new Date().getTime() * Math.random()));
        this.objects = [];
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
    Scene.prototype.setCamera = function (camera) {
        this.camera = camera;
    };
    Scene.prototype.remove = function () {
        this.deleted = true;
        this.clearObjects();
        this.game = null;
    };
    Scene.prototype.setGame = function (game) {
        this.game = game;
        return this;
    };
    Scene.prototype.setShowHitBoxes = function (show) {
        this.showHitBoxes = show;
        return this;
    };
    Scene.prototype.addObject = function (object) {
        var foundObjectIndex = this.findObjectIndex(object);
        if (foundObjectIndex) {
            this.objects[foundObjectIndex] = object;
            console.warn("object \"".concat(object.name, "\" already exists, updating"));
            return;
        }
        object.setScene(this);
        this.objects.push(object);
        return this;
    };
    Scene.prototype.clearObjects = function () {
        var _this = this;
        this.objects.forEach(function (object, objectIndex) {
            object.remove();
            delete _this.objects[objectIndex];
        });
        return this;
    };
    Scene.prototype.findObjectByName = function (name) {
        return this.objects.find(function (o) { return o.name === name; });
    };
    Scene.prototype.removeObjectsWithNameContaining = function (stringPartial) {
        var _this = this;
        this.objects.forEach(function (object, objectIndex) {
            if (object.name.includes(stringPartial)) {
                _this.objects[objectIndex].remove();
                delete (_this.objects[objectIndex]);
            }
        });
    };
    Scene.prototype.hide = function () {
        this.hidden = true;
    };
    Scene.prototype.show = function () {
        this.hidden = false;
    };
    Scene.prototype.findObjectIndex = function (object) {
        var foundObjectIndex = this.objects.findIndex(function (lookupObject) {
            return lookupObject !== undefined && lookupObject.id === object.id;
        });
        if (foundObjectIndex < 0) {
            return null;
        }
        return foundObjectIndex;
    };
    Scene.prototype.handleKeysDown = function (keysDown) {
        this.objects.forEach(function (object) {
            if (object.controlledByKeyPad) {
                object.handleKeysDown(keysDown);
            }
        });
    };
    Scene.prototype.handleKeyUp = function (keysDown, keyUp) {
        this.objects.forEach(function (object) {
            if (object.controlledByKeyPad) {
                object.handleKeyUp(keysDown, keyUp);
            }
        });
    };
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
    Scene.prototype.handlePointerMovement = function (movement, pointerPosition, pointerIsDown) {
        var _this = this;
        if (this.deleted || this.hidden) {
            this.objectsHoveredOver = [];
            return;
        }
        var previousObjectsHoveredOver = __spreadArray([], this.objectsHoveredOver, true);
        this.objects.forEach(function (object) {
            var wasHovered = previousObjectsHoveredOver.findIndex(function (previousObjectsHoveredOverObject) {
                return object.id === previousObjectsHoveredOverObject.id;
            });
            object.handlePointerMovement(movement, pointerPosition, pointerIsDown);
            if (pointerPosition.x > object.rectangle.x && pointerPosition.x < object.rectangle.x + object.rectangle.width &&
                pointerPosition.x > object.rectangle.y && pointerPosition.y < object.rectangle.y + object.rectangle.height) {
                _this.objectsHoveredOver.push(object);
                object.handlePointerHover(pointerPosition, pointerIsDown);
                return;
            }
            if (wasHovered > -1) {
                object.handlePointerHoverLeave();
            }
        });
    };
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
    Scene.prototype.draw = function (context) {
        var _this = this;
        if (this.deleted || this.hidden) {
            return;
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
            this.camera.update(context);
        }
    };
    return Scene;
}());
exports.Scene = Scene;
