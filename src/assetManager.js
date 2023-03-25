import { ASSETS, COLOURS, POPUP } from "../constants";
import { Popup } from "./popup";

export class AssetManager {
    constructor(canvas) {
        this.assets = ASSETS;
        this.loadedInterval = null;
        this.allAssetsLoaded = false;
        this.loadingProgress = 0;
        this.popup = new Popup('Asset manager popup', null, canvas, "Loading assets...")
    }

    assetsLoaded() {
        return new Promise((resolve, reject) => {
            this.loadedInterval = setInterval(() => {
                let loadedAll = true;
                this.assets.forEach((asset, index) => {
                    if(!asset.loaded) {
                        loadedAll = false;
                    } else {
                        this.loadingProgress = index +1;
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

    drawLoadingProgress(context) {
        if(this.allAssetsLoaded) {
            return;
        }
        this.popup.draw(context);
        // Draw progress bar
        context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        context.fillRect(this.popup.rectangle.x + POPUP.padding, this.popup.rectangle.y + 50, (this.popup.rectangle.width - (2 * POPUP.padding)) * ((this.loadingProgress) / this.assets.length), 20);
        context.fill();
        
        context.beginPath();
        context.fillStyle = COLOURS.modalTextColour;
        context.font = '16px sans-serif';
        
        const percent = Math.ceil(this.loadingProgress / this.assets.length * 100);
        
        context.fillText(`Assets loading: ${percent}%`, this.popup.rectangle.x + POPUP.padding, this.popup.rectangle.y + 100);
        context.fill();
        requestAnimationFrame(() => {
            this.drawLoadingProgress(context);
        })
    }
}