/**
 * Collision class for representing collisions between objects.
 */
export class Collision {
    /**
     * @param {string} type
     * @param {Object} object1
     * @param {Object} object2
     */
    constructor(type: string, object1: any, object2: any);
    type: string;
    object1: any;
    object2: any;
    /**
     * Get the combined friction of the two objects (capped at 1).
     * @returns {number}
     */
    getFriction(): number;
}
//# sourceMappingURL=collision.d.ts.map