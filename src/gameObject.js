import { Collision } from "./collision";
import { Vector } from "./vector";
const optionDefaults = {
    velocity: new Vector(0, 0), 
    acceleration: new Vector(0, 0), 
    userControlledSpeed: 3,
    currentAngle: 0,
    rotation: 0,
    friction: null,
    maxSpeed: 6,
    ignoreCollisions: false,
    paused: false,
    deleted: false,
    outlineColour: 'red',
    fillColour: null,
    shouldConstrainToCanvasBounds: false,
    onPositionChange: () => {},
    onCollision: () => {},
    controlledByKeyPad: false,
    accelerateInDirectionOfTravelOnly: false,
    drawTrace: false,
    showHitBox: false,
};

export class GameObject {
    constructor(scene, name, rectangle, options = {}) {
        this.id = Math.floor(new Date().getTime() * Math.random());
        this.name = name;
        this.scene = scene;
        this.rectangle = rectangle;
        this.shape = this.rectangle;
        this.screenDrawObject = this.rectangle;
        
        // Set defaults for typing
        this.velocity =  new Vector(0, 0);
        this.acceleration =  new Vector(0, 0);
        this.userControlledSpeed = 3;
        this.currentAngle =  0;
        this.rotation =  0;
        this.friction =  null;
        this.maxSpeed =  6;
        this.ignoreCollisions =  false;
        this.paused =  false;
        this.deleted =  false;
        this.shouldConstrainToCanvasBounds =  false;
        this.fillColour = null;
        this.outlineColour = 'red';
        this.onPositionChange =  () => {};
        this.onCollision =  () => {};
        this.controlledByKeyPad =  false;
        this.accelerateInDirectionOfTravelOnly =  false;
        this.drawTrace =  false;
        this.showHitBox =  false;


        Object.keys({...optionDefaults, ...options}).forEach((property) => {
            if(options[property] === undefined) {
                return;
            }
            
            this[property] = options[property];
        });
        
        if(this.scene) {
            this.scene.addObject(this);
        }
        
        this.sprite = null;
        this.asset = null;
        
        this.currentCollisions = [];
        this.keysDown = [];
        this.sounds = [];
        this.trace = [];
    }

    pause() {
        this.paused = true;
    }
    
    addSound(sound) {
        this.sounds.push(sound);
        return this;
    }

    setShowHitBox(showHitBox) {
        this.showHitBox = showHitBox

        return this;
    }

    setAsset(asset) {
        this.asset = asset;
        return this;
    }

    setScene(scene) {
        this.scene = scene;
        return this;
    }

    setAccelerateIndirectionOfTravelOnly(followVelocity) {
        this.accelerateInDirectionOfTravelOnly = followVelocity;
        
        return this;
    }

    setIgnoreCollisions(ignoreCollisions) {
        this.ignoreCollisions = ignoreCollisions;
        
        return this;
    }

    setMaxSpeed(maxSpeed) {
        this.maxSpeed = maxSpeed;
        
        return this;
    }

    setVelocity(velocity) {
        this.velocity = velocity;

        return this;
    }

    setAcceleration(acceleration) {
        this.acceleration = acceleration;

        return this;
    }

    setFriction(friction) {
        this.friction = friction;

        return this;
    }

    getFriction() {
        if(this.friction == null) {
            return 0;
        }

        return this.friction;
    }
    
    updateVelocity(velocity = {x: null, y: null}) {
        this.velocity.x += this.acceleration.x ;
        this.velocity.y += this.acceleration.y;

        if(velocity.x != null) {
            this.velocity.x = velocity.x
        }
        if(velocity.y != null) {
            this.velocity.y = velocity.y
        }

        const currentSpeed = Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2));
        
        if(currentSpeed > this.maxSpeed) {
            const velocityScale = this.maxSpeed / currentSpeed;
            this.velocity.x *= velocityScale;
            this.velocity.y *= velocityScale;
        }
    }

    remove() {
        this.deleted = true;
    }

    setPosition(position) {
        this.rectangle.x = position.x;
        this.rectangle.y = position.y;
        this.shape.x = position.x;
        this.shape.y = position.y;

        return this;
    }

    updatePositionBasedOnKeys(){
        this.velocity = new Vector(0, 0);
        if(this.keysDown.includes('ArrowUp') || this.keysDown.includes('w')) {
            this.velocity.y = -this.userControlledSpeed;
        }

        if(this.keysDown.includes('ArrowRight') || this.keysDown.includes('d')) {
            this.velocity.x = this.userControlledSpeed;
        }

        if(this.keysDown.includes('ArrowDown') || this.keysDown.includes('s')) {
            this.velocity.y = this.userControlledSpeed;
        }
        
        if(this.keysDown.includes('ArrowLeft') || this.keysDown.includes('a')) {
            this.velocity.x = -this.userControlledSpeed;
        }
    }

    getPosition() {
        return {x: this.shape.x, y: this.shape.y};
    }

    constrainObjectToCanvasBounds() {
        if(!this.shouldConstrainToCanvasBounds) {
            return;
        }

        const pos = this.getPosition();
        if(this.rectangle.x + this.rectangle.width < 0)  {
            pos.x = 0;
            this.velocity.x *= -1;
        }
        if(
            (this.rectangle.x - this.rectangle.width > this.scene.game.canvas.width)
            ) {
            pos.x = this.scene.game.canvas.width;
            
            this.velocity.x *= -1;
            
        }

        if(this.rectangle.y + this.rectangle.height< 0) {
            pos.y = 0;
            this.velocity.y *= -1;
        } 
        
        if(this.rectangle.y - this.rectangle.height > this.scene.game.canvas.height)
        {
            pos.y = this.scene.game.canvas.height;
            this.velocity.y *= -1;
        }
        this.setPosition(pos);
    }

    calculatePosition() {
        if(this.paused) {
            return;
        }
        
        
        this.constrainObjectToCanvasBounds();
        this.updateVelocity();
        
        if(this.controlledByKeyPad) {
            this.updatePositionBasedOnKeys();
        }
        
        this.rectangle.x += this.velocity.x;
        this.rectangle.y += this.velocity.y;
        this.shape.x += this.velocity.x;
        this.shape.y += this.velocity.y;
        
        if(this.rotation) {
            this.currentAngle += this.rotation;
        }

        this.onPositionChange.call(this);
    }

    handleKeysDown(keysDown) {
        if(this.controlledByKeyPad) {
            this.keysDown = keysDown;
        }
    }

    handleKeyUp(keysDown, keyUp) {
        this.keysDown = keysDown;
        
        if(keyUp.includes('up')) {
            
        }

        if(keyUp.includes('right')) {
            
        }

        if(keyUp.includes('down')) {
            
        }
        
        if(keyUp.includes('left')) {
            
        }
    }

    handlePointerDown(position) {

    }
    
    handlePointerHover() {

    }

    handlePointerHoverLeave() {
        
    }

    handlePointerMovement(movement) {
        
    }
    
    handlePointerEnd(movement) {
        
    }

    stop() {
        this.velocity = new Vector(0, 0);
    }
    
    findSound(name) {
        const sound = this.sounds.find((sound) => {
            return sound.name === name;
        });

        if(sound === undefined || !sound) {
            return null;
        }

        return sound;
    }

    playSound(name) {
        const sound = this.findSound(name)
        
        if(!sound) {
            return;
        }

        sound.play();
    }
    
    stopSound(name = null) {
        const sound = this.findSound(name)
        if(!sound) {
            this.sounds.forEach((sound) => {
                sound.stop();
            })
            return;
        }
        
        sound.stop();
    }

    drawHitBox(context) {
        if(!this.showHitBox) {
            return;
        }
        context.beginPath();
        context.strokeStyle = this.outlineColour;
        context.strokeRect(this.screenDrawObject.x, this.screenDrawObject.y, this.screenDrawObject.width, this.screenDrawObject.height);
        if(this.fillColour) {
            context.fillStyle = this.fillColour;
            context.fillRect(this.screenDrawObject.x, this.screenDrawObject.y, this.screenDrawObject.width, this.screenDrawObject.height);

        }
        context.stroke();
    }
    
    drawTraceLine(context) {
        if(this.drawTrace) {
            this.trace.push({x: this.shape.x, y: this.shape.y});
            const currentStroke = context.strokeStyle;
            
            this.trace.forEach((trace) => {
                context.strokeStyle = 'red';
                context.beginPath();
                context.moveTo(trace.x -1, trace.y-1);
                context.lineTo(trace.x, trace.y);
                context.stroke();
            });
            
            if(this.trace.length > 100) {
                this.trace.shift();
            }
            context.strokeStyle = currentStroke;
        }
    }

    drawRotated(context) {
        //Convert degrees to radian 
        const rad = this.currentAngle * Math.PI / 180;
        
        const translateX = this.rectangle.x + (this.rectangle.width / 2);
        const translateY = this.rectangle.y + (this.rectangle.height / 2);
        //Set the origin to the center of the image
        context.translate(translateX, translateY);
        
        //Rotate the canvas around the origin
        context.rotate(rad);
        context.translate(-translateX, -translateY);
    }

    setScreenDrawObject(shape) {
        this.screenDrawObject = shape;

        return this;
    }

    getDrawObjectPosition() {
        return {x: this.screenDrawObject.x, y: this.screenDrawObject.y};
    }

    draw(context) {
        if(this.deleted) {
            return;
        }

        if(this.currentAngle) {
            // Store the current context state (i.e. rotation, translation etc..)
            context.save()
            this.drawRotated(context);
        }
        
        this.drawHitBox(context);
        if(this.asset) {
            this.asset.draw(context);
        }
        if(this.sprite) {
            this.sprite.draw(context);
        }
        
        if(this.currentAngle) {
            // Restore canvas state as saved from above
            context.restore();
        }
        this.drawTraceLine(context);
    }

    hasNoVelocity() {
        return (this.velocity.x === 0 && this.velocity.y === 0 || (this.controlledByKeyPad && this.keysDown.length === 0));
    }

    getCollisionByType(collisionType) {
        return this.currentCollisions.find((collision) => {
            return collision.type === collisionType;
        });
    }

    detectCollisions(object) {
        if(object.ignoreCollisions) {
            return;
        }

        // Find the sides of each rectangle
          // Find the sides of each rectangle
        const rect1Left = this.rectangle.x;
        const rect1Right = this.rectangle.x + this.rectangle.width ;
        const rect1Top = this.rectangle.y;
        const rect1Bottom = this.rectangle.y + this.rectangle.height ;

        const rect2Left = object.rectangle.x;
        const rect2Right = object.rectangle.x + object.rectangle.width;
        const rect2Top = object.rectangle.y;
        const rect2Bottom = object.rectangle.y + object.rectangle.height;

        // Check for collisions
        if (rect1Right >= rect2Left && rect1Left <= rect2Right && rect1Bottom >= rect2Top && rect1Top <= rect2Bottom) {
            // There is a collision
            if (rect1Right >= rect2Left && rect1Left < rect2Left && this.velocity.x > 0) {
                this.currentCollisions.push(new Collision('right', this, object));
            }
            if (rect1Left <= rect2Right && rect1Right > rect2Right && this.velocity.x < 0) {
                this.currentCollisions.push(new Collision('left', this, object));

            }
            if (rect1Top <= rect2Bottom && rect1Bottom > rect2Bottom && this.velocity.y < 0) {
                this.currentCollisions.push(new Collision('top', this, object));
            }
            if (rect1Bottom >= rect2Top && rect1Top < rect2Top && this.velocity.y > 0) {
                this.currentCollisions.push(new Collision('bottom', this, object));
            }
        }
    }
    
    collisionExists(collisionType) {
        return this.currentCollisions.findIndex((collision) => {
            return collision !== undefined && collision.type === collisionType;
        }) > -1;
    }
    
    getCollisionsFriction(types = []) {
        let friction = 1;
        return Math.min(1, this.currentCollisions.reduce((frictionSum, collision) => {
            if(types.includes(collision.type)) {
             return collision.getFriction() + frictionSum;
            }

            return frictionSum;
        }, friction));
    }

    handleRotationInCollision(collisionSide, friction) {
        if(this.rotation === 0) {
            return;
        }

        let rotationFactor = friction;
        this.rotation -= friction;
        let vx = this.velocity.x;
        let vy = this.velocity.y;

        if(collisionSide === 'top') {          
            vx = this.velocity.x - (rotationFactor * this.rotation / 8);
        }
        if(collisionSide === 'right') {
            vy = this.velocity.y - (rotationFactor * this.rotation / 8);
        }
        if(collisionSide === 'bottom') {
            vx = this.velocity.x + (rotationFactor * this.rotation / 8);
        }
        if(collisionSide === 'left') {
            vy = this.velocity.y + (rotationFactor * this.rotation / 8);
        }
        this.updateVelocity({y: vy, x: vx});
        this.correctAccelerationAfterRotation();
    }
    
    correctAccelerationAfterRotation() {
        if((this.velocity.y < 0 && this.acceleration.y > 0) || (this.velocity.y > 0 && this.acceleration.y < 0)) {
            this.acceleration.y *= -1;
        }
        
        if((this.velocity.x < 0 && this.acceleration.x > 0) || (this.velocity.x > 0 && this.acceleration.x < 0)) {
            this.acceleration.x *= -1;
        }
    }

    handleCollisions() {
        if(this.hasNoVelocity() || this.currentCollisions.length === 0){
            this.currentCollisions = [];
            return;
        }
        const friction = this.getCollisionsFriction(['left', 'right']);

        if(this.collisionExists('right') && this.velocity.x > 0) {
            this.velocity.x *= - 1 * friction;
            this.acceleration.x *= -1;

            this.handleRotationInCollision('right', friction)
        } 

        if(this.collisionExists('left')  && this.velocity.x < 0) {
            this.velocity.x *= - 1 * friction;
            this.acceleration.x *= -1;
            
            this.handleRotationInCollision('left', friction)
        }
    
        if(this.collisionExists('top') && this.velocity.y < 0) {
            this.velocity.y *= - 1 * this.getCollisionsFriction(['top', 'bottom']);
            this.acceleration.y *= -1;
            
            this.handleRotationInCollision('top', friction)
        }
        
        if(this.collisionExists('bottom') && this.velocity.y > 0) {
            this.velocity.y *= - 1 * this.getCollisionsFriction(['top', 'bottom']);
            this.acceleration.y *= -1;
            
            this.handleRotationInCollision('bottom', friction)
        }
        
        this.playSound('collision');
        this.onCollision(this.currentCollisions);
        this.currentCollisions = [];
    }
}
