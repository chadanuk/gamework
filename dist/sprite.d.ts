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
    setColumns(value: any): this;
    columns: any;
    setRows(value: any): this;
    rows: any;
    setColumn(value: any): this;
    setRow(value: any): this;
    nextColumn(): void;
    nextRow(): void;
    nextImage(): void;
    setGameObject(gameObject: any): this;
    load(): void;
    draw(context: any): void;
}
//# sourceMappingURL=sprite.d.ts.map