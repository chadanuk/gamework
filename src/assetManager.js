import { Popup } from "./popup";

/**
 * AssetManager class for managing and tracking asset loading.
 */
export class AssetManager {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        this.assets = window.gamework.constants.ASSETS;
        this.loadedInterval = null;
        this.allAssetsLoaded = false;
        this.loadingProgress = 0;
        this.popup = new Popup('Asset manager popup', null, canvas, "Loading assets...")
    }

    /**
     * Returns a promise that resolves when all assets are loaded.
     * @returns {Promise<boolean>}
     */
    assetsLoaded() {
        return new Promise((resolve, reject) => {
            this.loadedInterval = setInterval(() => {
                let loadedAll = true;
                this.assets.forEach((asset, index) => {
                    if(!asset.loaded) {
                        loadedAll = false;
                    } else {
                        this.loadingProgress = index + 1;
                    }
                });
                if(loadedAll) {
                    this.allAssetsLoaded = true;
                    clearInterval(this.loadedInterval);
                    resolve(true);
                }
            }, 10);
        });
    }

    /**
     * Draw the loading progress popup and progress bar.
     * @param {CanvasRenderingContext2D} context
     */
    drawLoadingProgress(context) {
        if(this.allAssetsLoaded) {
            return;
        }
        this.popup.draw(context);
        // Draw progress bar
        context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        context.fillRect(
            this.popup.rectangle.x + window.gamework.constants.POPUP.padding,
            this.popup.rectangle.y + 50,
            (this.popup.rectangle.width - (2 * window.gamework.constants.POPUP.padding)) * ((this.loadingProgress) / this.assets.length),
            20
        );
        context.fill();
        context.beginPath();
        context.fillStyle = window.gamework.constants.COLOURS.modalTextColour;
        context.font = '16px sans-serif';
        const percent = Math.ceil(this.loadingProgress / this.assets.length * 100);
        context.fillText(`Assets loading: ${percent}%`, this.popup.rectangle.x + window.gamework.constants.POPUP.padding, this.popup.rectangle.y + 100);
        context.fill();
        requestAnimationFrame(() => {
            this.drawLoadingProgress(context);
        });
    }
}