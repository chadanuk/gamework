export class Button extends GameObject {
    constructor(name: any, scene: any, text: any, onTap: any);
    text: TextItem;
    buttonFontSize: number;
    onTapButton: any;
    strokeStyle: any;
    fillStyle: any;
    active: boolean;
    setPosition(position: any): void;
    setWidth(width: any): void;
    handlePointerStart(position: any): void;
    handlePointerHoverLeave(position: any): void;
}
import { GameObject } from "./gameObject";
import { TextItem } from "./textItem";
//# sourceMappingURL=button.d.ts.map