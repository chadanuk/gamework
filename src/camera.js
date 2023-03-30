import { Vector } from "./vector";

export class Camera {
    constructor(name, viewPort, scene) {
        this.id = `Camera-${new Date().getTime()}`;
        this.name = name;
        
        this.viewPort = viewPort;
        this.following = [];
        this.scrollPosition = new Vector(this.viewPort.x, this.viewPort.y);
        this.scene = scene;
        this.padding = 100;
        this.zoom = 1;
        this.panStarted = false;
        this.scene.setCamera(this);
        this.updateViewPOrtbasedOnCavasSize();
    }
    
    updateViewPOrtbasedOnCavasSize() {
        if(this.viewPort.width + this.viewPort.x > this.scene.game.canvas.width) {
            this.viewPort.width = this.scene.game.canvas.width - this.viewPort.x
        }
        if(this.viewPort.height + this.viewPort.y > this.scene.game.canvas.height) {
            this.viewPort.height = this.scene.game.canvas.height - this.viewPort.y;
        }
    }

    setPadding(padding) {
        this.padding = padding;

        return this;
    }

    followObject(object, padding = 100) {
        this.padding = padding;
        this.following = [object];
    }

    followObjects(objects, padding = 50) {
        this.padding = padding;
        this.following = objects;
    }
    
    calculatePosition() {
        if(this.following.length !== 1) {
            // Handle focusing on many objects
            return;
        }
        const object = this.following[0];
        if(object.rectangle.x - this.scrollPosition.x < this.padding) {
            this.scrollPosition.x -= this.padding;
        }
        if(this.scrollPosition.x + this.viewPort.width - object.rectangle.x + object.rectangle.width < this.padding) {
            this.scrollPosition.x += this.padding;
        }
        if(object.rectangle.y - this.scrollPosition.y < this.padding) {
            this.scrollPosition.y -= this.padding;
        }
        if(this.scrollPosition.y + this.viewPort.height - object.rectangle.y + object.rectangle.height < this.padding) {
            this.scrollPosition.y += this.padding;
        }
    }
    
    updateViewPortPosition(position) {
        this.viewPort.x = position.x;
        this.viewPort.y = position.y;
    }
    
    update(context) {
        this.calculatePosition();
        //  Save context pre-clip
        context.save();
        context.beginPath();
        context.rect(this.viewPort.x, this.viewPort.y, this.viewPort.width, this.viewPort.height);
        context.clip();
        context.strokeStyle = 'blue';
        context.lineWidth = '4';
        context.strokeRect(this.viewPort.x, this.viewPort.y, this.viewPort.width, this.viewPort.height);
        context.stroke();
    }

    transformObject(object) {
        if(object.circle !== undefined) {
            return object.setPosition({x: object.circle.x - this.scrollPosition.x, y: object.circle.y - this.scrollPosition.y});   
        }
        
        return object.setPosition({x: object.shape.x - this.scrollPosition.x, y: object.shape.y - this.scrollPosition.y});
    }
}