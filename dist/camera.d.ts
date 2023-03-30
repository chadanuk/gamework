export class Camera {
    constructor(name: any, viewPort: any, scene?: any);
    id: string;
    name: any;
    viewPort: any;
    following: any[];
    currentPosition: Vector;
    velocity: Vector;
    scene: any;
    padding: number;
    friction: number;
    panSpeed: number;
    zoom: number;
    setPadding(padding: any): Camera;
    setPanSpeed(speed: any): Camera;
    calculateVelocity(): void;
    followObject(object: any, padding?: number): void;
    followObjects(objects: any, padding?: number): void;
    calculatePosition(): void;
    updateViewPortPosition(position: any): void;
    transformObject(object: any): any;
}
import { Vector } from "./vector";
//# sourceMappingURL=camera.d.ts.map