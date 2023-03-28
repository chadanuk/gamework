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
define("asset", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Asset = void 0;
    var Asset = /** @class */ (function () {
        function Asset(imageSrc, gameObject, repeat) {
            if (gameObject === void 0) { gameObject = null; }
            if (repeat === void 0) { repeat = true; }
            this.gameObject = gameObject;
            this.imageSrc = imageSrc;
            this.loaded = false;
            this.image = new Image();
            this.repeat = repeat;
            this.load();
            if (!this.findAsset(imageSrc)) {
                window.gamework.constants.ASSETS.push(this);
            }
        }
        Asset.prototype.findAsset = function (imageSrc) {
            var foundAsset = window.gamework.constants.ASSETS.find(function (assetInData) {
                return assetInData.imageSrc === imageSrc;
            });
            if (foundAsset === undefined) {
                return null;
            }
            return foundAsset;
        };
        Asset.prototype.setRepeat = function (value) {
            this.repeat = value;
            return this;
        };
        Asset.prototype.setGameObject = function (gameObject) {
            this.gameObject = gameObject;
            return this;
        };
        Asset.prototype.load = function () {
            var _this = this;
            if (this.gameObject) {
                this.image.width = this.gameObject.rectangle.width;
                this.image.height = this.gameObject.rectangle.height;
                this.image.style.objectFit = 'contain';
            }
            this.image.onload = function () {
                _this.loaded = true;
            };
            this.image.src = this.imageSrc;
        };
        Asset.prototype.draw = function (context) {
            if (!this.gameObject || !this.loaded) {
                return;
            }
            if (this.repeat) {
                var pattern = context.createPattern(this.image, "repeat");
                context.fillStyle = pattern;
                context.fillRect(this.gameObject.rectangle.x, this.gameObject.rectangle.y, this.gameObject.rectangle.width, this.gameObject.rectangle.height);
                return;
            }
            context.drawImage(this.image, this.gameObject.rectangle.x, this.gameObject.rectangle.y, this.gameObject.rectangle.width, this.gameObject.rectangle.height);
        };
        return Asset;
    }());
    exports.Asset = Asset;
});
define("collision", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Collision = void 0;
    var Collision = /** @class */ (function () {
        function Collision(type, object1, object2) {
            this.type = type;
            this.object1 = object1;
            this.object2 = object2;
        }
        Collision.prototype.getFriction = function () {
            var friction = this.object1.getFriction() + this.object2.getFriction();
            if (friction > 1) {
                friction = 1;
            }
            return friction;
        };
        return Collision;
    }());
    exports.Collision = Collision;
});
define("vector", ["require", "exports"], function (require, exports) {
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
});
define("gameObject", ["require", "exports", "collision", "vector"], function (require, exports, collision_1, vector_1) {
    "use strict";
    exports.__esModule = true;
    exports.GameObject = void 0;
    var GameObject = /** @class */ (function () {
        function GameObject(scene, name, rectangle, options) {
            if (options === void 0) { options = {
                velocity: new vector_1.Vector(0, 0),
                acceleration: new vector_1.Vector(0, 0),
                currentAngle: 0,
                rotation: 0,
                friction: null,
                maxSpeed: 6,
                ignoreCollisions: false,
                paused: false,
                deleted: false,
                shouldConstrainToCanvasBounds: false,
                onPositionChange: function () { },
                onCollision: function () { },
                controlledByKeyPad: false,
                accelerateInDirectionOfTravelOnly: false,
                drawTrace: false,
                showHitBox: false
            }; }
            var _this = this;
            this.id = Math.floor(new Date().getTime() * Math.random());
            this.name = name;
            this.scene = scene;
            this.rectangle = rectangle;
            this.shape = this.rectangle;
            Object.keys(options).forEach(function (property) {
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
            context.strokeStyle = 'red';
            context.strokeRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
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
            if (this.hasNoVelocity() && object.hasNoVelocity()) {
                return;
            }
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
});
define("rectangle", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Rectangle = void 0;
    var Rectangle = /** @class */ (function () {
        function Rectangle(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        return Rectangle;
    }());
    exports.Rectangle = Rectangle;
});
define("textItem", ["require", "exports", "gameObject", "rectangle"], function (require, exports, gameObject_1, rectangle_1) {
    "use strict";
    exports.__esModule = true;
    exports.TextItem = void 0;
    var TextItem = /** @class */ (function (_super) {
        __extends(TextItem, _super);
        function TextItem(scene, name, position, fontSize, fontType, colour, text) {
            if (fontSize === void 0) { fontSize = '12px'; }
            if (fontType === void 0) { fontType = 'serif'; }
            if (colour === void 0) { colour = '#000000'; }
            if (text === void 0) { text = ''; }
            var _this = _super.call(this, scene, name, new rectangle_1.Rectangle(position.x, position.y, 0, 16)) || this;
            _this.id = Math.floor(new Date().getTime() * Math.random());
            _this.position = position;
            _this.fontSize = fontSize;
            _this.fontType = fontType;
            _this.colour = colour;
            _this.text = text;
            return _this;
        }
        TextItem.prototype.setText = function (text) {
            this.text = text;
            return this;
        };
        TextItem.prototype.draw = function (context) {
            if (this.deleted) {
                return;
            }
            if (this.text.length === 0) {
                return;
            }
            context.beginPath();
            context.fillStyle = this.colour;
            context.font = "".concat(this.fontSize, " ").concat(this.fontType);
            var textDetails = context.measureText(this.text);
            this.rectangle.width = textDetails.width;
            context.fillText(this.text, this.rectangle.x, this.rectangle.y);
            context.fill();
        };
        return TextItem;
    }(gameObject_1.GameObject));
    exports.TextItem = TextItem;
});
define("popup", ["require", "exports", "gameObject", "rectangle", "textItem"], function (require, exports, gameObject_2, rectangle_2, textItem_1) {
    "use strict";
    exports.__esModule = true;
    exports.Popup = void 0;
    var Popup = /** @class */ (function (_super) {
        __extends(Popup, _super);
        function Popup(name, scene, canvas, title, rectangle) {
            if (title === void 0) { title = ''; }
            if (rectangle === void 0) { rectangle = null; }
            var _this = _super.call(this, scene, name, rectangle !== null && rectangle !== void 0 ? rectangle : new rectangle_2.Rectangle((canvas.width - (0.8 * canvas.width)) / 8, 50, 0.4 * canvas.width, 0.2 * canvas.height)) || this;
            _this.canvas = canvas;
            _this.title = new textItem_1.TextItem(scene, "".concat(name, ".title"), { x: _this.rectangle.x + 40, y: _this.rectangle.y + window.gamework.constants.POPUP.padding }, window.gamework.constants.POPUP.fontSize, window.gamework.constants.POPUP.fontType, window.gamework.constants.POPUP.textColour, title);
            _this.buttons = [];
            _this.verticalButtonSpacing = window.gamework.constants.BUTTONS.spacing;
            return _this;
        }
        Popup.prototype.setTitle = function (title) {
            this.title.text = title;
            return this;
        };
        Popup.prototype.clearButtons = function () {
            this.buttons.forEach(function (button) {
                button.remove();
                button = null;
            });
            this.buttons = [];
        };
        Popup.prototype.remove = function () {
            this.deleted = true;
            this.buttons = [];
        };
        Popup.prototype.lastButton = function () {
            return this.buttons[this.buttons.length - 1];
        };
        Popup.prototype.addButton = function (button) {
            var lastButton = this.lastButton();
            var lastY = lastButton === undefined ? this.title.rectangle.y : lastButton.rectangle.y;
            if (button === undefined) {
                return;
            }
            button.setPosition({
                x: this.rectangle.x + 40,
                y: lastY + this.verticalButtonSpacing
            });
            button.setWidth(Math.min(this.rectangle.width - (40 * 2), button.rectangle.width));
            this.buttons.push(button);
            return this;
        };
        Popup.prototype.draw = function (context) {
            context.beginPath();
            context.fillStyle = 'rgba(0,0,0,0.5)';
            context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            context.strokeStyle = window.gamework.constants.COLOURS.modalBorderColour;
            context.fillStyle = window.gamework.constants.COLOURS.modalBackgroundColour;
            context.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
            context.fill();
            context.strokeRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
            context.closePath();
            this.title.draw(context);
        };
        return Popup;
    }(gameObject_2.GameObject));
    exports.Popup = Popup;
});
define("assetManager", ["require", "exports", "popup"], function (require, exports, popup_1) {
    "use strict";
    exports.__esModule = true;
    exports.AssetManager = void 0;
    var AssetManager = /** @class */ (function () {
        function AssetManager(canvas) {
            this.assets = window.gamework.constants.ASSETS;
            this.loadedInterval = null;
            this.allAssetsLoaded = false;
            this.loadingProgress = 0;
            this.popup = new popup_1.Popup('Asset manager popup', null, canvas, "Loading assets...");
        }
        AssetManager.prototype.assetsLoaded = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.loadedInterval = setInterval(function () {
                    var loadedAll = true;
                    _this.assets.forEach(function (asset, index) {
                        if (!asset.loaded) {
                            loadedAll = false;
                        }
                        else {
                            _this.loadingProgress = index + 1;
                        }
                    });
                    if (loadedAll) {
                        _this.allAssetsLoaded = true;
                        clearInterval(_this.loadedInterval);
                        resolve(true);
                    }
                }, 10);
            });
        };
        AssetManager.prototype.drawLoadingProgress = function (context) {
            var _this = this;
            if (this.allAssetsLoaded) {
                return;
            }
            this.popup.draw(context);
            // Draw progress bar
            context.fillStyle = 'rgba(0, 0, 0, 0.8)';
            context.fillRect(this.popup.rectangle.x + window.gamework.constants.POPUP.padding, this.popup.rectangle.y + 50, (this.popup.rectangle.width - (2 * window.gamework.constants.POPUP.padding)) * ((this.loadingProgress) / this.assets.length), 20);
            context.fill();
            context.beginPath();
            context.fillStyle = window.gamework.constants.COLOURS.modalTextColour;
            context.font = '16px sans-serif';
            var percent = Math.ceil(this.loadingProgress / this.assets.length * 100);
            context.fillText("Assets loading: ".concat(percent, "%"), this.popup.rectangle.x + window.gamework.constants.POPUP.padding, this.popup.rectangle.y + 100);
            context.fill();
            requestAnimationFrame(function () {
                _this.drawLoadingProgress(context);
            });
        };
        return AssetManager;
    }());
    exports.AssetManager = AssetManager;
});
define("button", ["require", "exports", "gameObject", "rectangle", "textItem"], function (require, exports, gameObject_3, rectangle_3, textItem_2) {
    "use strict";
    exports.__esModule = true;
    exports.Button = void 0;
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(name, scene, text, onTap) {
            var _this = _super.call(this, scene, name, new rectangle_3.Rectangle(0, 0, window.gamework.constants.BUTTONS.minWidth, window.gamework.constants.BUTTONS.minHeight)) || this;
            _this.text = new textItem_2.TextItem(scene, name, { x: _this.rectangle.x, y: _this.rectangle.y }, window.gamework.constants.BUTTONS.fontSize, window.gamework.constants.BUTTONS.fontType, window.gamework.constants.BUTTONS.textColour, text);
            _this.buttonFontSize = parseFloat(window.gamework.constants.BUTTONS.fontSize);
            _this.onTapButton = onTap;
            _this.strokeStyle = window.gamework.constants.BUTTONS.borderColour;
            _this.fillStyle = window.gamework.constants.BUTTONS.backgroundColour;
            _this.active = false;
            return _this;
        }
        Button.prototype.setPosition = function (position) {
            this.rectangle.x = position.x;
            this.rectangle.y = position.y;
            this.text.setPosition({ x: position.x + window.gamework.constants.BUTTONS.padding, y: position.y + this.buttonFontSize + window.gamework.constants.BUTTONS.padding });
        };
        Button.prototype.setWidth = function (width) {
            this.rectangle.width = width;
        };
        Button.prototype.remove = function () {
            document.body.style.cursor = 'default';
            _super.prototype.remove.call(this);
        };
        Button.prototype.handlePointerStart = function (position) {
            if (this.deleted) {
                return;
            }
            this.strokeStyle = window.gamework.constants.BUTTONS.activeBorderColour;
            this.fillStyle = window.gamework.constants.BUTTONS.activeBackgroundColour;
        };
        Button.prototype.handlePointerHoverLeave = function (position) {
            if (this.deleted) {
                document.body.style.cursor = 'default';
                return;
            }
            document.body.style.cursor = 'default';
            this.strokeStyle = window.gamework.constants.BUTTONS.borderColour;
            this.fillStyle = window.gamework.constants.BUTTONS.backgroundColour;
        };
        Button.prototype.handlePointerHover = function () {
            if (this.deleted) {
                document.body.style.cursor = 'default';
                return;
            }
            this.strokeStyle = window.gamework.constants.BUTTONS.hoverBorderColour;
            this.fillStyle = window.gamework.constants.BUTTONS.hoverBackgroundColour;
            document.body.style.cursor = 'pointer';
        };
        Button.prototype.handlePointerDown = function (position) {
            if (this.deleted) {
                return;
            }
            this.active = true;
            this.strokeStyle = window.gamework.constants.BUTTONS.activeBorderColour;
            this.fillStyle = window.gamework.constants.BUTTONS.activeBackgroundColour;
        };
        Button.prototype.handlePointerEnd = function (movement) {
            if (this.deleted) {
                return;
            }
            if (!this.active) {
                return;
            }
            this.active = false;
            this.onTapButton();
        };
        Button.prototype.draw = function (context) {
            context.beginPath();
            context.strokeStyle = this.strokeStyle;
            context.fillStyle = this.fillStyle;
            context.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
            context.fill();
            this.text.draw(context);
            // context.strokeRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        };
        return Button;
    }(gameObject_3.GameObject));
    exports.Button = Button;
});
define("circle", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Circle = void 0;
    var Circle = /** @class */ (function () {
        function Circle(x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
        }
        return Circle;
    }());
    exports.Circle = Circle;
});
define("circleGameObject", ["require", "exports", "collision", "gameObject", "rectangle"], function (require, exports, collision_2, gameObject_4, rectangle_4) {
    "use strict";
    exports.__esModule = true;
    exports.CircleGameObject = void 0;
    var CircleGameObject = /** @class */ (function (_super) {
        __extends(CircleGameObject, _super);
        function CircleGameObject(scene, name, circle, velocity, rotation) {
            if (rotation === void 0) { rotation = 0; }
            var _this = _super.call(this, scene, name, new rectangle_4.Rectangle(circle.x - circle.radius, circle.y - circle.radius, circle.radius * 2, circle.radius * 2), { velocity: velocity, rotation: rotation }) || this;
            _this.circle = circle;
            _this.shape = _this.circle;
            return _this;
        }
        CircleGameObject.prototype.detectCollisionsWithOtherCircle = function (object) {
            // ToDO detect circles colliding
        };
        CircleGameObject.prototype.setPosition = function (position) {
            this.rectangle.x = position.x - this.circle.radius;
            this.rectangle.y = position.y - this.circle.radius;
            this.shape.x = position.x;
            this.shape.y = position.y;
            this.circle.x = position.x;
            this.circle.y = position.y;
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
                    collision = new collision_2.Collision('right', this, object);
                    this.currentCollisions.push(collision);
                }
                if (closestX === object.rectangle.x + object.rectangle.width) {
                    collision = new collision_2.Collision('left', this, object);
                    this.currentCollisions.push(collision);
                }
                if (closestY === object.rectangle.y) {
                    collision = new collision_2.Collision('bottom', this, object);
                    this.currentCollisions.push(collision);
                }
                if (closestY === object.rectangle.y + object.rectangle.height) {
                    collision = new collision_2.Collision('top', this, object);
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
            context.strokeStyle = 'gray';
            context.beginPath();
            context.arc(this.circle.x, this.circle.y, this.circle.radius, 0, 2 * Math.PI);
            context.stroke();
        };
        return CircleGameObject;
    }(gameObject_4.GameObject));
    exports.CircleGameObject = CircleGameObject;
});
define("game", ["require", "exports", "./constants.json"], function (require, exports, constants_json_1) {
    "use strict";
    exports.__esModule = true;
    exports.Game = void 0;
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
});
define("outer.walls", ["require", "exports", "./wall"], function (require, exports, wall_1) {
    "use strict";
    exports.__esModule = true;
    exports.OuterWalls = void 0;
    var WALL_DEPTH = window.gamework.WALL_DEPTH;
    var OuterWalls = /** @class */ (function () {
        function OuterWalls(scene, gap, wallsConfig) {
            if (gap === void 0) { gap = null; }
            if (wallsConfig === void 0) { wallsConfig = [
                { x: 0, y: 0, w: canvas.width, h: WALL_DEPTH },
                { x: (canvas.width) - WALL_DEPTH, y: WALL_DEPTH, w: WALL_DEPTH, h: canvas.height - (2 * -WALL_DEPTH) },
                { x: 0, y: (canvas.height) - WALL_DEPTH, w: (canvas.width) - WALL_DEPTH, h: WALL_DEPTH },
                { x: 0, y: WALL_DEPTH, w: WALL_DEPTH, h: (canvas.height) - (2 * WALL_DEPTH) }
            ]; }
            this.scene = scene;
            this.depth = WALL_DEPTH;
            this.wallsConfig = wallsConfig;
            this.pixelWallsConfig = [];
            this.walls = [];
            this.gap = gap;
            this.generateWalls();
        }
        OuterWalls.prototype.setWallsConfig = function (wallsConfig, gap) {
            this.removeWallsFromScene();
            this.walls = [];
            this.wallsConfig = wallsConfig;
            this.gap = gap;
            this.generateWalls();
        };
        OuterWalls.prototype.removeWallsFromScene = function () {
            this.scene.removeObjectsWithNameContaining('Wall');
        };
        OuterWalls.prototype.findWallIndexForGap = function () {
            var _this = this;
            if (!this.gap) {
                return -1;
            }
            return this.pixelWallsConfig.findIndex(function (pixelWallConfig) {
                return (_this.gap.rectangle.x >= pixelWallConfig.x
                    && (_this.gap.rectangle.x + _this.gap.rectangle.width) <= (pixelWallConfig.x + pixelWallConfig.w)
                    && _this.gap.rectangle.y >= pixelWallConfig.y
                    && (_this.gap.rectangle.y + _this.gap.rectangle.height) <= (pixelWallConfig.y + pixelWallConfig.h));
            });
        };
        OuterWalls.prototype.splitWallForGap = function () {
            var pixelWallConfigIndex = this.findWallIndexForGap();
            var pixelWallConfig = this.pixelWallsConfig[pixelWallConfigIndex];
            if (pixelWallConfigIndex < 0 || !this.gap) {
                return;
            }
            var newWall = { x: pixelWallConfig.x, y: pixelWallConfig.y, w: pixelWallConfig.w, h: pixelWallConfig.h };
            if (this.gap.rectangle.x === pixelWallConfig.x) {
                var origHeight = pixelWallConfig.h;
                this.pixelWallsConfig[pixelWallConfigIndex].h = origHeight - pixelWallConfig.y - (origHeight - this.gap.rectangle.y);
                newWall.y = this.gap.rectangle.y + this.gap.rectangle.height;
                newWall.height = origHeight - this.gap.rectangle.height - this.gap.rectangle.y;
            }
            if (this.gap.rectangle.y === pixelWallConfig.y) {
                var origWidth = pixelWallConfig.w;
                this.pixelWallsConfig[pixelWallConfigIndex].w = origWidth - pixelWallConfig.y - (origWidth - this.gap.rectangle.x);
                newWall.x = this.gap.rectangle.x + this.gap.rectangle.width;
                newWall.width = origWidth - this.gap.rectangle.width - this.gap.rectangle.x;
            }
            this.pixelWallsConfig.push(newWall);
        };
        OuterWalls.prototype.convertWallConfigToPixels = function () {
            var _this = this;
            this.pixelWallsConfig = [];
            this.wallsConfig.forEach(function (wallConfig) {
                var pixelWallConfig = __assign({}, wallConfig);
                ['x', 'y', 'w', 'h'].forEach(function (prop) {
                    if (wallConfig[prop] <= 1) {
                        var multiplier = (['x', 'w'].includes(prop) ? canvas.width : canvas.height) / window.devicePixelRatio;
                        pixelWallConfig[prop] = wallConfig[prop] * multiplier;
                    }
                });
                _this.pixelWallsConfig.push(pixelWallConfig);
            });
        };
        OuterWalls.prototype.generateWalls = function () {
            var _this = this;
            this.convertWallConfigToPixels();
            this.splitWallForGap();
            this.walls = this.pixelWallsConfig.map(function (wallConfig, index) {
                return new wall_1.Wall(_this.scene, wallConfig, "Wall ".concat(index));
            });
        };
        return OuterWalls;
    }());
    exports.OuterWalls = OuterWalls;
});
define("scene", ["require", "exports"], function (require, exports) {
    "use strict";
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
            if (this.game) {
                this.game.addScene(this);
            }
        }
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
        };
        return Scene;
    }());
    exports.Scene = Scene;
});
define("sound", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Sound = void 0;
    var Sound = /** @class */ (function () {
        function Sound(name, sound, loop, standardVolume) {
            if (loop === void 0) { loop = false; }
            if (standardVolume === void 0) { standardVolume = 4; }
            this.name = name;
            this.audio = null;
            this.loop = loop;
            this.sound = sound;
            this.loaded = false;
            this.standardVolume = standardVolume;
            this.playing = false;
            this.load();
            window.gamework.constants.ASSETS.push(this);
        }
        Sound.prototype.load = function () {
            var _this = this;
            this.audio = new Audio(this.sound);
            this.audio.preload = 'auto';
            this.audio.loop = this.loop;
            this.audio.load();
            this.audio.onloadeddata = function () {
                _this.loaded = true;
            };
        };
        Sound.prototype.play = function () {
            var _this = this;
            if (!this.loaded || this.playing) {
                return;
            }
            this.playing = true;
            // soundToPlay.volume = this.standardVolume;
            this.audio.play();
            this.audio.addEventListener('ended', function () { return _this.playing = false; });
        };
        Sound.prototype.stop = function () {
            this.audio.pause();
            this.playing = false;
        };
        return Sound;
    }());
    exports.Sound = Sound;
});
define("sprite", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Sprite = void 0;
    var Sprite = /** @class */ (function () {
        function Sprite(imageSrc, gameObject, animate) {
            if (animate === void 0) { animate = true; }
            this.gameObject = gameObject;
            this.imageSrc = imageSrc;
            this.loaded = false;
            this.image = new Image();
            this.animate = animate;
            this.repeat = true;
            this.isLoaded = null;
            this.load();
            this.currentFrame = 0;
            this.frameRate = 20;
            this.column = 0;
            this.row = 0;
            window.gamework.constants.ASSETS.push(this);
        }
        Sprite.prototype.setColumns = function (value) {
            this.columns = value;
            return this;
        };
        Sprite.prototype.setRows = function (value) {
            this.rows = value;
            return this;
        };
        Sprite.prototype.setColumn = function (value) {
            this.column = value;
            return this;
        };
        Sprite.prototype.setRow = function (value) {
            this.row = value;
            return this;
        };
        Sprite.prototype.nextColumn = function () {
            if (this.column + 1 === this.columns) {
                this.column = 0;
            }
            this.column += 1;
        };
        Sprite.prototype.nextRow = function () {
            if (this.row + 1 === this.rows) {
                this.row = 0;
            }
        };
        Sprite.prototype.nextImage = function () {
            if (this.currentFrame % this.frameRate !== 0) {
                return;
            }
            this.nextColumn();
            this.nextRow();
        };
        Sprite.prototype.setGameObject = function (gameObject) {
            this.gameObject = gameObject;
            return this;
        };
        Sprite.prototype.load = function () {
            var _this = this;
            this.image.onload = function () {
                _this.loaded = true;
            };
            this.image.src = this.imageSrc;
        };
        Sprite.prototype.draw = function (context) {
            if (!this.gameObject || !this.loaded) {
                return;
            }
            var w = this.image.width / this.columns;
            var h = this.image.height / this.rows;
            this.currentFrame += 1;
            context.drawImage(this.image, this.column * w, this.row * this.gameObject.rectangle.height, this.gameObject.rectangle.width, this.gameObject.rectangle.height, this.gameObject.rectangle.x, this.gameObject.rectangle.y, this.gameObject.rectangle.width, this.gameObject.rectangle.height);
            if (!this.animate) {
                return;
            }
            this.nextImage();
        };
        return Sprite;
    }());
    exports.Sprite = Sprite;
});
define("squareGameObject", ["require", "exports", "gameObject"], function (require, exports, gameObject_5) {
    "use strict";
    exports.__esModule = true;
    exports.SquareGameObject = void 0;
    var SquareGameObject = /** @class */ (function (_super) {
        __extends(SquareGameObject, _super);
        function SquareGameObject() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SquareGameObject;
    }(gameObject_5.GameObject));
    exports.SquareGameObject = SquareGameObject;
});
define("tileMap", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.TileMap = void 0;
    var TileMap = /** @class */ (function () {
        function TileMap(scene) {
            this.tiles = [];
        }
        return TileMap;
    }());
    exports.TileMap = TileMap;
});
define("timer", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Timer = void 0;
    var Timer = /** @class */ (function () {
        function Timer() {
            this.startTime = null;
            this.currentTime = null;
            this.timeElapsed = 0;
            this.timer = null;
        }
        Timer.prototype.start = function () {
            var _this = this;
            this.startTime = new Date();
            this.timeElapsed = 0;
            this.timer = setInterval(function () {
                _this.currentTime = new Date();
                _this.timeElapsed = Math.floor((_this.currentTime - _this.startTime) / 1000);
            }, 10);
        };
        Timer.prototype.stop = function () {
            this.startTime = null;
            this.currentTime = null;
            clearInterval(this.timer);
        };
        return Timer;
    }());
    exports.Timer = Timer;
});
