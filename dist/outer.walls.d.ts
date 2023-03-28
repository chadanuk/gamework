export class OuterWalls {
    constructor(scene: any, gap?: any, wallsConfig?: ({
        x: number;
        y: number;
        w: any;
        h: any;
    } | {
        x: number;
        y: any;
        w: any;
        h: number;
    })[]);
    scene: any;
    depth: any;
    wallsConfig: ({
        x: number;
        y: number;
        w: any;
        h: any;
    } | {
        x: number;
        y: any;
        w: any;
        h: number;
    })[];
    pixelWallsConfig: any[];
    walls: any[];
    gap: any;
    setWallsConfig(wallsConfig: any, gap: any): void;
    removeWallsFromScene(): void;
    findWallIndexForGap(): any;
    splitWallForGap(): void;
    convertWallConfigToPixels(): void;
    generateWalls(): void;
}
//# sourceMappingURL=outer.walls.d.ts.map