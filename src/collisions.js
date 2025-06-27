import { Collision } from './collision';

export class Collisions {
    /**
     * Get the four corners of the rectangle after rotation.
     * @param {Object} obj - Must have rectangle and currentAngle
     * @returns {Array<{x: number, y: number}>}
     */
    static getRotatedCorners(obj) {
        const { x, y, width, height } = obj.rectangle;
        const angle = (obj.currentAngle || 0) * Math.PI / 180;
        const cx = x + width / 2;
        const cy = y + height / 2;
        const corners = [
            { x: x, y: y },
            { x: x + width, y: y },
            { x: x + width, y: y + height },
            { x: x, y: y + height }
        ];
        if (!angle) return corners;
        return corners.map(pt => {
            const dx = pt.x - cx;
            const dy = pt.y - cy;
            return {
                x: cx + dx * Math.cos(angle) - dy * Math.sin(angle),
                y: cy + dx * Math.sin(angle) + dy * Math.cos(angle)
            };
        });
    }

    /**
     * Check for collision between two convex polygons using SAT.
     * @param {Array<{x: number, y: number}>} poly1
     * @param {Array<{x: number, y: number}>} poly2
     * @returns {boolean}
     */
    static polygonsCollideSAT(poly1, poly2) {
        const polygons = [poly1, poly2];
        for (let i = 0; i < polygons.length; i++) {
            const polygon = polygons[i];
            for (let j = 0; j < polygon.length; j++) {
                const k = (j + 1) % polygon.length;
                const edge = { x: polygon[k].x - polygon[j].x, y: polygon[k].y - polygon[j].y };
                // Perpendicular axis
                const axis = { x: -edge.y, y: edge.x };
                // Project both polygons onto axis
                let [minA, maxA] = [null, null];
                for (const p of poly1) {
                    const proj = p.x * axis.x + p.y * axis.y;
                    if (minA === null || proj < minA) minA = proj;
                    if (maxA === null || proj > maxA) maxA = proj;
                }
                let [minB, maxB] = [null, null];
                for (const p of poly2) {
                    const proj = p.x * axis.x + p.y * axis.y;
                    if (minB === null || proj < minB) minB = proj;
                    if (maxB === null || proj > maxB) maxB = proj;
                }
                // If projections do not overlap, no collision
                if (maxA < minB || maxB < minA) return false;
            }
        }
        return true;
    }

    /**
     * Detect collisions between two objects, returning an array of Collision objects.
     * @param {Object} obj1
     * @param {Object} obj2
     * @returns {Collision[]}
     */
    static detect(obj1, obj2) {
        if (obj2.ignoreCollisions) {
            return [];
        }
        // If either object is rotated, use SAT
        if ((obj1.currentAngle && obj1.currentAngle % 360 !== 0) || (obj2.currentAngle && obj2.currentAngle % 360 !== 0)) {
            const corners1 = Collisions.getRotatedCorners(obj1);
            const corners2 = Collisions.getRotatedCorners(obj2);
            if (Collisions.polygonsCollideSAT(corners1, corners2)) {
                return [new Collision('rotated', obj1, obj2)];
            }
            return [];
        }
        // AABB logic
        const rect1Left = obj1.rectangle.x;
        const rect1Right = obj1.rectangle.x + obj1.rectangle.width;
        const rect1Top = obj1.rectangle.y;
        const rect1Bottom = obj1.rectangle.y + obj1.rectangle.height;

        const rect2Left = obj2.rectangle.x;
        const rect2Right = obj2.rectangle.x + obj2.rectangle.width;
        const rect2Top = obj2.rectangle.y;
        const rect2Bottom = obj2.rectangle.y + obj2.rectangle.height;

        const collisions = [];
        if (rect1Right >= rect2Left && rect1Left <= rect2Right && rect1Bottom >= rect2Top && rect1Top <= rect2Bottom) {
            if (rect1Right >= rect2Left && rect1Left < rect2Left && obj1.velocity.x > 0) {
                collisions.push(new Collision('right', obj1, obj2));
            }
            if (rect1Left <= rect2Right && rect1Right > rect2Right && obj1.velocity.x < 0) {
                collisions.push(new Collision('left', obj1, obj2));
            }
            if (rect1Top <= rect2Bottom && rect1Bottom > rect2Bottom && obj1.velocity.y < 0) {
                collisions.push(new Collision('top', obj1, obj2));
            }
            if (rect1Bottom >= rect2Top && rect1Top < rect2Top && obj1.velocity.y > 0) {
                collisions.push(new Collision('bottom', obj1, obj2));
            }
        }
        return collisions;
    }
} 