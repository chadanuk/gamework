import { Vector } from "./vector";

export class Camera {
    constructor(name, viewPort, scene) {
        this.id = `Camera-${new Date().getTime()}`;
        this.name = name;
        
        this.viewPort = viewPort;
        this.following = [];
        this.scrollPosition = new Vector(this.viewPort.x, this.viewPort.y);
        this.currentScrollPosition = new Vector(this.viewPort.x, this.viewPort.y);
        this.scene = scene;
        this.padding = 100;
        this.zoom = 1;
        this.scrolling = false;
        this.effectDuration = 150; 
        this.positionChangeRequired = new Vector(0,0);
        this.scene.setCamera(this);
        this.updateViewPortbasedOnCavasSize();
    }
    
    updateViewPortbasedOnCavasSize() {
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

    easeLinear(time, currentScrollPosition, endValue, duration) {
        return Math.min(endValue, endValue * time / duration + currentScrollPosition);
    }

    easeScroll() {
        this.frame += 1;
        if(this.frame >= this.effectDuration) {
            this.frame = 0;
            
            this.scrolling = false;
            return;
        }
        
        this.currentScrollPosition.x = this.easeLinear(this.frame, this.currentScrollPosition.x, this.positionChangeRequired.x, this.effectDuration);
        this.currentScrollPosition.y = this.easeLinear(this.frame, this.currentScrollPosition.y, this.positionChangeRequired.y, this.effectDuration);
    }

    calculatePosition() {
        if(this.following.length !== 1) {
            // Handle focusing on many objects
            return;
        }

        if(this.scrolling) {
            this.easeScroll();
            return;
        }

        const object = this.following[0];
        
        const viewPortCentre = new Vector((this.viewPort.x + this.viewPort.width) / 2, (this.viewPort.y + this.viewPort.height) / 2 );
        const objectCentre = new Vector((object.screenDrawObject.x + object.screenDrawObject.width) / 2, (object.screenDrawObject.y + object.screenDrawObject.height) / 2 );
        
        const dx = objectCentre.x - viewPortCentre.x;
        const dy = objectCentre.y - viewPortCentre.y;

        if(Math.abs(dx) > this.padding && dx < 0) {
            this.scrollPosition.x = -dx / 2;
        }
        if(Math.abs(dx) > this.padding && dx > 0) {
            this.scrollPosition.x = dx / 2;
        }
        if(Math.abs(dy) > this.padding && dy < 0) {
            this.scrollPosition.y = -dy / 2;
        }
        if(Math.abs(dy) > this.padding && dy > 0) {
            this.scrollPosition.y = dy / 2;
        }

        if(Math.abs(dx) > this.padding || Math.abs(dy) > this.padding) {
            this.startScroll();
        }
    }

    startScroll() {
        if(this.scrolling) {
            return;
        }
        this.positionChangeRequired = new Vector(0,0);
        this.scrolling = true;
        this.frame = 0;
        
        this.positionChangeRequired = this.scrollPosition.diff(this.currentScrollPosition);
    }
    
    updateViewPortPosition(position) {
        this.viewPort.x = position.x;
        this.viewPort.y = position.y;
    }
    
    update(context) {
        //  Save context pre-clip
        context.save();
        context.beginPath();
        context.rect(this.viewPort.x, this.viewPort.y, this.viewPort.width, this.viewPort.height);
        context.clip();
    }

    transformObject(object) {
        this.calculatePosition();
        
        if(object.circle !== undefined) {
            return object.setScreenDrawObject({x: object.shape.x - this.currentScrollPosition.x, y: object.shape.y  - this.currentScrollPosition.y, radius: object.circle.radius, height: object.shape.height});
        }
        
        return object.setScreenDrawObject({x: object.shape.x - this.currentScrollPosition.x, y: object.shape.y - this.currentScrollPosition.y, width: object.shape.width, height: object.shape.height});
    }
}