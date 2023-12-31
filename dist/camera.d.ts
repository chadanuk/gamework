export class Camera {
    constructor(name: any, viewPort: any, scene: any);
    id: string;
    name: any;
    viewPort: any;
    following: any[];
    scrollPosition: Vector;
    currentScrollPosition: Vector;
    currentScrollPositionChange: Vector;
    scene: any;
    padding: number;
    zoom: number;
    scrolling: boolean;
    effectDuration: number;
    positionChangeRequired: Vector;
    updateViewPortbasedOnCavasSize(): void;
    setPadding(padding: any): this;
    followObject(object: any, padding?: number): void;
    followObjects(objects: any, padding?: number): void;
    easeLinear(time: any, currentValue: any, endValue: any, duration: any): any;
    easeScroll(): void;
    frame: number;
    startScroll(): void;
    calculatePosition(): void;
    preDraw(context: any): void;
    postDraw(context: any): void;
}
import { Vector } from "./vector";
//# sourceMappingURL=camera.d.ts.map