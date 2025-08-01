import { GameObject } from "./gameObject";
import { Rectangle } from "./rectangle";
import { TextItem } from "./textItem";

/**
 * Popup class for modal dialogs and overlays.
 */
export class Popup extends GameObject {
    /**
     * @param {string} name
     * @param {Object} scene
     * @param {HTMLCanvasElement} canvas
     * @param {string} [title='']
     * @param {Object|null} [rectangle=null]
     */
    constructor(name, scene, canvas, title = '', rectangle = null) {
        const popupWidth = 0.8 * canvas.width;
        const popupHeight = 0.8 * canvas.height;
        
        super(scene, name, rectangle ?? new Rectangle((canvas.width - popupWidth) / 8, (canvas.height - popupHeight) / 8, popupWidth, popupHeight));
        this.canvas = canvas;
        this.title = new TextItem(scene, `${name}.title`, {x: this.rectangle.x + 40, y: this.rectangle.y + window.gamework.constants.POPUP.padding}, window.gamework.constants.POPUP.fontSize, window.gamework.constants.POPUP.fontType, window.gamework.constants.POPUP.textColour, title);
        this.buttons = [];
        this.verticalButtonSpacing = window.gamework.constants.BUTTONS.spacing;

        this.colours = {};
        this.colours.overlayColour= window.gamework.constants.COLOURS.modalOverlayColour ?? 'rgba(0,0,0,0.5)';
        this.colours.borderColour= window.gamework.constants.COLOURS.modalBorderColour ?? '#000000';
        this.colours.backgroundColour= window.gamework.constants.COLOURS.modalBackgroundColour ?? 'rgba(150, 150,255, 0.5)';
    }

    /**
     * Set the popup title.
     * @param {string} title
     * @returns {Popup}
     */
    setTitle(title) {
        this.title.text = title
        return this;
    }

    /**
     * Remove all buttons from the popup.
     */
    clearButtons() {
        this.buttons.forEach((button) => {
            button.remove();
            button = null;
        })
        this.buttons = [];
    }
    
    /**
     * Remove the popup and its buttons.
     */
    remove() {
        this.deleted = true;
        this.buttons = [];
    }

    /**
     * Get the last button added to the popup.
     * @returns {Object|undefined}
     */
    lastButton() {
        return this.buttons[this.buttons.length - 1];
    }

    /**
     * Add a button to the popup.
     * @param {Object} button
     * @returns {Popup}
     */
    addButton(button) {
        const lastButton = this.lastButton();
        const lastY = lastButton === undefined ? this.title.rectangle.y : lastButton.rectangle.y
        if(button === undefined) {
            return;
        }
        button.setPosition({
            x: this.rectangle.x + 40,
            y:  lastY + this.verticalButtonSpacing,
        });

        button.setWidth(Math.min(this.rectangle.width - (40 * 2), button.rectangle.width))

        this.buttons.push(button);

        return this;
    }

    /**
     * Draw the popup and its title.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {         
        context.beginPath();
        context.fillStyle = this.colours.overlayColour;
        context.fillRect(0,0, this.canvas.width, this.canvas.height);
        context.strokeStyle = this.colours.borderColour;
        context.fillStyle = this.colours.backgroundColour;
        context.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        context.fill();
        context.strokeRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        context.closePath();
        
        this.title.draw(context);
    }
}