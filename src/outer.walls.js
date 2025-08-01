import { Wall } from "./wall";
const WALL_DEPTH = window.gamework.WALL_DEPTH;

/**
 * OuterWalls class for managing the outer boundary walls of the game.
 */
export class OuterWalls {
    /**
     * @param {Object} scene
     * @param {Object|null} [gap=null]
     * @param {Array} [wallsConfig]
     */
    constructor(scene, gap = null, wallsConfig = [
        {x: 0, y: 0, w: canvas.width, h: WALL_DEPTH},
        {x: (canvas.width) - WALL_DEPTH, y: WALL_DEPTH, w: WALL_DEPTH, h: canvas.height - (2 *  - WALL_DEPTH)},
        {x: 0, y: (canvas.height) - WALL_DEPTH, w: (canvas.width) - WALL_DEPTH, h: WALL_DEPTH},
        {x: 0, y: WALL_DEPTH, w: WALL_DEPTH, h: (canvas.height) - (2 * WALL_DEPTH)}
    ]) {
        this.scene = scene;
        this.depth = WALL_DEPTH;
        this.wallsConfig = wallsConfig;
        this.pixelWallsConfig = [];
        this.walls = [];
        this.gap = gap;
        this.generateWalls();
    }
    
    /**
     * Set the wall configuration and optional gap.
     * @param {Array} wallsConfig
     * @param {Object|null} gap
     */
    setWallsConfig(wallsConfig, gap) {
        this.removeWallsFromScene();
        this.walls = [];
        this.wallsConfig = wallsConfig;
        this.gap = gap;
        this.generateWalls();
    }

    /** Remove all walls from the scene. */
    removeWallsFromScene() {
        this.scene.removeObjectsWithNameContaining('Wall');
    }

    /**
     * Find the wall index for the gap.
     * @returns {number}
     */
    findWallIndexForGap() {
        if(!this.gap) {
            return -1;
        }
        return this.pixelWallsConfig.findIndex((pixelWallConfig) => {
            return (this.gap.rectangle.x >= pixelWallConfig.x 
            && (this.gap.rectangle.x + this.gap.rectangle.width) <= (pixelWallConfig.x + pixelWallConfig.w)
            && this.gap.rectangle.y >= pixelWallConfig.y
            && (this.gap.rectangle.y + this.gap.rectangle.height) <= (pixelWallConfig.y + pixelWallConfig.h));
        });
    }
    
    /** Split a wall to create a gap. */
    splitWallForGap() {
        const pixelWallConfigIndex = this.findWallIndexForGap();
        const pixelWallConfig = this.pixelWallsConfig[pixelWallConfigIndex];
        
        if(pixelWallConfigIndex < 0 || !this.gap) {
            return;
        }
        const newWall = {x: pixelWallConfig.x, y: pixelWallConfig.y, w: pixelWallConfig.w, h: pixelWallConfig.h};
        if(this.gap.rectangle.x === pixelWallConfig.x) {
            const origHeight = pixelWallConfig.h;
            this.pixelWallsConfig[pixelWallConfigIndex].h = origHeight - pixelWallConfig.y - (origHeight - this.gap.rectangle.y);
            newWall.y = this.gap.rectangle.y + this.gap.rectangle.height;
            newWall.height = origHeight - this.gap.rectangle.height - this.gap.rectangle.y;
        }
        if(this.gap.rectangle.y === pixelWallConfig.y) {
            const origWidth = pixelWallConfig.w;
            this.pixelWallsConfig[pixelWallConfigIndex].w = origWidth - pixelWallConfig.y - (origWidth - this.gap.rectangle.x);
            newWall.x = this.gap.rectangle.x + this.gap.rectangle.width;
            newWall.width = origWidth - this.gap.rectangle.width - this.gap.rectangle.x;
        }

        this.pixelWallsConfig.push(newWall);
    }

    /** Convert wall configuration to pixel values. */
    convertWallConfigToPixels() {
        this.pixelWallsConfig = [];
        this.wallsConfig.forEach((wallConfig) => {
            const pixelWallConfig = {...wallConfig};

            ['x', 'y', 'w', 'h'].forEach((prop) => {
                if(wallConfig[prop] <= 1) {
                    const multiplier = (['x', 'w'].includes(prop) ? canvas.width : canvas.height) / window.devicePixelRatio;
                    pixelWallConfig[prop] = wallConfig[prop] * multiplier;
                }
            }); 
            this.pixelWallsConfig.push(pixelWallConfig);
        });
    }

    /** Generate the wall objects based on configuration. */
    generateWalls() {
        this.convertWallConfigToPixels();
        
        this.splitWallForGap();

        this.walls = this.pixelWallsConfig.map((wallConfig, index) => {
            return new Wall(this.scene, wallConfig, `Wall ${index}`);
        });
    }
}