"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquareGameObject = void 0;
var gameObject_1 = require("./gameObject");
/**
 * SquareGameObject class for square-shaped game objects.
 */
var SquareGameObject = /** @class */ (function (_super) {
    __extends(SquareGameObject, _super);
    function SquareGameObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SquareGameObject;
}(gameObject_1.GameObject));
exports.SquareGameObject = SquareGameObject;
