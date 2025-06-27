import { GameObject } from "./gameObject";
import { Rectangle } from "./rectangle";

/**
 * TileMap class for managing and drawing tile-based maps.
 */
export class TileMap extends GameObject {
    /**
     * @param {Object} scene
     * @param {Object} [tileMap={}]
     * @param {string|null} [tileset=null]
     */
    constructor(scene, tileMap = {}, tileset = null) {
        super(scene,'tilemap', new Rectangle(0, 0, 32, 32));
        this.name = 'tilemap';
        this.id = `tilemap-${new Date().getTime()}`;
        scene.addObject(this);
        this.showHitBox = false;
        this.tileMap = {
            cols: 8,
            rows: 80,
            tsize: 32,
            tiles: [],
            ...tileMap,
        };
        this.image = new Image();
        this.isLoaded = null;
        this.tileset = tileset;
        this._load();
        window.gamework.constants.ASSETS.push(this);
    }

    /**
     * Set the scene for this tilemap.
     * @param {Object} scene
     * @returns {TileMap}
     */
    setScene(scene) {
        this.scene = scene;
        return this;
    }

    /**
     * Show or hide the hitbox.
     * @param {boolean} showHitBox
     * @returns {TileMap}
     */
    setShowHitBox(showHitBox) {
        this.showHitBox = showHitBox;
        return this;
    }

    drawHitBox(context) {}
    handleCollisions() {}
    calculatePosition() {}

    /**
     * Load the tileset image and handle errors.
     * @private
     */
    _load() {
        this.image.onload = () => {
            this.loaded = true;
        };
        this.image.onerror = () => {
            console.error(`Failed to load tileset image: ${this.tileset}`);
        };
        this.image.src = this.tileset;
    }

    /**
     * Get the tile value at a specific column and row.
     * @param {number} col
     * @param {number} row
     * @returns {number}
     */
    getTile(col, row) {
        return this.tileMap.tiles[row * this.tileMap.cols + col];
    }

    /**
     * Draw the tilemap.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        if(!this.loaded) {
            return;
        }
        for (let c = 0; c < this.tileMap.cols; c++) {
            for (let r = 0; r < this.tileMap.rows; r++) {
                let tile = this.getTile(c, r);
                if (tile === 0) { // 0 => empty tile
                    continue;
                }
                const x = c * this.tileMap.tsize;
                const y = r * this.tileMap.tsize;
                context.drawImage(
                    this.image,
                    (tile - 1) * this.tileMap.tsize,
                    (tile - 1) * this.tileMap.tsize / this.tileMap.cols,
                    this.tileMap.tsize,
                    this.tileMap.tsize, 
                    x, 
                    y,
                    this.tileMap.tsize,
                    this.tileMap.tsize
                );
            }
        }
    }
}