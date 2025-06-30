/**
 * Asset class for managing image assets for game objects.
 */
export class Asset {
    /**
     * @param {string} imageSrc
     * @param {Object|null} [gameObject=null]
     * @param {boolean} [repeat=true]
     */
    constructor(imageSrc: string, gameObject?: any | null, repeat?: boolean);
    gameObject: any;
    imageSrc: string;
    loaded: boolean;
    image: HTMLImageElement;
    repeat: boolean;
    /**
     * Find an asset by image source.
     * @param {string} imageSrc
     * @returns {Asset|null}
     */
    _findAsset(imageSrc: string): Asset | null;
    /**
     * Set whether the asset should repeat.
     * @param {boolean} value
     * @returns {Asset}
     */
    setRepeat(value: boolean): Asset;
    /**
     * Set the game object for this asset.
     * @param {Object} gameObject
     * @returns {Asset}
     */
    setGameObject(gameObject: any): Asset;
    /**
     * Load the image and handle errors.
     * @private
     */
    private _load;
    /**
     * Draw the asset.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=asset.d.ts.map