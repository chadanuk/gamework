export class TileMap {
    constructor(scene: any, tileMap?: {}, tileset?: any);
    name: string;
    id: string;
    showHitBox: boolean;
    tileMap: {
        cols: number;
        rows: number;
        tsize: number;
        tiles: any[];
    };
    image: HTMLImageElement;
    isLoaded: any;
    tileset: any;
    setScene(scene: any): TileMap;
    scene: any;
    setShowHitBox(showHitBox: any): TileMap;
    drawHitBox(context: any): void;
    handleCollisions(): void;
    calculatePosition(): void;
    load(): void;
    loaded: boolean;
    getTile(col: any, row: any): any;
    draw(context: any): void;
}
//# sourceMappingURL=tileMap.d.ts.map