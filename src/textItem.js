import { GameObject } from "./gameObject";
import { Rectangle } from "./rectangle";

/**
 * TextItem class for rendering text in the game.
 */
export class TextItem extends GameObject {
    /**
     * @param {Object} scene
     * @param {string} name
     * @param {Object} position
     * @param {string} [fontSize='12px']
     * @param {string} [fontType='serif']
     * @param {string} [colour='#000000']
     * @param {string} [text='']
     */
    constructor(scene, name, position, fontSize = '12px', fontType = 'serif', colour = '#000000', text = '') {
        super(scene, name, new Rectangle(position.x, position.y, 0, 16))
        this.id = Math.floor(new Date().getTime() * Math.random());
        this.position = position;
        this.fontSize = fontSize;
        this.fontType = fontType;
        this.colour = colour;
        this.text = text;
    }

    /**
     * Set the text content.
     * @param {string} text
     * @returns {TextItem}
     */
    setText(text) {
        this.text = text;
        return this;
    }
    
    /**
     * Draw the text item.
     * @param {CanvasRenderingContext2D} context
     */
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