import { Vector } from "./vector";

export class Camera {
    constructor(name, viewPort, scene = null) {
        this.id = `Camera-${new Date().getTime()}`;
        this.name = name;
        this.viewPort = viewPort;
        this.following = [];
        this.currentPosition = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.scene = scene;
        this.padding = 100;
        this.panSpeed = 2;
        scene.setCamera(this);
    }

    setPanSpeed(speed) {
        this.panSpeed = speed;

        return this;
    }

    calculateVelocity() {
        if(this.following.length !== 1) {
            // Handle focusing on many objects
            return;
        }
        const object = this.following[0];
        if(this.viewPort.x - this.padding < object.shape.x) {
            this.velocity.x = - this.panSpeed;
        }
        if(this.viewPort.x + this.viewPort.width - this.padding > object.shape.x + object.shape.width) {
            this.velocity.x= this.panSpeed;
        }
        if(this.viewPort.y - this.padding < object.shape.y) {
            this.velocity.y = - this.panSpeed;
        }
        if(this.viewPort.y + this.viewPort.height - this.padding > object.shape.y + object.shape.height) {
            this.velocity.y = this.panSpeed;
        }
    }

    followObject(object, padding = 100) {
        this.padding = padding;
        this.following = [object];

        this.calculateVelocity();
    }

    followObjects(objects, padding = 50) {
        this.padding = padding;
        this.following = objects;
    }
    
    calculatePosition() {
        this.currentPosition.add(this.velocity);
    }
    
    updateViewPortPosition(position) {
        this.viewPort.x = position.x;
        this.viewPort.y = position.y;
    }

    update(context) {
        this.calculatePosition();
        context.translate(this.viewPort.x - this.currentPosition.x, this.currentPosition.y - this.viewPort.y);
        this.updateViewPortPosition(this.currentPosition)
    }
}