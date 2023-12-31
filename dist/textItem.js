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
exports.TextItem = void 0;
var gameObject_1 = require("./gameObject");
var rectangle_1 = require("./rectangle");
var TextItem = /** @class */ (function (_super) {
    __extends(TextItem, _super);
    function TextItem(scene, name, position, fontSize, fontType, colour, text) {
        if (fontSize === void 0) { fontSize = '12px'; }
        if (fontType === void 0) { fontType = 'serif'; }
        if (colour === void 0) { colour = '#000000'; }
        if (text === void 0) { text = ''; }
        var _this = _super.call(this, scene, name, new rectangle_1.Rectangle(position.x, position.y, 0, 16)) || this;
        _this.id = Math.floor(new Date().getTime() * Math.random());
        _this.position = position;
        _this.fontSize = fontSize;
        _this.fontType = fontType;
        _this.colour = colour;
        _this.text = text;
        return _this;
    }
    TextItem.prototype.setText = function (text) {
        this.text = text;
        return this;
    };
    TextItem.prototype.draw = function (context) {
        if (this.deleted) {
            return;
        }
        if (this.text.length === 0) {
            return;
        }
        context.beginPath();
        context.fillStyle = this.colour;
        context.font = "".concat(this.fontSize, " ").concat(this.fontType);
        var textDetails = context.measureText(this.text);
        this.rectangle.width = textDetails.width;
        context.fillText(this.text, this.rectangle.x, this.rectangle.y);
        context.fill();
    };
    return TextItem;
}(gameObject_1.GameObject));
exports.TextItem = TextItem;
