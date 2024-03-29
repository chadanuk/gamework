export class Scene {
    constructor(name?: any, game?: any);
    id: string;
    objects: any[];
    objectsSelected: any[];
    objectsHoveredOver: any[];
    showHitBoxes: boolean;
    name: any;
    game: any;
    hidden: boolean;
    deleted: boolean;
    camera: any;
    setCamera(camera: any): this;
    remove(): void;
    setGame(game: any): this;
    setShowHitBoxes(show: any): this;
    addObject(object: any): this;
    clearObjects(): this;
    findObjectByName(name: any): any;
    removeObjectsWithNameContaining(stringPartial: any): void;
    hide(): void;
    show(): void;
    findObjectIndex(object: any): any;
    handleKeysDown(keysDown: any): void;
    handleKeyUp(keysDown: any, keyUp: any): void;
    handlePointerDown(position: any): void;
    handlePointerMovement(movement: any, pointerPosition: any, pointerIsDown: any): void;
    handlePointerEnd(movement: any): void;
    draw(context: any): void;
}
//# sourceMappingURL=scene.d.ts.map