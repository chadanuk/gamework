import { Collision } from "./collision";
import { GameObject } from "./gameObject";
import { Rectangle } from "./rectangle";


export class CircleGameObject extends GameObject {
    constructor(scene, name, circle, velocity, rotation = 0) {
        super(scene, name, new Rectangle(circle.x - circle.radius, circle.y - circle.radius, circle.radius * 2, circle.radius * 2), velocity, rotation);
        
        this.circle = circle;
        this.shape = this.circle;
    }
    
    detectCollisionsWithOtherCircle(object) {
        // ToDO detect circles colliding
    }

    setPosition(position) {
        this.rectangle.x = position.x - this.circle.radius;
        this.rectangle.y = position.y - this.circle.radius;
        this.shape.x = position.x;
        this.shape.y = position.y;
        this.circle.x = position.x;
        this.circle.y = position.y;
    }

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

    detectCollisions(object) {
        if(object instanceof CircleGameObject) {
            this.detectCollisionsWithOtherCircle(object);
            this.handleCollisions();
            return;
        }
        
        this.detectCollisionsWithRectangle(object);
        this.handleCollisions();
    }

    drawHitBox(context) {
        context.strokeStyle = 'gray';
        context.beginPath();
        context.arc(this.circle.x, this.circle.y, this.circle.radius, 0, 2 * Math.PI);
        context.stroke();
    }
}