export class Game {
    constructor(canvas: any);
    canvas: any;
    scale: number;
    scenes: any[];
    showHitBoxes: boolean;
    paused: boolean;
    currentFrame: number;
    pointerIsDown: boolean;
    pointerDownPosition: {
        x: any;
        y: any;
    };
    keysDown: any[];
    keysToListenFor: string[];
    constants: any;
    setConstants(constants: any): this;
    pause(): void;
    removeEventListeners(): void;
    addEventListeners(): void;
    handleKeyDown(event: any): void;
    handleKeyUp(event: any): void;
    getPositionFromPointerEvent(event: any): {
        x: any;
        y: any;
    };
    handlePointerDown(event: any): void;
    handlePointerMove(event: any): void;
    handlePointerEnd(event: any): void;
    setUpCanvas(): void;
    initialiseContext(): void;
    context: any;
    addScene(scene: any): this;
    removeScene(sceneToRemove: any): void;
    startLoop(): void;
    draw(): void;
    loop(): void;
}
//# sourceMappingURL=game.d.ts.map