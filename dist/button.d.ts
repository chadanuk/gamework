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
    constructor(name: string, scene: any, text: string, onTap: Function);
    text: TextItem;
    buttonFontSize: number;
    onTapButton: Function;
    strokeStyle: any;
    fillStyle: any;
    state: string;
    active: boolean;
    /**
     * Set the position of the button.
     * @param {Object} position
     */
    setPosition(position: any): void;
    /**
     * Set the width of the button.
     * @param {number} width
     */
    setWidth(width: number): void;
    /**
     * Handle pointer down event.
     * @param {Object} position
     */
    handlePointerDown(position: any): void;
    /**
     * Handle pointer end event.
     * @param {Object} movement
     */
    handlePointerEnd(movement: any): void;
    /**
     * Draw the button.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context: CanvasRenderingContext2D): void;
    /**
     * Add keyboard accessibility (space/enter triggers button).
     * @private
     */
    private _addKeyboardSupport;
}
import { GameObject } from "./gameObject";
import { TextItem } from "./textItem";
//# sourceMappingURL=button.d.ts.map