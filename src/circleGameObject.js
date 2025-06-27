import { Collision } from "./collision";
import { GameObject } from "./gameObject";
import { Rectangle } from "./rectangle";

/**
 * CircleGameObject class for circular game objects.
 */
export class CircleGameObject extends GameObject {
    /**
     * @param {Object} scene
     * @param {string} name
     * @param {Object} circle
     * @param {Object} velocity
     * @param {number} [rotation=0]
     */
    constructor(scene, name, circle, velocity, rotation = 0) {
        super(scene, name, new Rectangle(circle.x - circle.radius, circle.y - circle.radius, circle.radius * 2, circle.radius * 2), {velocity, rotation});
        
        this.circle = circle;
        this.shape = this.circle;
    }
    
    
    /**
     * Set the position of the circle game object.
     * @param {Object} position
     * @returns {CircleGameObject}
     */
    setPosition(position) {
        this.rectangle.x = position.x - this.circle.radius;
        this.rectangle.y = position.y - this.circle.radius;
        this.shape.x = position.x;
        this.shape.y = position.y;
        this.circle.x = position.x;
        this.circle.y = position.y;
        
        return this;
    }
    
 
    /**
     * Detect collisions with another circle game object.
     * @param {Object} object
     */
    detectCollisionsWithOtherCircle(object) {
        // TODO: Implement circle-circle collision detection
    }

    /**
     * Detect collisions with a rectangle game object.
     * @param {Object} object
     */
    detectCollisionsWithRectangle(object) {
        if(object.ignoreCollisions) {
            return;
        }
        
        const closestX = Math.max(object.rectangle.x, Math.min(this.circle.x, object.rectangle.x + object.rectangle.width));
        const closestY = Math.max(object.rectangle.y, Math.min(this.circle.y, object.rectangle.y + object.rectangle.height));
        const distance = Math.sqrt(Math.pow(this.circle.x - closestX, 2) + Math.pow(this.circle.y - closestY, 2));
        
        if (distance <= this.circle.radius) {
          let collision;
          
          if (closestX === object.rectangle.x) {
            collision = new Collision('right', this, object);
            this.currentCollisions.push(collision);
          } 
          if (closestX === object.rectangle.x + object.rectangle.width) {
            collision = new Collision('left', this, object);
            this.currentCollisions.push(collision);
          } 
          if (closestY === object.rectangle.y) {
            collision = new Collision('bottom', this, object);
            this.currentCollisions.push(collision);
          }
          if (closestY === object.rectangle.y + object.rectangle.height) {
            collision = new Collision('top', this, object);
            this.currentCollisions.push(collision);
          }
        }
    }

    /**
     * Detect collisions with another object.
     * @param {Object} object
     */
    detectCollisions(object) {
        if(object instanceof CircleGameObject) {
            this.detectCollisionsWithOtherCircle(object);
            return;
        }
        
        this.detectCollisionsWithRectangle(object);
    }

    /**
     * Draw the hitbox for the circle game object.
     * @param {CanvasRenderingContext2D} context
     */
    drawHitBox(context) {
        if(!this.showHitBox) {
            return;
        }
        
        context.strokeStyle = this.outlineColour;
        context.beginPath();
        context.arc(this.screenDrawObject.x, this.screenDrawObject.y, this.screenDrawObject.radius, 0, 2 * Math.PI);
        if(this.fillColour) {
            context.fillStyle = this.fillColour;
            context.fill();
        } else {
            context.stroke();   
        }
        context.closePath();
    }
}