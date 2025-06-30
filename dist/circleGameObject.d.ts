/**
 * CircleGameObject class for circular game objects.
 */
export class CircleGameObject extends GameObject {
    /**
     * @param {Object} scene
     * @param {string} name
     * @param {Object} circle
     * @param {Object} velocity
     * @param {number} [rotation=0]
     */
    constructor(scene: any, name: string, circle: any, velocity: any, rotation?: number);
    circle: any;
    /**
     * Set the position of the circle game object.
     * @param {Object} position
     * @returns {CircleGameObject}
     */
    setPosition(position: any): CircleGameObject;
    /**
     * Detect collisions with another circle game object.
     * @param {Object} object
     */
    detectCollisionsWithOtherCircle(object: any): void;
    /**
     * Detect collisions with a rectangle game object.
     * @param {Object} object
     */
    detectCollisionsWithRectangle(object: any): void;
    /**
     * Detect collisions with another object.
     * @param {Object} object
     */
    detectCollisions(object: any): void;
    /**
     * Draw the hitbox for the circle game object.
     * @param {CanvasRenderingContext2D} context
     */
    drawHitBox(context: CanvasRenderingContext2D): void;
}
import { GameObject } from "./gameObject";
//# sourceMappingURL=circleGameObject.d.ts.map