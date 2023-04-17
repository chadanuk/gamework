export class TileMap {
    constructor(scene: any, tileMap: any, tileset?: any);
    scene: any;
    tileMap: any;
    image: HTMLImageElement;
    isLoaded: any;
    tileset: any;
    setScene(scene: any): void;
    load(): void;
    loaded: boolean;
    getTile(col: any, row: any): any;
    draw(context: any): void;
}
//# sourceMappingURL=scene.d.ts.map