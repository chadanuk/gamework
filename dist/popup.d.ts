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
    constructor(name: string, scene: any, canvas: HTMLCanvasElement, title?: string, rectangle?: any | null);
    canvas: HTMLCanvasElement;
    title: TextItem;
    buttons: any[];
    verticalButtonSpacing: any;
    colours: {};
    /**
     * Set the popup title.
     * @param {string} title
     * @returns {Popup}
     */
    setTitle(title: string): Popup;
    /**
     * Remove all buttons from the popup.
     */
    clearButtons(): void;
    /**
     * Get the last button added to the popup.
     * @returns {Object|undefined}
     */
    lastButton(): any | undefined;
    /**
     * Add a button to the popup.
     * @param {Object} button
     * @returns {Popup}
     */
    addButton(button: any): Popup;
    /**
     * Draw the popup and its title.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context: CanvasRenderingContext2D): void;
}
import { GameObject } from "./gameObject";
import { TextItem } from "./textItem";
//# sourceMappingURL=popup.d.ts.map