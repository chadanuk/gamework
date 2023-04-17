export class CircleGameObject extends GameObject {
    constructor(scene: any, name: any, circle: any, velocity: any, rotation?: number);
    circle: any;
    setPosition(position: any): CircleGameObject;
    detectCollisionsWithOtherCircle(object: any): void;
    detectCollisionsWithRectangle(object: any): void;
}
import { GameObject } from "./gameObject";
//# sourceMappingURL=circleGameObject.d.ts.map