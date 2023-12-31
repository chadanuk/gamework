"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
