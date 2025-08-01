"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetManager = void 0;
var popup_1 = require("./popup");
/**
 * AssetManager class for managing and tracking asset loading.
 */
var AssetManager = /** @class */ (function () {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    function AssetManager(canvas) {
        this.assets = window.gamework.constants.ASSETS;
        this.loadedInterval = null;
        this.allAssetsLoaded = false;
        this.loadingProgress = 0;
        this.popup = new popup_1.Popup('Asset manager popup', null, canvas, "Loading assets...");
    }
    /**
     * Returns a promise that resolves when all assets are loaded.
     * @returns {Promise<boolean>}
     */
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
    /**
     * Draw the loading progress popup and progress bar.
     * @param {CanvasRenderingContext2D} context
     */
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
