"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collisions = void 0;
var collision_1 = require("./collision");
var Collisions = /** @class */ (function () {
    function Collisions() {
    }
    /**
     * Get the four corners of the rectangle after rotation.
     * @param {Object} obj - Must have rectangle and currentAngle
     * @returns {Array<{x: number, y: number}>}
     */
    Collisions.getRotatedCorners = function (obj) {
        var _a = obj.rectangle, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var angle = (obj.currentAngle || 0) * Math.PI / 180;
        var cx = x + width / 2;
        var cy = y + height / 2;
        var corners = [
            { x: x, y: y },
            { x: x + width, y: y },
            { x: x + width, y: y + height },
            { x: x, y: y + height }
        ];
        if (!angle)
            return corners;
        return corners.map(function (pt) {
            var dx = pt.x - cx;
            var dy = pt.y - cy;
            return {
                x: cx + dx * Math.cos(angle) - dy * Math.sin(angle),
                y: cy + dx * Math.sin(angle) + dy * Math.cos(angle)
            };
        });
    };
    /**
     * Check for collision between two convex polygons using SAT.
     * @param {Array<{x: number, y: number}>} poly1
     * @param {Array<{x: number, y: number}>} poly2
     * @returns {boolean}
     */
    Collisions.polygonsCollideSAT = function (poly1, poly2) {
        var polygons = [poly1, poly2];
        for (var i = 0; i < polygons.length; i++) {
            var polygon = polygons[i];
            for (var j = 0; j < polygon.length; j++) {
                var k = (j + 1) % polygon.length;
                var edge = { x: polygon[k].x - polygon[j].x, y: polygon[k].y - polygon[j].y };
                // Perpendicular axis
                var axis = { x: -edge.y, y: edge.x };
                // Project both polygons onto axis
                var _a = [null, null], minA = _a[0], maxA = _a[1];
                for (var _i = 0, poly1_1 = poly1; _i < poly1_1.length; _i++) {
                    var p = poly1_1[_i];
                    var proj = p.x * axis.x + p.y * axis.y;
                    if (minA === null || proj < minA)
                        minA = proj;
                    if (maxA === null || proj > maxA)
                        maxA = proj;
                }
                var _b = [null, null], minB = _b[0], maxB = _b[1];
                for (var _c = 0, poly2_1 = poly2; _c < poly2_1.length; _c++) {
                    var p = poly2_1[_c];
                    var proj = p.x * axis.x + p.y * axis.y;
                    if (minB === null || proj < minB)
                        minB = proj;
                    if (maxB === null || proj > maxB)
                        maxB = proj;
                }
                // If projections do not overlap, no collision
                if (maxA < minB || maxB < minA)
                    return false;
            }
        }
        return true;
    };
    /**
     * Detect collisions between two objects, returning an array of Collision objects.
     * @param {Object} obj1
     * @param {Object} obj2
     * @returns {Collision[]}
     */
    Collisions.detect = function (obj1, obj2) {
        if (obj2.ignoreCollisions) {
            return [];
        }
        // If either object is rotated, use SAT
        if ((obj1.currentAngle && obj1.currentAngle % 360 !== 0) || (obj2.currentAngle && obj2.currentAngle % 360 !== 0)) {
            var corners1 = Collisions.getRotatedCorners(obj1);
            var corners2 = Collisions.getRotatedCorners(obj2);
            if (Collisions.polygonsCollideSAT(corners1, corners2)) {
                return [new collision_1.Collision('rotated', obj1, obj2)];
            }
            return [];
        }
        // AABB logic
        var rect1Left = obj1.rectangle.x;
        var rect1Right = obj1.rectangle.x + obj1.rectangle.width;
        var rect1Top = obj1.rectangle.y;
        var rect1Bottom = obj1.rectangle.y + obj1.rectangle.height;
        var rect2Left = obj2.rectangle.x;
        var rect2Right = obj2.rectangle.x + obj2.rectangle.width;
        var rect2Top = obj2.rectangle.y;
        var rect2Bottom = obj2.rectangle.y + obj2.rectangle.height;
        var collisions = [];
        if (rect1Right >= rect2Left && rect1Left <= rect2Right && rect1Bottom >= rect2Top && rect1Top <= rect2Bottom) {
            if (rect1Right >= rect2Left && rect1Left < rect2Left && obj1.velocity.x > 0) {
                collisions.push(new collision_1.Collision('right', obj1, obj2));
            }
            if (rect1Left <= rect2Right && rect1Right > rect2Right && obj1.velocity.x < 0) {
                collisions.push(new collision_1.Collision('left', obj1, obj2));
            }
            if (rect1Top <= rect2Bottom && rect1Bottom > rect2Bottom && obj1.velocity.y < 0) {
                collisions.push(new collision_1.Collision('top', obj1, obj2));
            }
            if (rect1Bottom >= rect2Top && rect1Top < rect2Top && obj1.velocity.y > 0) {
                collisions.push(new collision_1.Collision('bottom', obj1, obj2));
            }
        }
        return collisions;
    };
    return Collisions;
}());
exports.Collisions = Collisions;
