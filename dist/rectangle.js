"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, width, height, angle) {
        if (angle === void 0) { angle = 0; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rectangle;
}());
exports.Rectangle = Rectangle;
