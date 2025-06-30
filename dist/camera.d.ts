/**
 * Camera class for managing viewport and following objects in a scene.
 */
export class Camera {
    /**
     * @param {string} name
     * @param {Object} viewPort
     * @param {Object} scene
     */
    constructor(name: string, viewPort: any, scene: any);
    id: string;
    name: string;
    viewPort: any;
    following: any[];
    scrollPosition: Vector;
    currentScrollPosition: Vector;
    currentScrollPositionChange: Vector;
    scene: any;
    padding: number;
    zoom: number;
    scrolling: boolean;
    effectDuration: number;
    positionChangeRequired: Vector;
    /**
     * Update the viewport size based on the canvas size.
     * @private
     */
    private _updateViewPortBasedOnCanvasSize;
    /**
     * Set the camera padding.
     * @param {number} padding
     * @returns {Camera}
     */
    setPadding(padding: number): Camera;
    /**
     * Follow a single object.
     * @param {Object} object
     * @param {number} [padding=100]
     */
    followObject(object: any, padding?: number): void;
    /**
     * Follow multiple objects.
     * @param {Array} objects
     * @param {number} [padding=50]
     */
    followObjects(objects: any[], padding?: number): void;
    /**
     * Linear easing function.
     * @param {number} time
     * @param {number} currentValue
     * @param {number} endValue
     * @param {number} duration
     * @returns {number}
     */
    _easeLinear(time: number, currentValue: number, endValue: number, duration: number): number;
    /**
     * Ease the camera scroll.
     * @private
     */
    private _easeScroll;
    frame: number;
    /**
     * Start a smooth scroll.
     */
    startScroll(): void;
    /**
     * Calculate the camera position based on followed objects.
     */
    calculatePosition(): void;
    /**
     * Prepare the context for drawing (apply camera transform).
     * @param {CanvasRenderingContext2D} context
     */
    preDraw(context: CanvasRenderingContext2D): void;
    /**
     * Restore the context after drawing.
     * @param {CanvasRenderingContext2D} context
     */
    postDraw(context: CanvasRenderingContext2D): void;
}
import { Vector } from "./vector";
//# sourceMappingURL=camera.d.ts.map