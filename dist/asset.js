"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
/**
 * Asset class for managing image assets for game objects.
 */
var Asset = /** @class */ (function () {
    /**
     * @param {string} imageSrc
     * @param {Object|null} [gameObject=null]
     * @param {boolean} [repeat=true]
     */
    function Asset(imageSrc, gameObject, repeat) {
        if (gameObject === void 0) { gameObject = null; }
        if (repeat === void 0) { repeat = true; }
        this.gameObject = gameObject;
        this.imageSrc = imageSrc;
        this.loaded = false;
        this.image = new Image();
        this.repeat = repeat;
        this._load();
        if (!this._findAsset(imageSrc)) {
            window.gamework.constants.ASSETS.push(this);
        }
    }
    /**
     * Find an asset by image source.
     * @param {string} imageSrc
     * @returns {Asset|null}
     */
    Asset.prototype._findAsset = function (imageSrc) {
        var foundAsset = window.gamework.constants.ASSETS.find(function (assetInData) {
            return assetInData.imageSrc === imageSrc;
        });
        return foundAsset || null;
    };
    /**
     * Set whether the asset should repeat.
     * @param {boolean} value
     * @returns {Asset}
     */
    Asset.prototype.setRepeat = function (value) {
        this.repeat = value;
        return this;
    };
    /**
     * Set the game object for this asset.
     * @param {Object} gameObject
     * @returns {Asset}
     */
    Asset.prototype.setGameObject = function (gameObject) {
        this.gameObject = gameObject;
        return this;
    };
    /**
     * Load the image and handle errors.
     * @private
     */
    Asset.prototype._load = function () {
        var _this = this;
        if (this.gameObject) {
            this.image.width = this.gameObject.rectangle.width;
            this.image.height = this.gameObject.rectangle.height;
            this.image.style.objectFit = 'contain';
        }
        this.image.onload = function () {
            _this.loaded = true;
        };
        this.image.onerror = function () {
            console.error("Failed to load asset image: ".concat(_this.imageSrc));
        };
        this.image.src = this.imageSrc;
    };
    /**
     * Draw the asset.
     * @param {CanvasRenderingContext2D} context
     */
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
