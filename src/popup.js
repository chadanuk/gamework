import { GameObject } from "./gameObject";
import { Rectangle } from "./rectangle";
import { TextItem } from "./textItem";

export class Popup extends GameObject {
    constructor(name, scene, canvas, title = '', rectangle = null) {
        const popupWidth = 0.8 * canvas.width;
        const popupHeight = 0.8 * canvas.height;
        super(scene, name, rectangle ?? new Rectangle((canvas.width - (popupWidth)) / 2, canvas.height - popupHeight, popupWidth, popupHeight));
        this.canvas = canvas;
        this.title = new TextItem(scene, `${name}.title`, {x: this.rectangle.x + 40, y: this.rectangle.y + window.gamework.constants.POPUP.padding}, window.gamework.constants.POPUP.fontSize, window.gamework.constants.POPUP.fontType, window.gamework.constants.POPUP.textColour, title);
        this.buttons = [];
        this.verticalButtonSpacing = window.gamework.constants.BUTTONS.spacing;
    }

    setTitle(title) {
        this.title.text = title
        return this;
    }

    clearButtons() {
        this.buttons.forEach((button) => {
            button.remove();
            button = null;
        })
        this.buttons = [];
    }
    
    remove() {
        this.deleted = true;
        this.buttons = [];
    }

    lastButton() {
        return this.buttons[this.buttons.length - 1];
    }

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

    draw(context) {         
        context.beginPath();
        context.fillStyle = 'rgba(0,0,0,0.5)';
        context.fillRect(0,0, this.canvas.width, this.canvas.height);
        context.strokeStyle = window.gamework.constants.COLOURS.modalBorderColour;
        context.fillStyle = window.gamework.constants.COLOURS.modalBackgroundColour;
        context.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        context.fill();
        context.strokeRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        context.closePath();
        
        this.title.draw(context);
    }
}