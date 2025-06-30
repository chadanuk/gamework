/**
 * TileMap class for managing and drawing tile-based maps.
 */
export class TileMap extends GameObject {
    /**
     * @param {Object} scene
     * @param {Object} [tileMap={}]
     * @param {string|null} [tileset=null]
     */
    constructor(scene: any, tileMap?: any, tileset?: string | null);
    id: string;
    tileMap: any;
    image: HTMLImageElement;
    isLoaded: any;
    tileset: string;
    /**
     * Set the scene for this tilemap.
     * @param {Object} scene
     * @returns {TileMap}
     */
    setScene(scene: any): TileMap;
    /**
     * Show or hide the hitbox.
     * @param {boolean} showHitBox
     * @returns {TileMap}
     */
    setShowHitBox(showHitBox: boolean): TileMap;
    /**
     * Load the tileset image and handle errors.
     * @private
     */
    private _load;
    loaded: boolean;
    /**
     * Get the tile value at a specific column and row.
     * @param {number} col
     * @param {number} row
     * @returns {number}
     */
    getTile(col: number, row: number): number;
    /**
     * Draw the tilemap.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context: CanvasRenderingContext2D): void;
}
import { GameObject } from "./gameObject";
//# sourceMappingURL=tileMap.d.ts.map