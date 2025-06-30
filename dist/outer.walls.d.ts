/**
 * OuterWalls class for managing the outer boundary walls of the game.
 */
export class OuterWalls {
    /**
     * @param {Object} scene
     * @param {Object|null} [gap=null]
     * @param {Array} [wallsConfig]
     */
    constructor(scene: any, gap?: any | null, wallsConfig?: any[]);
    scene: any;
    depth: any;
    wallsConfig: any[];
    pixelWallsConfig: any[];
    walls: any[];
    gap: any;
    /**
     * Set the wall configuration and optional gap.
     * @param {Array} wallsConfig
     * @param {Object|null} gap
     */
    setWallsConfig(wallsConfig: any[], gap: any | null): void;
    /** Remove all walls from the scene. */
    removeWallsFromScene(): void;
    /**
     * Find the wall index for the gap.
     * @returns {number}
     */
    findWallIndexForGap(): number;
    /** Split a wall to create a gap. */
    splitWallForGap(): void;
    /** Convert wall configuration to pixel values. */
    convertWallConfigToPixels(): void;
    /** Generate the wall objects based on configuration. */
    generateWalls(): void;
}
//# sourceMappingURL=outer.walls.d.ts.map