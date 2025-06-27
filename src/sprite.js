/**
 * Sprite class for handling sprite sheet animation and drawing.
 */
export class Sprite {
    /**
     * @param {string} imageSrc
     * @param {Object} gameObject
     * @param {boolean} [animate=true]
     */
    constructor(imageSrc, gameObject, animate = true) {
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
    setColumns(value) {
        this.columns = value;
        return this;
    }

    /**
     * Set the number of rows in the sprite sheet.
     * @param {number} value
     * @returns {Sprite}
     */
    setRows(value) {
        this.rows = value;
        return this;
    }

    /**
     * Set the current column.
     * @param {number} value
     * @returns {Sprite}
     */
    setColumn(value) {
        this.column = value;
        return this;
    }

    /**
     * Set the current row.
     * @param {number} value
     * @returns {Sprite}
     */
    setRow(value) {
        this.row = value;
        return this;
    }

    /**
     * Advance to the next column.
     */
    _nextColumn() {
        if(this.column + 1 >= this.columns) {
            this.column = 0;
        } else {
            this.column += 1;
        }
    }

    /**
     * Advance to the next row.
     */
    _nextRow() {
        if(this.row + 1 >= this.rows) {
            this.row = 0;
        } else {
            this.row += 1;
        }
    }

    /**
     * Advance to the next image/frame.
     */
    _nextImage() {
        if(this.currentFrame % this.frameRate !== 0) {
            return;
        }
        this._nextColumn();
        this._nextRow();
    }

    /**
     * Set the game object for this sprite.
     * @param {Object} gameObject
     * @returns {Sprite}
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
        this.image.onload = () => {
            this.loaded = true;
        };
        this.image.onerror = () => {
            console.error(`Failed to load sprite image: ${this.imageSrc}`);
        };
        this.image.src = this.imageSrc;
    }

    /**
     * Draw the sprite.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        if(!this.gameObject || !this.loaded) {
            return;
        }
        const w = this.image.width / this.columns;
        const h = this.image.height / this.rows;
        if(this.animate) {
            this.currentFrame += 1;
        }
        context.drawImage(
            this.image,
            this.column * w,
            this.row * h,
            w,
            h,
            this.gameObject.rectangle.x,
            this.gameObject.rectangle.y,
            this.gameObject.rectangle.width,
            this.gameObject.rectangle.height
        );
        if(this.animate) {
            this._nextImage();
        }
    }
}