export class Scene {
    constructor(name = null, game = null) {
        this.id = `scene.${Math.floor(new Date().getTime() * Math.random())}`;
        this.objects = [];
        this.objectsSelected = [];
        this.objectsHoveredOver = [];
        this.showHitBoxes = false;
        this.name = name || this.id;
        this.game = game;
        this.hidden = false;
        this.deleted = false;
            
        if(this.game){
            this.game.addScene(this);
        }
    }

    remove() {
        this.deleted = true;
        this.clearObjects();
        this.game = null;
    }

    setGame(game) {
        this.game = game;
        return this;
    }

    setShowHitBoxes(show) {
        this.showHitBoxes = show;
        return this;
    }

    addObject(object) {
        let foundObjectIndex = this.findObjectIndex(object);
        if(foundObjectIndex) {
            this.objects[foundObjectIndex] = object;
            console.warn(`object "${object.name}" already exists, updating`);
            return;
        }

        object.setScene(this);
        this.objects.push(object);
        return this;
    }

    clearObjects() {
        this.objects.forEach((object, objectIndex) => {
            object.remove();
            
            delete this.objects[objectIndex];
        });
        return this;
    }

    removeObjectsWithNameContaining(stringPartial) {
        this.objects.forEach((object, objectIndex) => {
            if(object.name.includes(stringPartial)) {
                this.objects[objectIndex].remove();
                delete(this.objects[objectIndex]);
            }
        });
    }

    hide() {
        this.hidden = true;
    }

    show() {
        this.hidden = false;
    }
    
    findObjectIndex(object) {
        const foundObjectIndex = this.objects.findIndex((lookupObject) => {
            
            return lookupObject !== undefined && lookupObject.id === object.id;
        });

        if(foundObjectIndex < 0) {
            return null;
        }

        return foundObjectIndex;
    }
    
    handleKeysDown(keysDown) {
        this.objects.forEach((object) => {
            if(object.controlledByKeyPad) {
                object.handleKeysDown(keysDown);
            }
        });
    }
    
    handleKeyUp(keysDown, keyUp) {
        this.objects.forEach((object) => {
            if(object.controlledByKeyPad) {
                object.handleKeyUp(keysDown, keyUp);
            }
        });
    }

    handlePointerDown(position) {
        if(this.deleted || this.hidden) {
            return;
        }
        this.objects.forEach((object) => {
            if(
                position.x > object.rectangle.x && position.x < object.rectangle.x + object.rectangle.width &&
                position.x > object.rectangle.y && position.y < object.rectangle.y + object.rectangle.height 
            ) {
                this.objectsSelected.push(object);
                object.handlePointerDown(position);
            }
        });

    }

    handlePointerMovement(movement, pointerPosition, pointerIsDown) {
        if(this.deleted || this.hidden) {
            this.objectsHoveredOver = [];
            return;
        }
        const previousObjectsHoveredOver = [...this.objectsHoveredOver];
        
        this.objects.forEach((object) => {
            const wasHovered = previousObjectsHoveredOver.findIndex((previousObjectsHoveredOverObject) => {
                return object.id === previousObjectsHoveredOverObject.id;
            });

            object.handlePointerMovement(movement, pointerPosition, pointerIsDown);
            if(
                pointerPosition.x > object.rectangle.x && pointerPosition.x < object.rectangle.x + object.rectangle.width &&
                pointerPosition.x > object.rectangle.y && pointerPosition.y < object.rectangle.y + object.rectangle.height 
            ) {
                this.objectsHoveredOver.push(object);
                object.handlePointerHover(pointerPosition, pointerIsDown);
                
                return;
            }
            if(wasHovered > -1) {
                object.handlePointerHoverLeave();
            }
        });
    }

    handlePointerEnd(movement) {
        if(this.deleted || this.hidden) {
            this.objectsSelected = [];
            return;
        }
        this.objects.forEach((object) => {
            object.handlePointerEnd(movement);
        });

        this.objectsSelected = [];
    }

    draw(context) {
        if(this.deleted || this.hidden) {
            return;
        }

        this.objects.forEach((object) => {
            this.objects.forEach((potentialCollisionObject) => {
                
                if(potentialCollisionObject.id === object.id) {
                    return;
                }

                object.detectCollisions(potentialCollisionObject);
            });
            object.handleCollisions();

            object.calculatePosition();
            if(this.showHitBoxes) {
                object.setShowHitBoxes(true);
            }

            object.draw(context);
        });
    }
}
