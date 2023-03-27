export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    diff(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
    
    distanceFrom(vector) {
        const distance = this.diff(vector);
        
        return Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
    }

    angleToVector(vector) {
        return Math.atan2(vector.x - this.x, vector.y - this.y) * 180 / Math.PI
    }

    subtract(vector) {
        if (typeof vector === 'number') {
            this.x -= vector;
            this.y -= vector;
            
            return this;
        }
        this.x -= vector.x;
        this.y -= vector.y;

        return this;
    }

    add(vector) {
        if (typeof vector === 'number') {
            this.x += vector;
            this.y += vector;
            
            return this;
        }

        this.x += vector.x;
        this.y += vector.y;

        return this;
    }

    multiply(vector) {
        if (typeof vector === 'number') {
            this.x *= vector;
            this.y *= vector;
            
            return this;
        }

        this.x *= vector.x;
        this.y *= vector.y;
        
        return this;
    }

    divide(vector) {
        if (typeof vector === 'number') {
            this.x /= vector;
            this.y /= vector;
            
            return this;
        }

        this.x /= vector.x;
        this.y /= vector.y;
        
        return this;
    }
}
