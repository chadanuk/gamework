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
    constructor(scene: any, name: string, position: any, fontSize?: string, fontType?: string, colour?: string, text?: string);
    position: any;
    fontSize: string;
    fontType: string;
    colour: string;
    text: string;
    /**
     * Set the text content.
     * @param {string} text
     * @returns {TextItem}
     */
    setText(text: string): TextItem;
    /**
     * Draw the text item.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context: CanvasRenderingContext2D): void;
}
import { GameObject } from "./gameObject";
//# sourceMappingURL=textItem.d.ts.map