export class Collisions {
    /**
     * Get the four corners of the rectangle after rotation.
     * @param {Object} obj - Must have rectangle and currentAngle
     * @returns {Array<{x: number, y: number}>}
     */
    static getRotatedCorners(obj: any): {
        x: number;
        y: number;
    }[];
    /**
     * Check for collision between two convex polygons using SAT.
     * @param {Array<{x: number, y: number}>} poly1
     * @param {Array<{x: number, y: number}>} poly2
     * @returns {boolean}
     */
    static polygonsCollideSAT(poly1: Array<{
        x: number;
        y: number;
    }>, poly2: Array<{
        x: number;
        y: number;
    }>): boolean;
    /**
     * Detect collisions between two objects, returning an array of Collision objects.
     * @param {Object} obj1
     * @param {Object} obj2
     * @returns {Collision[]}
     */
    static detect(obj1: any, obj2: any): Collision[];
}
import { Collision } from './collision';
//# sourceMappingURL=collisions.d.ts.map