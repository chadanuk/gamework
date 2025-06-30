/**
 * Vector class for 2D vector math operations.
 */
export class Vector {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x: number, y: number);
    x: number;
    y: number;
    /**
     * Returns the difference between this vector and another.
     * @param {Vector} vector
     * @returns {Vector}
     */
    diff(vector: Vector): Vector;
    /**
     * Returns the distance from this vector to another.
     * @param {Vector} vector
     * @returns {number}
     */
    distanceFrom(vector: Vector): number;
    /**
     * Returns the angle to another vector in degrees.
     * @param {Vector} vector
     * @returns {number}
     */
    angleToVector(vector: Vector): number;
    /**
     * Subtracts another vector or scalar from this vector.
     * @param {Vector|number} vector
     * @returns {Vector}
     */
    subtract(vector: Vector | number): Vector;
    /**
     * Adds another vector or scalar to this vector.
     * @param {Vector|number} vector
     * @returns {Vector}
     */
    add(vector: Vector | number): Vector;
    /**
     * Multiplies this vector by another vector or scalar.
     * @param {Vector|number} vector
     * @returns {Vector}
     */
    multiply(vector: Vector | number): Vector;
    /**
     * Divides this vector by another vector or scalar.
     * @param {Vector|number} vector
     * @returns {Vector}
     */
    divide(vector: Vector | number): Vector;
}
//# sourceMappingURL=vector.d.ts.map