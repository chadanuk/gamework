/**
 * Represents a scene containing game objects and handling input/camera.
 */
export class Scene {
    /**
     * @param {string|null} name
     * @param {Object|null} game
     */
    constructor(name?: string | null, game?: any | null);
    id: string;
    objects: Map<any, any>;
    objectsSelected: any[];
    objectsHoveredOver: any[];
    showHitBoxes: boolean;
    name: string;
    game: any;
    hidden: boolean;
    deleted: boolean;
    camera: any;
    /**
     * Set the camera for this scene.
     * @param {Object} camera
     * @returns {Scene}
     */
    setCamera(camera: any): Scene;
    /** Remove this scene and its objects. */
    remove(): void;
    /**
     * Set the game for this scene.
     * @param {Object} game
     * @returns {Scene}
     */
    setGame(game: any): Scene;
    /**
     * Show or hide hitboxes for all objects.
     * @param {boolean} show
     * @returns {Scene}
     */
    setShowHitBoxes(show: boolean): Scene;
    /**
     * Add an object to the scene.
     * @param {Object} object
     * @returns {Scene}
     */
    addObject(object: any): Scene;
    /** Remove all objects from the scene. */
    clearObjects(): Scene;
    /**
     * Find an object by name.
     * @param {string} name
     * @returns {Object|undefined}
     */
    findObjectByName(name: string): any | undefined;
    /**
     * Remove objects whose name contains a substring.
     * @param {string} stringPartial
     */
    removeObjectsWithNameContaining(stringPartial: string): void;
    /** Hide this scene. */
    hide(): void;
    /** Show this scene. */
    show(): void;
    /**
     * Find the index of an object in the scene (by id).
     * @param {Object} object
     * @returns {number|null}
     */
    findObjectIndex(object: any): number | null;
    /**
     * Handle keys down for all objects.
     * @param {Array<string>} keysDown
     */
    handleKeysDown(keysDown: Array<string>): void;
    /**
     * Handle key up for all objects.
     * @param {Array<string>} keysDown
     * @param {string} keyUp
     */
    handleKeyUp(keysDown: Array<string>, keyUp: string): void;
    /**
     * Handle pointer down event for all objects.
     * @param {Object} position
     */
    handlePointerDown(position: any): void;
    /**
     * Handle pointer movement for all objects.
     * @param {Object} movement
     * @param {Object} pointerPosition
     * @param {boolean} pointerIsDown
     */
    handlePointerMovement(movement: any, pointerPosition: any, pointerIsDown: boolean): void;
    /**
     * Handle pointer end for all objects.
     * @param {Object} movement
     */
    handlePointerEnd(movement: any): void;
    /**
     * Draw all objects in the scene.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=scene.d.ts.map