"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
