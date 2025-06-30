"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite = void 0;
/**
 * Sprite class for handling sprite sheet animation and drawing.
 */
var Sprite = /** @class */ (function () {
    /**
     * @param {string} imageSrc
     * @param {Object} gameObject
     * @param {boolean} [animate=true]
     */
    function Sprite(imageSrc, gameObject, animate) {
        if (animate === void 0) { animate = true; }
        this.gameObject = gameObject;
        this.imageSrc = imageSrc;
        this.loaded = false;
        this.image = new Image();
        this.animate = animate;
        this.repeat = true;
        this.isLoaded = null;
        this.currentFrame = 0;
        this.frameRate = 20;
        this.column = 0;
        this.row = 0;
        window.gamework.constants.ASSETS.push(this);
        this._load();
    }
    /**
     * Set the number of columns in the sprite sheet.
     * @param {number} value
     * @returns {Sprite}
     */
    Sprite.prototype.setColumns = function (value) {
        this.columns = value;
        return this;
    };
    /**
     * Set the number of rows in the sprite sheet.
     * @param {number} value
     * @returns {Sprite}
     */
    Sprite.prototype.setRows = function (value) {
        this.rows = value;
        return this;
    };
    /**
     * Set the current column.
     * @param {number} value
     * @returns {Sprite}
     */
    Sprite.prototype.setColumn = function (value) {
        this.column = value;
        return this;
    };
    /**
     * Set the current row.
     * @param {number} value
     * @returns {Sprite}
     */
    Sprite.prototype.setRow = function (value) {
        this.row = value;
        return this;
    };
    /**
     * Advance to the next column.
     */
    Sprite.prototype._nextColumn = function () {
        if (this.column + 1 >= this.columns) {
            this.column = 0;
        }
        else {
            this.column += 1;
        }
    };
    /**
     * Advance to the next row.
     */
    Sprite.prototype._nextRow = function () {
        if (this.row + 1 >= this.rows) {
            this.row = 0;
        }
        else {
            this.row += 1;
        }
    };
    /**
     * Advance to the next image/frame.
     */
    Sprite.prototype._nextImage = function () {
        if (this.currentFrame % this.frameRate !== 0) {
            return;
        }
        this._nextColumn();
        this._nextRow();
    };
    /**
     * Set the game object for this sprite.
     * @param {Object} gameObject
     * @returns {Sprite}
     */
    Sprite.prototype.setGameObject = function (gameObject) {
        this.gameObject = gameObject;
        return this;
    };
    /**
     * Load the image and handle errors.
     * @private
     */
    Sprite.prototype._load = function () {
        var _this = this;
        this.image.onload = function () {
            _this.loaded = true;
        };
        this.image.onerror = function () {
            console.error("Failed to load sprite image: ".concat(_this.imageSrc));
        };
        this.image.src = this.imageSrc;
    };
    /**
     * Draw the sprite.
     * @param {CanvasRenderingContext2D} context
     */
    Sprite.prototype.draw = function (context) {
        if (!this.gameObject || !this.loaded) {
            return;
        }
        var w = this.image.width / this.columns;
        var h = this.image.height / this.rows;
        if (this.animate) {
            this.currentFrame += 1;
        }
        context.drawImage(this.image, this.column * w, this.row * h, w, h, this.gameObject.rectangle.x, this.gameObject.rectangle.y, this.gameObject.rectangle.width, this.gameObject.rectangle.height);
        if (this.animate) {
            this._nextImage();
        }
    };
    return Sprite;
}());
exports.Sprite = Sprite;
