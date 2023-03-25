import { BUTTONS } from "../constants";
import { GameObject } from "./gameObject";
import { Rectangle } from "./rectangle";
import { TextItem } from "./textItem";

export class Button extends GameObject {
    constructor(name, scene, text, onTap) {
        super(scene, name, new Rectangle(0, 0, BUTTONS.minWidth, BUTTONS.minHeight));

        this.text = new TextItem(scene, name, {x: this.rectangle.x, y: this.rectangle.y}, BUTTONS.fontSize, BUTTONS.fontType, BUTTONS.textColour, text);
        this.buttonFontSize = parseFloat(BUTTONS.fontSize);
        this.onTapButton = onTap;

        this.strokeStyle = BUTTONS.borderColour;
        this.fillStyle = BUTTONS.backgroundColour;
        this.active = false;
    }

    setPosition(position) {
        this.rectangle.x = position.x;
        this.rectangle.y =  position.y;

        this.text.setPosition({x: position.x + BUTTONS.padding, y: position.y + this.buttonFontSize + BUTTONS.padding});
    }

    setWidth(width) {
        this.rectangle.width = width;
    }

    remove() {
        document.body.style.cursor = 'default';
        super.remove();
    }
    
    handlePointerStart(position) {
        if(this.deleted) {
            return;
        }
        this.strokeStyle = BUTTONS.activeBorderColour;
        this.fillStyle = BUTTONS.activeBackgroundColour;
    }
    
    handlePointerHoverLeave(position) {
        if(this.deleted) {
            document.body.style.cursor = 'default';
            return;
        }
        document.body.style.cursor = 'default';
        this.strokeStyle = BUTTONS.borderColour;
        this.fillStyle = BUTTONS.backgroundColour;
    }

    handlePointerHover() {
        if(this.deleted) {
            document.body.style.cursor = 'default';
            return;
        }
        this.strokeStyle = BUTTONS.hoverBorderColour;
        this.fillStyle = BUTTONS.hoverBackgroundColour;
        document.body.style.cursor = 'pointer';
    }

    handlePointerDown(position) {
        if(this.deleted) {
            return;
        }
        this.active = true;
        this.strokeStyle = BUTTONS.activeBorderColour;
        this.fillStyle = BUTTONS.activeBackgroundColour;
    }

    handlePointerEnd(movement) {
        if(this.deleted) {
            return;
        }
        if(!this.active) {
            return;
        }
        this.active = false;
        this.onTapButton();
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.strokeStyle;
        context.fillStyle = this.fillStyle;
        context.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        context.fill(); 
        this.text.draw(context);
        // context.strokeRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);

    }
}