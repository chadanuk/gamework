/**
 * Asset class for managing image assets for game objects.
 */
export class Asset {
    /**
     * @param {string} imageSrc
     * @param {Object|null} [gameObject=null]
     * @param {boolean} [repeat=true]
     */
    constructor(imageSrc, gameObject = null, repeat = true) {
        this.gameObject = gameObject;
        this.imageSrc = imageSrc;
        this.loaded = false;
        this.image = new Image();
        this.repeat = repeat;
        this._load();
        if(!this._findAsset(imageSrc)) {
            window.gamework.constants.ASSETS.push(this);
        }
    }

    /**
     * Find an asset by image source.
     * @param {string} imageSrc
     * @returns {Asset|null}
     */
    _findAsset(imageSrc) {
        const foundAsset = window.gamework.constants.ASSETS.find((assetInData) => {
            return assetInData.imageSrc === imageSrc;
        });
        return foundAsset || null;
    }

    /**
     * Set whether the asset should repeat.
     * @param {boolean} value
     * @returns {Asset}
     */
    setRepeat(value) {
        this.repeat = value;
        return this;
    }

    /**
     * Set the game object for this asset.
     * @param {Object} gameObject
     * @returns {Asset}
     */
    setGameObject(gameObject) {
        this.gameObject = gameObject;
        return this;
    }

    /**
     * Load the image and handle errors.
     * @private
     */
    _load() {
        if(this.gameObject) {
            this.image.width = this.gameObject.rectangle.width;
            this.image.height = this.gameObject.rectangle.height;
            this.image.style.objectFit = 'contain';
        }
        this.image.onload = () => {
            this.loaded = true;
        };
        this.image.onerror = () => {
            console.error(`Failed to load asset image: ${this.imageSrc}`);
        };
        this.image.src = this.imageSrc;
    }

    /**
     * Draw the asset.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        if(!this.gameObject || !this.loaded) {
            return;
        }
        if(this.repeat) {
            const pattern = context.createPattern(this.image, "repeat");
            context.fillStyle = pattern;
            context.fillRect(this.gameObject.rectangle.x, this.gameObject.rectangle.y, this.gameObject.rectangle.width, this.gameObject.rectangle.height);
            return;
        }
        context.drawImage(this.image, this.gameObject.rectangle.x, this.gameObject.rectangle.y, this.gameObject.rectangle.width, this.gameObject.rectangle.height);
    }
}