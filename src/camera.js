import { Vector } from "./vector";

/**
 * Camera class for managing viewport and following objects in a scene.
 */
export class Camera {
    /**
     * @param {string} name
     * @param {Object} viewPort
     * @param {Object} scene
     */
    constructor(name, viewPort, scene) {
        this.id = `Camera-${new Date().getTime()}`;
        this.name = name;
        
        this.viewPort = viewPort;
        this.following = [];
        this.scrollPosition = new Vector(this.viewPort.x, this.viewPort.y);
        this.currentScrollPosition = new Vector(this.viewPort.x, this.viewPort.y);
        this.currentScrollPositionChange= new Vector(this.viewPort.x, this.viewPort.y);
        this.scene = scene;
        this.padding = 100;
        this.zoom = 1;
        this.scrolling = false;
        this.effectDuration = 50; 
        this.positionChangeRequired = new Vector(0,0);
        this.scene.setCamera(this);
        this._updateViewPortBasedOnCanvasSize();
    }
    
    /**
     * Update the viewport size based on the canvas size.
     * @private
     */
    _updateViewPortBasedOnCanvasSize() {
        if(this.viewPort.width + this.viewPort.x > this.scene.game.canvas.width) {
            this.viewPort.width = this.scene.game.canvas.width - this.viewPort.x
        }
        if(this.viewPort.height + this.viewPort.y > this.scene.game.canvas.height) {
            this.viewPort.height = this.scene.game.canvas.height - this.viewPort.y;
        }
    }

    /**
     * Set the camera padding.
     * @param {number} padding
     * @returns {Camera}
     */
    setPadding(padding) {
        this.padding = padding;

        return this;
    }

    /**
     * Follow a single object.
     * @param {Object} object
     * @param {number} [padding=100]
     */
    followObject(object, padding = 100) {
        this.padding = padding;
        this.following = [object];
    }

    /**
     * Follow multiple objects.
     * @param {Array} objects
     * @param {number} [padding=50]
     */
    followObjects(objects, padding = 50) {
        this.padding = padding;
        this.following = objects;
    }

    /**
     * Linear easing function.
     * @param {number} time
     * @param {number} currentValue
     * @param {number} endValue
     * @param {number} duration
     * @returns {number}
     */
    _easeLinear(time, currentValue, endValue, duration) {
        let newValue = endValue * time / duration + currentValue;
        newValue = Math.min(endValue, newValue);
        if(newValue < 0) {
            newValue = Math.max(endValue, newValue);
        }
        return newValue;
    }

    /**
     * Ease the camera scroll.
     * @private
     */
    _easeScroll() {
        if(this.positionChangeRequired.x === 0 && this.positionChangeRequired.y === 0) {
            this.scrolling = false;
            this.frame = 0;
            return;
        }

        this.frame += 1;
        if(this.frame >= this.effectDuration) {
            this.frame = 0;
            
            this.scrolling = false;
            return;
        }
        this.currentScrollPosition.x = this._easeLinear(this.frame, this.currentScrollPositionChange.x, this.positionChangeRequired.x, this.effectDuration);
        this.currentScrollPosition.y = this._easeLinear(this.frame, this.currentScrollPositionChange.y, this.positionChangeRequired.y, this.effectDuration);
    }

    /**
     * Start a smooth scroll.
     */
    startScroll() {
        if(this.scrolling) {
            return;
        }
        this.currentScrollPositionChange = new Vector(0, 0);
        this.positionChangeRequired = new Vector(0, 0);
        this.scrolling = true;
        this.frame = 0;
        this.positionChangeRequired = {...this.scrollPosition};
    }

    /**
     * Calculate the camera position based on followed objects.
     */
    calculatePosition() {
        if(this.following.length !== 1) {
            // Handle focusing on many objects
            return;
        }

        if(this.scrolling) {
            this._easeScroll();
            return;
        }

        const object = this.following[0];
        
        const dx = object.rectangle.x - this.viewPort.width / 2;
        const dy = object.rectangle.y - this.viewPort.height / 2;
        
        this.scrollPosition.x = dx;
        this.scrollPosition.y = dy;
    }

    /**
     * Prepare the context for drawing (apply camera transform).
     * @param {CanvasRenderingContext2D} context
     */
    preDraw(context) {
        this.calculatePosition();
        context.save();
        context.beginPath();
        context.rect(this.viewPort.x, this.viewPort.y, this.viewPort.width, this.viewPort.height);
        context.clip();
        context.translate(-this.scrollPosition.x, -this.scrollPosition.y);
    }

    /**
     * Restore the context after drawing.
     * @param {CanvasRenderingContext2D} context
     */
    postDraw(context) {
        context.translate(this.scrollPosition.x, this.scrollPosition.y);
    }
}