import { GameObject } from "./gameObject";
import { Rectangle } from "./rectangle";

export class TextItem extends GameObject {
    constructor(scene, name, position, fontSize = '12px', fontType = 'serif', colour = '#000000', text = '') {
        super(scene, name, new Rectangle(position.x, position.y, 0, 16))
        this.id = Math.floor(new Date().getTime() * Math.random());

        this.position = position;
        this.fontSize = fontSize;
        this.fontType = fontType;
        this.colour = colour;
        this.text = text;
    }

    setText(text) {
        this.text = text;

        return this;
    }
    
    draw(context) {
        if(this.deleted) {
            return;
        }
        
        if(this.text.length === 0) {
            return;
        }
        
        context.beginPath();
        context.fillStyle = this.colour;
        context.font = `${this.fontSize} ${this.fontType}`;
        
        const textDetails = context.measureText(this.text); 
        this.rectangle.width = textDetails.width;

        context.fillText(this.text, this.rectangle.x, this.rectangle.y);
        context.fill();
    }
}