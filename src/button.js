import { GameObject } from "./gameObject";
import { Rectangle } from "./rectangle";
import { TextItem } from "./textItem";

/**
 * Button state constants.
 */
const ButtonState = {
    DEFAULT: 'default',
    HOVER: 'hover',
    ACTIVE: 'active',
};

/**
 * UI Button class.
 */
export class Button extends GameObject {
    /**
     * @param {string} name
     * @param {Object} scene
     * @param {string} text
     * @param {Function} onTap
     */
    constructor(name, scene, text, onTap) {
        super(scene, name, new Rectangle(0, 0, window.gamework.constants.BUTTONS.minWidth, window.gamework.constants.BUTTONS.minHeight));
        this.text = new TextItem(scene, name, {x: this.rectangle.x, y: this.rectangle.y}, window.gamework.constants.BUTTONS.fontSize, window.gamework.constants.BUTTONS.fontType, window.gamework.constants.BUTTONS.textColour, text);
        this.buttonFontSize = parseFloat(window.gamework.constants.BUTTONS.fontSize);
        this.onTapButton = onTap;
        this.strokeStyle = window.gamework.constants.BUTTONS.borderColour;
        this.fillStyle = window.gamework.constants.BUTTONS.backgroundColour;
        this.state = ButtonState.DEFAULT;
        this.active = false;
        this._addKeyboardSupport();
    }

    /**
     * Set the position of the button.
     * @param {Object} position
     */
    setPosition(position) {
        this.rectangle.x = position.x;
        this.rectangle.y =  position.y;
        this.text.setPosition({x: position.x + window.gamework.constants.BUTTONS.padding, y: position.y + this.buttonFontSize + window.gamework.constants.BUTTONS.padding});
    }

    /**
     * Set the width of the button.
     * @param {number} width
     */
    setWidth(width) {
        this.rectangle.width = width;
    }

    /** Remove the button and reset cursor. */
    remove() {
        document.body.style.cursor = 'default';
        super.remove();
    }

    /**
     * Handle pointer down event.
     * @param {Object} position
     */
    handlePointerDown(position) {
        if(this.deleted) return;
        this.state = ButtonState.ACTIVE;
        this.strokeStyle = window.gamework.constants.BUTTONS.activeBorderColour;
        this.fillStyle = window.gamework.constants.BUTTONS.activeBackgroundColour;
    }

    /**
     * Handle pointer end event.
     * @param {Object} movement
     */
    handlePointerEnd(movement) {
        if(this.deleted) return;
        if(this.state !== ButtonState.ACTIVE) return;
        this.state = ButtonState.DEFAULT;
        this.onTapButton();
    }

    /**
     * Handle pointer hover event.
     */
    handlePointerHover() {
        if(this.deleted) {
            document.body.style.cursor = 'default';
            return;
        }
        this.state = ButtonState.HOVER;
        this.strokeStyle = window.gamework.constants.BUTTONS.hoverBorderColour;
        this.fillStyle = window.gamework.constants.BUTTONS.hoverBackgroundColour;
        document.body.style.cursor = 'pointer';
    }

    /**
     * Handle pointer hover leave event.
     */
    handlePointerHoverLeave() {
        if(this.deleted) {
            document.body.style.cursor = 'default';
            return;
        }
        this.state = ButtonState.DEFAULT;
        document.body.style.cursor = 'default';
        this.strokeStyle = window.gamework.constants.BUTTONS.borderColour;
        this.fillStyle = window.gamework.constants.BUTTONS.backgroundColour;
    }

    /**
     * Draw the button.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        context.beginPath();
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
        context.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        context.fill(); 
        this.text.draw(context);
    }

    /**
     * Add keyboard accessibility (space/enter triggers button).
     * @private
     */
    _addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if(this.deleted) return;
            if(document.activeElement !== this.canvas && document.activeElement !== document.body) return;
            if(e.key === ' ' || e.key === 'Enter') {
                this.handlePointerDown();
                setTimeout(() => this.handlePointerEnd(), 100);
            }
        });
    }
}