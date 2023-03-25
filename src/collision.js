export class Collision {
    constructor(type, object1, object2) {
        this.type = type;
        this.object1 = object1;
        this.object2 = object2;
    }

    getFriction() {
        let friction = this.object1.getFriction() + this.object2.getFriction();
            
        if(friction > 1) {
            friction = 1;
        }

        return friction;
    }
}