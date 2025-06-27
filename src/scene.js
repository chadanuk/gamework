/**
 * Represents a scene containing game objects and handling input/camera.
 */
export class Scene {
    /**
     * @param {string|null} name
     * @param {Object|null} game
     */
    constructor(name = null, game = null) {
        this.id = `scene.${Math.floor(new Date().getTime() * Math.random())}`;
        this.objects = new Map();
        this.objectsSelected = [];
        this.objectsHoveredOver = [];
        this.showHitBoxes = false;
        this.name = name || this.id;
        this.game = game;
        this.hidden = false;
        this.deleted = false;
        this.camera = null;
        if(this.game){
            this.game.addScene(this);
        }
    }

    /**
     * Set the camera for this scene.
     * @param {Object} camera
     * @returns {Scene}
     */
    setCamera(camera) {
        this.camera = camera;
        return this;
    }

    /** Remove this scene and its objects. */
    remove() {
        this.deleted = true;
        this.clearObjects();
        this.game = null;
    }

    /**
     * Set the game for this scene.
     * @param {Object} game
     * @returns {Scene}
     */
    setGame(game) {
        this.game = game;
        return this;
    }

    /**
     * Show or hide hitboxes for all objects.
     * @param {boolean} show
     * @returns {Scene}
     */
    setShowHitBoxes(show) {
        this.showHitBoxes = show;
        return this;
    }

    /**
     * Add an object to the scene.
     * @param {Object} object
     * @returns {Scene}
     */
    addObject(object) {
        if(this.objects.has(object.id)) {
            this.objects.set(object.id, object);
            console.warn(`object "${object.name}" already exists, updating`);
            return this;
        }
        object.setScene(this);
        this.objects.set(object.id, object);
        return this;
    }

    /** Remove all objects from the scene. */
    clearObjects() {
        this.objects.forEach((object) => {
            object.remove();
        });
        this.objects.clear();
        return this;
    }

    /**
     * Find an object by name.
     * @param {string} name
     * @returns {Object|undefined}
     */
    findObjectByName(name) {
        for (let object of this.objects.values()) {
            if (object.name === name) return object;
        }
        return undefined;
    }

    /**
     * Remove objects whose name contains a substring.
     * @param {string} stringPartial
     */
    removeObjectsWithNameContaining(stringPartial) {
        for (let [id, object] of this.objects.entries()) {
            if(object.name.includes(stringPartial)) {
                object.remove();
                this.objects.delete(id);
            }
        }
    }

    /** Hide this scene. */
    hide() {
        this.hidden = true;
    }

    /** Show this scene. */
    show() {
        this.hidden = false;
    }

    /**
     * Find the index of an object in the scene (by id).
     * @param {Object} object
     * @returns {number|null}
     */
    findObjectIndex(object) {
        let idx = 0;
        for (let obj of this.objects.values()) {
            if (obj.id === object.id) return idx;
            idx++;
        }
        return null;
    }

    /**
     * Handle keys down for all objects.
     * @param {Array<string>} keysDown
     */
    handleKeysDown(keysDown) {
        this.objects.forEach((object) => {
            if(object.controlledByKeyPad) {
                object.handleKeysDown(keysDown);
            }
        });
    }

    /**
     * Handle key up for all objects.
     * @param {Array<string>} keysDown
     * @param {string} keyUp
     */
    handleKeyUp(keysDown, keyUp) {
        this.objects.forEach((object) => {
            if(object.controlledByKeyPad) {
                object.handleKeyUp(keysDown, keyUp);
            }
        });
    }

    /**
     * Handle pointer down event for all objects.
     * @param {Object} position
     */
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

    /**
     * Handle pointer movement for all objects.
     * @param {Object} movement
     * @param {Object} pointerPosition
     * @param {boolean} pointerIsDown
     */
    handlePointerMovement(movement, pointerPosition, pointerIsDown) {
        if(this.deleted || this.hidden) {
            this.objectsHoveredOver = [];
            return;
        }
        const previousObjectsHoveredOver = [...this.objectsHoveredOver];
        this.objectsHoveredOver = [];
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
                object.draw(this.game.context);
                return;
            }
            if(wasHovered > -1) {
                object.handlePointerHoverLeave();
                object.draw(this.game.context);
            }
        });
    }

    /**
     * Handle pointer end for all objects.
     * @param {Object} movement
     */
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

    /**
     * Draw all objects in the scene.
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        if(this.deleted || this.hidden) {
            return;
        }
        if(this.camera) {
            this.camera.preDraw(context);
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
                object.setShowHitBox(true);
                object.drawHitBox(context);
            }
            object.draw(context);
        });
        if(this.camera) {
            this.camera.postDraw(context);
        }
    }
}