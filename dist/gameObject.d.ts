/**
 * Base class for all interactive/movable objects in the game.
 */
export class GameObject {
    /**
     * @param {Object} scene - The scene this object belongs to.
     * @param {string} name - The name of the object.
     * @param {Object} rectangle - The rectangle/shape of the object.
     * @param {Object} options - Additional options for the object.
     */
    constructor(scene: any, name: string, rectangle: any, options?: any);
    id: number;
    name: string;
    scene: any;
    rectangle: any;
    shape: any;
    screenDrawObject: any;
    velocity: Vector;
    acceleration: Vector;
    userControlledSpeed: number;
    currentAngle: number;
    rotation: number;
    friction: number;
    maxSpeed: number;
    ignoreCollisions: boolean;
    paused: boolean;
    deleted: boolean;
    shouldConstrainToCanvasBounds: boolean;
    fillColour: any;
    outlineColour: string;
    onPositionChange: () => void;
    onCollision: () => void;
    controlledByKeyPad: boolean;
    accelerateInDirectionOfTravelOnly: boolean;
    drawTrace: boolean;
    showHitBox: boolean;
    sprite: any;
    asset: any;
    currentCollisions: any[];
    keysDown: Set<any>;
    sounds: any[];
    trace: any[];
    /** Pause this object. */
    pause(): void;
    /**
     * Add a sound to this object.
     * @param {Object} sound
     * @returns {GameObject}
     */
    addSound(sound: any): GameObject;
    /**
     * Show or hide the hitbox.
     * @param {boolean} showHitBox
     * @returns {GameObject}
     */
    setShowHitBox(showHitBox: boolean): GameObject;
    /**
     * Set the asset for this object.
     * @param {Object} asset
     * @returns {GameObject}
     */
    setAsset(asset: any): GameObject;
    /**
     * Set the scene for this object.
     * @param {Object} scene
     * @returns {GameObject}
     */
    setScene(scene: any): GameObject;
    /**
     * Set whether to accelerate only in direction of travel.
     * @param {boolean} followVelocity
     * @returns {GameObject}
     */
    setAccelerateIndirectionOfTravelOnly(followVelocity: boolean): GameObject;
    /**
     * Set whether to ignore collisions.
     * @param {boolean} ignoreCollisions
     * @returns {GameObject}
     */
    setIgnoreCollisions(ignoreCollisions: boolean): GameObject;
    /**
     * Set the maximum speed.
     * @param {number} maxSpeed
     * @returns {GameObject}
     */
    setMaxSpeed(maxSpeed: number): GameObject;
    /**
     * Set the velocity.
     * @param {Vector} velocity
     * @returns {GameObject}
     */
    setVelocity(velocity: Vector): GameObject;
    /**
     * Set the acceleration.
     * @param {Vector} acceleration
     * @returns {GameObject}
     */
    setAcceleration(acceleration: Vector): GameObject;
    /**
     * Set the friction.
     * @param {number} friction
     * @returns {GameObject}
     */
    setFriction(friction: number): GameObject;
    /**
     * Get the friction value.
     * @returns {number}
     */
    getFriction(): number;
    /**
     * Update the velocity based on acceleration and optional override.
     * @param {Object} velocity
     */
    updateVelocity(velocity?: any): void;
    /** Mark this object as deleted. */
    remove(): void;
    /**
     * Set the position of this object.
     * @param {Object} position
     * @returns {GameObject}
     */
    setPosition(position: any): GameObject;
    /**
     * Update position based on keysDown.
     */
    updatePositionBasedOnKeys(): void;
    /**
     * Get the position of this object.
     * @returns {Object}
     */
    getPosition(): any;
    constrainObjectToCanvasBounds(): void;
    calculatePosition(): void;
    handleKeysDown(keysDown: any): void;
    handleKeyUp(keysDown: any, keyUp: any): void;
    handlePointerDown(position: any): void;
    handlePointerHover(): void;
    handlePointerHoverLeave(): void;
    handlePointerMovement(movement: any): void;
    handlePointerEnd(movement: any): void;
    stop(): void;
    findSound(name: any): any;
    playSound(name: any): void;
    stopSound(name?: any): void;
    drawHitBox(context: any): void;
    drawTraceLine(context: any): void;
    drawRotated(context: any): void;
    setScreenDrawObject(shape: any): GameObject;
    getDrawObjectPosition(): {
        x: any;
        y: any;
    };
    draw(context: any): void;
    hasNoVelocity(): boolean;
    getCollisionByType(collisionType: any): any;
    detectCollisions(object: any): void;
    collisionExists(collisionType: any): boolean;
    getCollisionsFriction(types?: any[]): number;
    handleRotationInCollision(collisionSide: any, friction: any): void;
    correctAccelerationAfterRotation(): void;
    handleCollisions(): void;
}
import { Vector } from "./vector";
//# sourceMappingURL=gameObject.d.ts.map