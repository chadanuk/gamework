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
exports.Button = void 0;
var gameObject_1 = require("./gameObject");
var rectangle_1 = require("./rectangle");
var textItem_1 = require("./textItem");
/**
 * Button state constants.
 */
var ButtonState = {
    DEFAULT: 'default',
    HOVER: 'hover',
    ACTIVE: 'active',
};
/**
 * UI Button class.
 */
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    /**
     * @param {string} name
     * @param {Object} scene
     * @param {string} text
     * @param {Function} onTap
     */
    function Button(name, scene, text, onTap) {
        var _this = _super.call(this, scene, name, new rectangle_1.Rectangle(0, 0, window.gamework.constants.BUTTONS.minWidth, window.gamework.constants.BUTTONS.minHeight)) || this;
        _this.text = new textItem_1.TextItem(scene, name, { x: _this.rectangle.x, y: _this.rectangle.y }, window.gamework.constants.BUTTONS.fontSize, window.gamework.constants.BUTTONS.fontType, window.gamework.constants.BUTTONS.textColour, text);
        _this.buttonFontSize = parseFloat(window.gamework.constants.BUTTONS.fontSize);
        _this.onTapButton = onTap;
        _this.strokeStyle = window.gamework.constants.BUTTONS.borderColour;
        _this.fillStyle = window.gamework.constants.BUTTONS.backgroundColour;
        _this.state = ButtonState.DEFAULT;
        _this.active = false;
        _this._addKeyboardSupport();
        return _this;
    }
    /**
     * Set the position of the button.
     * @param {Object} position
     */
    Button.prototype.setPosition = function (position) {
        this.rectangle.x = position.x;
        this.rectangle.y = position.y;
        this.text.setPosition({ x: position.x + window.gamework.constants.BUTTONS.padding, y: position.y + this.buttonFontSize + window.gamework.constants.BUTTONS.padding });
    };
    /**
     * Set the width of the button.
     * @param {number} width
     */
    Button.prototype.setWidth = function (width) {
        this.rectangle.width = width;
    };
    /** Remove the button and reset cursor. */
    Button.prototype.remove = function () {
        document.body.style.cursor = 'default';
        _super.prototype.remove.call(this);
    };
    /**
     * Handle pointer down event.
     * @param {Object} position
     */
    Button.prototype.handlePointerDown = function (position) {
        if (this.deleted)
            return;
        this.state = ButtonState.ACTIVE;
        this.strokeStyle = window.gamework.constants.BUTTONS.activeBorderColour;
        this.fillStyle = window.gamework.constants.BUTTONS.activeBackgroundColour;
    };
    /**
     * Handle pointer end event.
     * @param {Object} movement
     */
    Button.prototype.handlePointerEnd = function (movement) {
        if (this.deleted)
            return;
        if (this.state !== ButtonState.ACTIVE)
            return;
        this.state = ButtonState.DEFAULT;
        this.onTapButton();
    };
    /**
     * Handle pointer hover event.
     */
    Button.prototype.handlePointerHover = function () {
        if (this.deleted) {
            document.body.style.cursor = 'default';
            return;
        }
        this.state = ButtonState.HOVER;
        this.strokeStyle = window.gamework.constants.BUTTONS.hoverBorderColour;
        this.fillStyle = window.gamework.constants.BUTTONS.hoverBackgroundColour;
        document.body.style.cursor = 'pointer';
    };
    /**
     * Handle pointer hover leave event.
     */
    Button.prototype.handlePointerHoverLeave = function () {
        if (this.deleted) {
            document.body.style.cursor = 'default';
            return;
        }
        this.state = ButtonState.DEFAULT;
        document.body.style.cursor = 'default';
        this.strokeStyle = window.gamework.constants.BUTTONS.borderColour;
        this.fillStyle = window.gamework.constants.BUTTONS.backgroundColour;
    };
    /**
     * Draw the button.
     * @param {CanvasRenderingContext2D} context
     */
    Button.prototype.draw = function (context) {
        context.beginPath();
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
        context.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        context.fill();
        this.text.draw(context);
    };
    /**
     * Add keyboard accessibility (space/enter triggers button).
     * @private
     */
    Button.prototype._addKeyboardSupport = function () {
        var _this = this;
        document.addEventListener('keydown', function (e) {
            if (_this.deleted)
                return;
            if (document.activeElement !== _this.canvas && document.activeElement !== document.body)
                return;
            if (e.key === ' ' || e.key === 'Enter') {
                _this.handlePointerDown();
                setTimeout(function () { return _this.handlePointerEnd(); }, 100);
            }
        });
    };
    return Button;
}(gameObject_1.GameObject));
exports.Button = Button;
