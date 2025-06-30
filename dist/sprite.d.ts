/**
 * Sprite class for handling sprite sheet animation and drawing.
 */
export class Sprite {
    /**
     * @param {string} imageSrc
     * @param {Object} gameObject
     * @param {boolean} [animate=true]
     */
    constructor(imageSrc: string, gameObject: any, animate?: boolean);
    gameObject: any;
    imageSrc: string;
    loaded: boolean;
    image: HTMLImageElement;
    animate: boolean;
    repeat: boolean;
    isLoaded: any;
    currentFrame: number;
    frameRate: number;
    column: number;
    row: number;
    /**
     * Set the number of columns in the sprite sheet.
     * @param {number} value
     * @returns {Sprite}
     */
    setColumns(value: number): Sprite;
    columns: number;
    /**
     * Set the number of rows in the sprite sheet.
     * @param {number} value
     * @returns {Sprite}
     */
    setRows(value: number): Sprite;
    rows: number;
    /**
     * Set the current column.
     * @param {number} value
     * @returns {Sprite}
     */
    setColumn(value: number): Sprite;
    /**
     * Set the current row.
     * @param {number} value
     * @returns {Sprite}
     */
    setRow(value: number): Sprite;
    /**
     * Advance to the next column.
     */
    _nextColumn(): void;
    /**
     * Advance to the next row.
     */
    _nextRow(): void;
    /**
     * Advance to the next image/frame.
     */
    _nextImage(): void;
    /**
     * Set the game object for this sprite.
     * @param {Object} gameObject
     * @returns {Sprite}
     */
    setGameObject(gameObject: any): Sprite;
    /**
     * Load the image and handle errors.
     * @private
     */
    private _load;
    /**
     * Draw the sprite.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=sprite.d.ts.map