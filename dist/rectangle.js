"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
/**
 * Rectangle class for representing rectangles.
 */
var Rectangle = /** @class */ (function () {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} [angle=0]
     */
    function Rectangle(x, y, width, height, angle) {
        if (angle === void 0) { angle = 0; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
    }
    return Rectangle;
}());
exports.Rectangle = Rectangle;
