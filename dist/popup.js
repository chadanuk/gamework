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
exports.Popup = void 0;
var gameObject_1 = require("./gameObject");
var rectangle_1 = require("./rectangle");
var textItem_1 = require("./textItem");
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup(name, scene, canvas, title, rectangle) {
        var _this = this;
        if (title === void 0) { title = ''; }
        if (rectangle === void 0) { rectangle = null; }
        var _a, _b, _c;
        console.log(canvas.width);
        var popupWidth = 0.5 * canvas.width;
        var popupHeight = 0.5 * canvas.height;
        _this = _super.call(this, scene, name, rectangle !== null && rectangle !== void 0 ? rectangle : new rectangle_1.Rectangle((canvas.width - popupWidth) / 8, (canvas.height - popupHeight) / 8, popupWidth, popupHeight)) || this;
        _this.canvas = canvas;
        _this.title = new textItem_1.TextItem(scene, "".concat(name, ".title"), { x: _this.rectangle.x + 40, y: _this.rectangle.y + window.gamework.constants.POPUP.padding }, window.gamework.constants.POPUP.fontSize, window.gamework.constants.POPUP.fontType, window.gamework.constants.POPUP.textColour, title);
        _this.buttons = [];
        _this.verticalButtonSpacing = window.gamework.constants.BUTTONS.spacing;
        _this.colours = {};
        _this.colours.overlayColour = (_a = window.gamework.constants.COLOURS.modalOverlayColour) !== null && _a !== void 0 ? _a : 'rgba(0,0,0,0.5)';
        _this.colours.borderColour = (_b = window.gamework.constants.COLOURS.modalBorderColour) !== null && _b !== void 0 ? _b : '#000000';
        _this.colours.backgroundColour = (_c = window.gamework.constants.COLOURS.modalBackgroundColour) !== null && _c !== void 0 ? _c : 'rgba(150, 150,255, 0.5)';
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
            y: lastY + this.verticalButtonSpacing,
        });
        button.setWidth(Math.min(this.rectangle.width - (40 * 2), button.rectangle.width));
        this.buttons.push(button);
        return this;
    };
    Popup.prototype.draw = function (context) {
        context.beginPath();
        context.fillStyle = this.colours.overlayColour;
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        context.strokeStyle = this.colours.borderColour;
        context.fillStyle = this.colours.backgroundColour;
        context.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        context.fill();
        context.strokeRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        context.closePath();
        this.title.draw(context);
    };
    return Popup;
}(gameObject_1.GameObject));
exports.Popup = Popup;
