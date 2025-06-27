/**
 * Collision class for representing collisions between objects.
 */
export class Collision {
    /**
     * @param {string} type
     * @param {Object} object1
     * @param {Object} object2
     */
    constructor(type, object1, object2) {
        this.type = type;
        this.object1 = object1;
        this.object2 = object2;
    }

    /**
     * Get the combined friction of the two objects (capped at 1).
     * @returns {number}
     */
    getFriction() {
        let friction = this.object1.getFriction() + this.object2.getFriction();
            
        if(friction > 1) {
            friction = 1;
        }

        return friction;
    }
}