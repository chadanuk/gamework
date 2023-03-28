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
exports.__esModule = true;
exports.GameObject = void 0;
var collision_1 = require("./collision");
var vector_1 = require("./vector");
var optionDefaults = {
    velocity: new vector_1.Vector(0, 0),
    acceleration: new vector_1.Vector(0, 0),
    currentAngle: 0,
    rotation: 0,
    friction: null,
    maxSpeed: 6,
    ignoreCollisions: false,
    paused: false,
    deleted: false,
    outlineColour: 'red',
    fillColour: null,
    shouldConstrainToCanvasBounds: false,
    onPositionChange: function () { },
    onCollision: function () { },
    controlledByKeyPad: false,
    accelerateInDirectionOfTravelOnly: false,
    drawTrace: false,
    showHitBox: false
};
var GameObject = /** @class */ (function () {
    function GameObject(scene, name, rectangle, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.id = Math.floor(new Date().getTime() * Math.random());
        this.name = name;
        this.scene = scene;
        this.rectangle = rectangle;
        this.shape = this.rectangle;
        // Set defaults for typing
        this.velocity = new vector_1.Vector(0, 0);
        this.acceleration = new vector_1.Vector(0, 0);
        this.currentAngle = 0;
        this.rotation = 0;
        this.friction = null;
        this.maxSpeed = 6;
        this.ignoreCollisions = false;
        this.paused = false;
        this.deleted = false;
        this.shouldConstrainToCanvasBounds = false;
        this.fillColour = null;
        this.outlineColour = 'red';
        this.onPositionChange = function () { };
        this.onCollision = function () { };
        this.controlledByKeyPad = false;
        this.accelerateInDirectionOfTravelOnly = false;
        this.drawTrace = false;
        this.showHitBox = false;
        Object.keys(__assign(__assign({}, optionDefaults), options)).forEach(function (property) {
            if (options[property] === undefined) {
                return;
            }
            _this[property] = options[property];
        });
        if (this.scene) {
            this.scene.addObject(this);
        }
        this.sprite = null;
        this.asset = null;
        this.currentCollisions = [];
        this.keysDown = [];
        this.sounds = [];
        this.trace = [];
    }
    GameObject.prototype.pause = function () {
        this.paused = true;
    };
    GameObject.prototype.addSound = function (sound) {
        this.sounds.push(sound);
        return this;
    };
    GameObject.prototype.setShowHitBox = function (showHitBox) {
        this.showHitBox = showHitBox;
        return this;
    };
    GameObject.prototype.setAsset = function (asset) {
        this.asset = asset;
        return this;
    };
    GameObject.prototype.setScene = function (scene) {
        this.scene = scene;
        return this;
    };
    GameObject.prototype.setAccelerateIndirectionOfTravelOnly = function (followVelocity) {
        this.accelerateInDirectionOfTravelOnly = followVelocity;
        return this;
    };
    GameObject.prototype.setIgnoreCollisions = function (ignoreCollisions) {
        this.ignoreCollisions = ignoreCollisions;
        return this;
    };
    GameObject.prototype.setMaxSpeed = function (maxSpeed) {
        this.maxSpeed = maxSpeed;
        return this;
    };
    GameObject.prototype.setVelocity = function (velocity) {
        this.velocity = velocity;
        return this;
    };
    GameObject.prototype.setAcceleration = function (acceleration) {
        this.acceleration = acceleration;
        return this;
    };
    GameObject.prototype.setFriction = function (friction) {
        this.friction = friction;
        return this;
    };
    GameObject.prototype.getFriction = function () {
        if (this.friction == null) {
            return 0;
        }
        return this.friction;
    };
    GameObject.prototype.updateVelocity = function (velocity) {
        if (velocity === void 0) { velocity = { x: null, y: null }; }
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        if (velocity.x != null) {
            this.velocity.x = velocity.x;
        }
        if (velocity.y != null) {
            this.velocity.y = velocity.y;
        }
        var currentSpeed = Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2));
        if (currentSpeed > this.maxSpeed) {
            var velocityScale = this.maxSpeed / currentSpeed;
            this.velocity.x *= velocityScale;
            this.velocity.y *= velocityScale;
        }
    };
    GameObject.prototype.remove = function () {
        this.deleted = true;
    };
    GameObject.prototype.setPosition = function (position) {
        this.rectangle.x = position.x;
        this.rectangle.y = position.y;
        this.shape.x = position.x;
        this.shape.y = position.y;
    };
    GameObject.prototype.updatePositionBasedOnKeys = function () {
        if (this.keysDown.includes('ArrowUp') || this.keysDown.includes('w')) {
            this.rectangle.y -= 5;
            this.shape.y -= 5;
        }
        if (this.keysDown.includes('ArrowRight') || this.keysDown.includes('d')) {
            this.rectangle.x += 5;
            this.shape.x += 5;
        }
        if (this.keysDown.includes('ArrowDown') || this.keysDown.includes('s')) {
            this.rectangle.y += 5;
            this.shape.y += 5;
        }
        if (this.keysDown.includes('ArrowLeft') || this.keysDown.includes('a')) {
            this.rectangle.x -= 5;
            this.shape.x -= 5;
        }
    };
    GameObject.prototype.getPosition = function () {
        return { x: this.shape.x, y: this.shape.y };
    };
    GameObject.prototype.constrainToCanvasBounds = function () {
        if (!this.shouldConstrainToCanvasBounds) {
            return;
        }
        var pos = this.getPosition();
        if (this.rectangle.x + this.rectangle.width < 0) {
            pos.x = 0;
            this.velocity.x *= -1;
        }
        if ((this.rectangle.x - this.rectangle.width > this.scene.game.canvas.width)) {
            pos.x = this.scene.game.canvas.width;
            this.velocity.x *= -1;
        }
        if (this.rectangle.y + this.rectangle.height < 0) {
            pos.y = 0;
            this.velocity.y *= -1;
        }
        if (this.rectangle.y - this.rectangle.height > this.scene.game.canvas.height) {
            pos.y = this.scene.game.canvas.height;
            this.velocity.y *= -1;
        }
        this.setPosition(pos);
    };
    GameObject.prototype.calculatePosition = function () {
        if (this.paused) {
            return;
        }
        if (this.controlledByKeyPad) {
            return this.updatePositionBasedOnKeys();
        }
        this.constrainToCanvasBounds();
        this.updateVelocity();
        this.rectangle.x += this.velocity.x;
        this.rectangle.y += this.velocity.y;
        this.shape.x += this.velocity.x;
        this.shape.y += this.velocity.y;
        if (this.rotation) {
            this.currentAngle += this.rotation;
        }
        this.onPositionChange.call(this);
    };
    GameObject.prototype.handleKeysDown = function (keysDown) {
        if (this.controlledByKeyPad) {
            this.keysDown = keysDown;
        }
    };
    GameObject.prototype.handleKeyUp = function (keysDown, keyUp) {
        this.keysDown = keysDown;
        if (keyUp.includes('up')) {
        }
        if (keyUp.includes('right')) {
        }
        if (keyUp.includes('down')) {
        }
        if (keyUp.includes('left')) {
        }
    };
    GameObject.prototype.handlePointerDown = function (position) {
    };
    GameObject.prototype.handlePointerHover = function () {
    };
    GameObject.prototype.handlePointerHoverLeave = function () {
    };
    GameObject.prototype.handlePointerMovement = function (movement) {
    };
    GameObject.prototype.handlePointerEnd = function (movement) {
    };
    GameObject.prototype.stop = function () {
        this.velocity = new vector_1.Vector(0, 0);
    };
    GameObject.prototype.findSound = function (name) {
        var sound = this.sounds.find(function (sound) {
            return sound.name === name;
        });
        if (sound === undefined || !sound) {
            return null;
        }
        return sound;
    };
    GameObject.prototype.playSound = function (name) {
        var sound = this.findSound(name);
        if (!sound) {
            return;
        }
        sound.play();
    };
    GameObject.prototype.stopSound = function (name) {
        if (name === void 0) { name = null; }
        var sound = this.findSound(name);
        if (!sound) {
            this.sounds.forEach(function (sound) {
                sound.stop();
            });
            return;
        }
        sound.stop();
    };
    GameObject.prototype.drawHitBox = function (context) {
        if (!this.showHitBox) {
            return;
        }
        context.beginPath();
        context.strokeStyle = this.outlineColour;
        context.strokeRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        if (this.fillColour) {
            context.fillStyle = this.fillColour;
            context.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        }
        context.stroke();
    };
    GameObject.prototype.drawTraceLine = function (context) {
        if (this.drawTrace) {
            this.trace.push({ x: this.shape.x, y: this.shape.y });
            var currentStroke = context.strokeStyle;
            this.trace.forEach(function (trace) {
                context.strokeStyle = 'red';
                context.beginPath();
                context.moveTo(trace.x - 1, trace.y - 1);
                context.lineTo(trace.x, trace.y);
                context.stroke();
            });
            if (this.trace.length > 100) {
                this.trace.shift();
            }
            context.strokeStyle = currentStroke;
        }
    };
    GameObject.prototype.drawRotated = function (context) {
        //Convert degrees to radian 
        var rad = this.currentAngle * Math.PI / 180;
        var translateX = this.rectangle.x + (this.rectangle.width / 2);
        var translateY = this.rectangle.y + (this.rectangle.height / 2);
        //Set the origin to the center of the image
        context.translate(translateX, translateY);
        //Rotate the canvas around the origin
        context.rotate(rad);
        context.translate(-translateX, -translateY);
    };
    GameObject.prototype.draw = function (context) {
        if (this.deleted) {
            return;
        }
        if (this.currentAngle) {
            // Store the current context state (i.e. rotation, translation etc..)
            context.save();
            this.drawRotated(context);
        }
        this.drawHitBox(context);
        if (this.asset) {
            this.asset.draw(context);
        }
        if (this.sprite) {
            this.sprite.draw(context);
        }
        if (this.currentAngle) {
            // Restore canvas state as saved from above
            context.restore();
        }
        this.drawTraceLine(context);
    };
    GameObject.prototype.hasNoVelocity = function () {
        return (this.velocity.x === 0 && this.velocity.y === 0 || (this.controlledByKeyPad && this.keysDown.length === 0));
    };
    GameObject.prototype.getCollisionByType = function (collisionType) {
        return this.currentCollisions.find(function (collision) {
            return collision.type === collisionType;
        });
    };
    GameObject.prototype.detectCollisions = function (object) {
        if (object.ignoreCollisions) {
            return;
        }
        // Find the sides of each rectangle
        // Find the sides of each rectangle
        var rect1Left = this.rectangle.x;
        var rect1Right = this.rectangle.x + this.rectangle.width;
        var rect1Top = this.rectangle.y;
        var rect1Bottom = this.rectangle.y + this.rectangle.height;
        var rect2Left = object.rectangle.x;
        var rect2Right = object.rectangle.x + object.rectangle.width;
        var rect2Top = object.rectangle.y;
        var rect2Bottom = object.rectangle.y + object.rectangle.height;
        // Check for collisions
        if (rect1Right >= rect2Left && rect1Left <= rect2Right && rect1Bottom >= rect2Top && rect1Top <= rect2Bottom) {
            // There is a collision
            if (rect1Right >= rect2Left && rect1Left < rect2Left && this.velocity.x > 0) {
                this.currentCollisions.push(new collision_1.Collision('right', this, object));
            }
            if (rect1Left <= rect2Right && rect1Right > rect2Right && this.velocity.x < 0) {
                this.currentCollisions.push(new collision_1.Collision('left', this, object));
            }
            if (rect1Top <= rect2Bottom && rect1Bottom > rect2Bottom && this.velocity.y < 0) {
                this.currentCollisions.push(new collision_1.Collision('top', this, object));
            }
            if (rect1Bottom >= rect2Top && rect1Top < rect2Top && this.velocity.y > 0) {
                this.currentCollisions.push(new collision_1.Collision('bottom', this, object));
            }
        }
    };
    GameObject.prototype.collisionExists = function (collisionType) {
        return this.currentCollisions.findIndex(function (collision) {
            return collision !== undefined && collision.type === collisionType;
        }) > -1;
    };
    GameObject.prototype.getCollisionsFriction = function (types) {
        if (types === void 0) { types = []; }
        var friction = 1;
        return Math.min(1, this.currentCollisions.reduce(function (frictionSum, collision) {
            if (types.includes(collision.type)) {
                return collision.getFriction() + frictionSum;
            }
            return frictionSum;
        }, friction));
    };
    GameObject.prototype.handleRotationInCollision = function (collisionSide, friction) {
        if (this.rotation === 0) {
            return;
        }
        var rotationFactor = friction;
        this.rotation -= friction;
        var vx = this.velocity.x;
        var vy = this.velocity.y;
        if (collisionSide === 'top') {
            vx = this.velocity.x - (rotationFactor * this.rotation / 8);
        }
        if (collisionSide === 'right') {
            vy = this.velocity.y - (rotationFactor * this.rotation / 8);
        }
        if (collisionSide === 'bottom') {
            vx = this.velocity.x + (rotationFactor * this.rotation / 8);
        }
        if (collisionSide === 'left') {
            vy = this.velocity.y + (rotationFactor * this.rotation / 8);
        }
        this.updateVelocity({ y: vy, x: vx });
        this.correctAccelerationAfterRotation();
    };
    GameObject.prototype.correctAccelerationAfterRotation = function () {
        if ((this.velocity.y < 0 && this.acceleration.y > 0) || (this.velocity.y > 0 && this.acceleration.y < 0)) {
            this.acceleration.y *= -1;
        }
        if ((this.velocity.x < 0 && this.acceleration.x > 0) || (this.velocity.x > 0 && this.acceleration.x < 0)) {
            this.acceleration.x *= -1;
        }
    };
    GameObject.prototype.handleCollisions = function () {
        if (this.hasNoVelocity() || this.currentCollisions.length === 0) {
            this.currentCollisions = [];
            return;
        }
        var friction = this.getCollisionsFriction(['left', 'right']);
        if (this.collisionExists('right') && this.velocity.x > 0) {
            this.velocity.x *= -1 * friction;
            this.acceleration.x *= -1;
            this.handleRotationInCollision('right', friction);
        }
        if (this.collisionExists('left') && this.velocity.x < 0) {
            this.velocity.x *= -1 * friction;
            this.acceleration.x *= -1;
            this.handleRotationInCollision('left', friction);
        }
        if (this.collisionExists('top') && this.velocity.y < 0) {
            this.velocity.y *= -1 * this.getCollisionsFriction(['top', 'bottom']);
            this.acceleration.y *= -1;
            this.handleRotationInCollision('top', friction);
        }
        if (this.collisionExists('bottom') && this.velocity.y > 0) {
            this.velocity.y *= -1 * this.getCollisionsFriction(['top', 'bottom']);
            this.acceleration.y *= -1;
            this.handleRotationInCollision('bottom', friction);
        }
        this.playSound('collision');
        this.onCollision(this.currentCollisions);
        this.currentCollisions = [];
    };
    return GameObject;
}());
exports.GameObject = GameObject;
