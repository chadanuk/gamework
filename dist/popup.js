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
exports.__esModule = true;
exports.Popup = void 0;
var gameObject_1 = require("./gameObject");
var rectangle_1 = require("./rectangle");
var textItem_1 = require("./textItem");
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup(name, scene, canvas, title, rectangle) {
        if (title === void 0) { title = ''; }
        if (rectangle === void 0) { rectangle = null; }
        var _this = _super.call(this, scene, name, rectangle !== null && rectangle !== void 0 ? rectangle : new rectangle_1.Rectangle((canvas.width - (0.8 * canvas.width)) / 8, 50, 0.4 * canvas.width, 0.2 * canvas.height)) || this;
        _this.canvas = canvas;
        _this.title = new textItem_1.TextItem(scene, "".concat(name, ".title"), { x: _this.rectangle.x + 40, y: _this.rectangle.y + window.gamework.constants.POPUP.padding }, window.gamework.constants.POPUP.fontSize, window.gamework.constants.POPUP.fontType, window.gamework.constants.POPUP.textColour, title);
        _this.buttons = [];
        _this.verticalButtonSpacing = window.gamework.constants.BUTTONS.spacing;
        return _this;
    }
    Popup.prototype.setTitle = function (title) {
        this.title.text = title;
        return this;
    };
    Popup.prototype.clearButtons = function () {
        this.buttons.forEach(function (button) {
            button.remove();
            button = null;
        });
        this.buttons = [];
    };
    Popup.prototype.remove = function () {
        this.deleted = true;
        this.buttons = [];
    };
    Popup.prototype.lastButton = function () {
        return this.buttons[this.buttons.length - 1];
    };
    Popup.prototype.addButton = function (button) {
        var lastButton = this.lastButton();
        var lastY = lastButton === undefined ? this.title.rectangle.y : lastButton.rectangle.y;
        if (button === undefined) {
            return;
        }
        button.setPosition({
            x: this.rectangle.x + 40,
            y: lastY + this.verticalButtonSpacing
        });
        button.setWidth(Math.min(this.rectangle.width - (40 * 2), button.rectangle.width));
        this.buttons.push(button);
        return this;
    };
    Popup.prototype.draw = function (context) {
        context.beginPath();
        context.fillStyle = 'rgba(0,0,0,0.5)';
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        context.strokeStyle = window.gamework.constants.COLOURS.modalBorderColour;
        context.fillStyle = window.gamework.constants.COLOURS.modalBackgroundColour;
        context.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        context.fill();
        context.strokeRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        context.closePath();
        this.title.draw(context);
    };
    return Popup;
}(gameObject_1.GameObject));
exports.Popup = Popup;
