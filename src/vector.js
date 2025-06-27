/**
 * Vector class for 2D vector math operations.
 */
export class Vector {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns the difference between this vector and another.
     * @param {Vector} vector
     * @returns {Vector}
     */
    diff(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
    
    /**
     * Returns the distance from this vector to another.
     * @param {Vector} vector
     * @returns {number}
     */
    distanceFrom(vector) {
        const distance = this.diff(vector);
        
        return Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
    }

    /**
     * Returns the angle to another vector in degrees.
     * @param {Vector} vector
     * @returns {number}
     */
    angleToVector(vector) {
        return Math.atan2(vector.x - this.x, vector.y - this.y) * 180 / Math.PI
    }

    /**
     * Subtracts another vector or scalar from this vector.
     * @param {Vector|number} vector
     * @returns {Vector}
     */
    subtract(vector) {
        if (typeof vector === 'number') {
            this.x -= vector;
            this.y -= vector;
            
            return this;
        }
        this.x -= vector.x;
        this.y -= vector.y;

        return this;
    }

    /**
     * Adds another vector or scalar to this vector.
     * @param {Vector|number} vector
     * @returns {Vector}
     */
    add(vector) {
        if (typeof vector === 'number') {
            this.x += vector;
            this.y += vector;
            
            return this;
        }

        this.x += vector.x;
        this.y += vector.y;

        return this;
    }

    /**
     * Multiplies this vector by another vector or scalar.
     * @param {Vector|number} vector
     * @returns {Vector}
     */
    multiply(vector) {
        if (typeof vector === 'number') {
            this.x *= vector;
            this.y *= vector;
            
            return this;
        }

        this.x *= vector.x;
        this.y *= vector.y;
        
        return this;
    }

    /**
     * Divides this vector by another vector or scalar.
     * @param {Vector|number} vector
     * @returns {Vector}
     */
    divide(vector) {
        if (typeof vector === 'number') {
            this.x /= vector;
            this.y /= vector;
            
            return this;
        }

        this.x /= vector.x;
        this.y /= vector.y;
        
        return this;
    }
}
