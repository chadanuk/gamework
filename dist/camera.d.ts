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
    panSpeed: number;
    setPanSpeed(speed: any): Camera;
    calculateVelocity(): void;
    followObject(object: any, padding?: number): void;
    followObjects(objects: any, padding?: number): void;
    calculatePosition(): void;
    updateViewPortPosition(position: any): void;
    update(context: any): void;
}
import { Vector } from "./vector";
//# sourceMappingURL=camera.d.ts.map