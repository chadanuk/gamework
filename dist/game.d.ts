/**
 * Main Game controller for the 2D game engine.
 */
export class Game {
    /**
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game.
     */
    constructor(canvas: HTMLCanvasElement);
    canvas: HTMLCanvasElement;
    scale: number;
    /**
     * Set up the canvas size.
     */
    setUpCanvas(): void;
    scenes: any[];
    showHitBoxes: boolean;
    paused: boolean;
    currentFrame: number;
    pointerIsDown: boolean;
    pointerDownPosition: {
        x: number;
        y: number;
    };
    keysDown: Set<any>;
    keysToListenFor: string[];
    constants: any;
    _handlePointerDown: any;
    _handlePointerMove: any;
    _handlePointerEnd: any;
    _handleKeyDown: any;
    _handleKeyUp: any;
    /**
     * Override or extend game constants.
     * @param {Object} constants
     * @returns {Game}
     */
    setConstants(constants: any): Game;
    /**
     * Pause the game loop.
     */
    pause(): void;
    /**
     * Remove all event listeners.
     */
    removeEventListeners(): void;
    /**
     * Add all event listeners.
     */
    addEventListeners(): void;
    /**
     * Handle key down events.
     * @param {KeyboardEvent} event
     */
    handleKeyDown(event: KeyboardEvent): void;
    /**
     * Handle key up events.
     * @param {KeyboardEvent} event
     */
    handleKeyUp(event: KeyboardEvent): void;
    /**
     * Get pointer position from event.
     * @param {MouseEvent|TouchEvent} event
     * @returns {{x: number, y: number}}
     */
    getPositionFromPointerEvent(event: MouseEvent | TouchEvent): {
        x: number;
        y: number;
    };
    /**
     * Handle pointer down events.
     * @param {MouseEvent|TouchEvent} event
     */
    handlePointerDown(event: MouseEvent | TouchEvent): void;
    /**
     * Handle pointer move events.
     * @param {MouseEvent|TouchEvent} event
     */
    handlePointerMove(event: MouseEvent | TouchEvent): void;
    /**
     * Handle pointer end events.
     * @param {MouseEvent|TouchEvent} event
     */
    handlePointerEnd(event: MouseEvent | TouchEvent): void;
    /**
     * Initialise the 2D context and scaling.
     */
    initialiseContext(): void;
    context: CanvasRenderingContext2D;
    /**
     * Add a scene to the game.
     * @param {Object} scene
     * @returns {Game}
     */
    addScene(scene: any): Game;
    /**
     * Remove a scene from the game.
     * @param {Object} sceneToRemove
     */
    removeScene(sceneToRemove: any): void;
    /**
     * Start the game loop.
     */
    startLoop(): void;
    /**
     * Draw all scenes.
     */
    draw(): void;
    /**
     * Main game loop.
     */
    loop(): void;
}
//# sourceMappingURL=game.d.ts.map