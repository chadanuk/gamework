/**
 * AssetManager class for managing and tracking asset loading.
 */
export class AssetManager {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas: HTMLCanvasElement);
    assets: any;
    loadedInterval: any;
    allAssetsLoaded: boolean;
    loadingProgress: number;
    popup: Popup;
    /**
     * Returns a promise that resolves when all assets are loaded.
     * @returns {Promise<boolean>}
     */
    assetsLoaded(): Promise<boolean>;
    /**
     * Draw the loading progress popup and progress bar.
     * @param {CanvasRenderingContext2D} context
     */
    drawLoadingProgress(context: CanvasRenderingContext2D): void;
}
import { Popup } from "./popup";
//# sourceMappingURL=assetManager.d.ts.map