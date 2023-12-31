export class Popup extends GameObject {
    constructor(name: any, scene: any, canvas: any, title?: string, rectangle?: any);
    canvas: any;
    title: TextItem;
    buttons: any[];
    verticalButtonSpacing: any;
    setTitle(title: any): this;
    clearButtons(): void;
    lastButton(): any;
    addButton(button: any): this;
}
import { GameObject } from "./gameObject";
import { TextItem } from "./textItem";
//# sourceMappingURL=popup.d.ts.map