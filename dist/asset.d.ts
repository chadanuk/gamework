export class Asset {
    constructor(imageSrc: any, gameObject?: any, repeat?: boolean);
    gameObject: any;
    imageSrc: any;
    loaded: boolean;
    image: HTMLImageElement;
    repeat: boolean;
    findAsset(imageSrc: any): any;
    setRepeat(value: any): Asset;
    setGameObject(gameObject: any): Asset;
    load(): void;
    draw(context: any): void;
}
//# sourceMappingURL=asset.d.ts.map