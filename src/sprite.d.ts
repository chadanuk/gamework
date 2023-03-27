export class Sprite {
    constructor(imageSrc: any, gameObject: any, animate?: boolean);
    gameObject: any;
    imageSrc: any;
    loaded: boolean;
    image: HTMLImageElement;
    animate: boolean;
    repeat: boolean;
    isLoaded: any;
    currentFrame: number;
    frameRate: number;
    column: number;
    row: number;
    setColumns(value: any): Sprite;
    columns: any;
    setRows(value: any): Sprite;
    rows: any;
    setColumn(value: any): Sprite;
    setRow(value: any): Sprite;
    nextColumn(): void;
    nextRow(): void;
    nextImage(): void;
    setGameObject(gameObject: any): Sprite;
    load(): void;
    draw(context: any): void;
}
//# sourceMappingURL=sprite.d.ts.map