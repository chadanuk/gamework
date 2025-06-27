import {default as baseConstants} from './constants.json';

/**
 * Main Game controller for the 2D game engine.
 */
export class Game {
    /**
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game.
     */
    constructor(canvas){
        this.canvas = canvas;
        this.scale = window.devicePixelRatio; 
        this.canvas.width = window.innerWidth * this.scale;
        this.canvas.height = window.innerHeight * this.scale;
        this.setUpCanvas = this.setUpCanvas.bind(this);
        this.scenes = [];
        this.showHitBoxes = false;
        this.paused = false;
        this.currentFrame = 0;

        this.pointerIsDown = false;
        this.pointerDownPosition = null;
        this.initialiseContext();

        // Use Set for efficient key tracking
        this.keysDown = new Set();
        this.keysToListenFor = [
            'ArrowUp',
            'w',
            'ArrowRight',
            'd',
            'ArrowDown',
            's',
            'ArrowLeft',
            'a',
            ' ',
            'shift',
            'control'
        ];
        this.constants = baseConstants;
        window.gamework = this;

        // Bind event handlers once for add/remove
        this._handlePointerDown = this.handlePointerDown.bind(this);
        this._handlePointerMove = this.handlePointerMove.bind(this);
        this._handlePointerEnd = this.handlePointerEnd.bind(this);
        this._handleKeyDown = this.handleKeyDown.bind(this);
        this._handleKeyUp = this.handleKeyUp.bind(this);

        this.addEventListeners();
    }
    
    /**
     * Override or extend game constants.
     * @param {Object} constants
     * @returns {Game}
     */
    setConstants(constants) {
        this.constants = {...this.constants, ...constants};
        return this;
    }
    
    /**
     * Pause the game loop.
     */
    pause() {
        this.paused = true;
    }

    /**
     * Remove all event listeners.
     */
    removeEventListeners() {
        window.removeEventListener('resize', this.setUpCanvas);
        this.canvas.removeEventListener('mousedown', this._handlePointerDown);
        this.canvas.removeEventListener('mousemove', this._handlePointerMove);
        this.canvas.removeEventListener('mouseup', this._handlePointerEnd);
        this.canvas.removeEventListener('mouseout', this._handlePointerEnd);

        this.canvas.removeEventListener('touchstart', this._handlePointerDown);
        this.canvas.removeEventListener('touchmove', this._handlePointerMove);
        this.canvas.removeEventListener('touchend', this._handlePointerEnd);

        document.removeEventListener('keydown', this._handleKeyDown);
        document.removeEventListener('keyup', this._handleKeyUp);
    }

    /**
     * Add all event listeners.
     */
    addEventListeners() {
        window.addEventListener('resize', this.setUpCanvas, false);
        this.canvas.addEventListener('mousedown', this._handlePointerDown, false);
        this.canvas.addEventListener('mousemove', this._handlePointerMove, false);
        this.canvas.addEventListener('mouseup', this._handlePointerEnd, false);
        this.canvas.addEventListener('mouseout', this._handlePointerEnd, false);
        this.canvas.addEventListener('touchstart', this._handlePointerDown, false);
        this.canvas.addEventListener('touchmove', this._handlePointerMove, false);
        this.canvas.addEventListener('touchend', this._handlePointerEnd, false);
        document.addEventListener('keydown', this._handleKeyDown, false);
        document.addEventListener('keyup', this._handleKeyUp, false);
    }

    /**
     * Handle key down events.
     * @param {KeyboardEvent} event
     */
    handleKeyDown(event) {
        if(!this.keysToListenFor.includes(event.key)) {
            return;
        }
        event.preventDefault();
        this.keysDown.add(event.key);
        this.scenes.forEach((scene) => {
            scene.handleKeysDown(Array.from(this.keysDown));
        });
    }

    /**
     * Handle key up events.
     * @param {KeyboardEvent} event
     */
    handleKeyUp(event) {
        event.preventDefault();
        this.keysDown.delete(event.key);
        this.scenes.forEach((scene) => {
            scene.handleKeyUp(Array.from(this.keysDown), event.key);
        });
    }

    /**
     * Get pointer position from event.
     * @param {MouseEvent|TouchEvent} event
     * @returns {{x: number, y: number}}
     */
    getPositionFromPointerEvent(event) {
        if(event.touches !== undefined && event.touches[0] !== undefined) {
            return {x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
        return {x: event.pageX, y: event.pageY };
    }

    /**
     * Handle pointer down events.
     * @param {MouseEvent|TouchEvent} event
     */
    handlePointerDown(event) {
        this.pointerIsDown = true;
        this.pointerDownPosition = this.getPositionFromPointerEvent(event);
        this.scenes.forEach((scene) => {
            scene.handlePointerDown(this.pointerDownPosition);
        });
    }

    /**
     * Handle pointer move events.
     * @param {MouseEvent|TouchEvent} event
     */
    handlePointerMove(event) {
        const pointerPosition = this.getPositionFromPointerEvent(event);
        const dx = this.pointerIsDown && this.pointerDownPosition ? pointerPosition.x - this.pointerDownPosition.x : 0;
        const dy = this.pointerIsDown && this.pointerDownPosition ? pointerPosition.y - this.pointerDownPosition.y : 0;
        this.scenes.forEach((scene) => {
            scene.handlePointerMovement({dx, dy}, pointerPosition, this.pointerIsDown);
        });   
    }

    /**
     * Handle pointer end events.
     * @param {MouseEvent|TouchEvent} event
     */
    handlePointerEnd(event) {
        const pointerPosition = this.getPositionFromPointerEvent(event);
        if(pointerPosition && this.pointerDownPosition) {
            const dx = pointerPosition.x - this.pointerDownPosition.x;
            const dy = pointerPosition.y - this.pointerDownPosition.y;
            this.scenes.forEach((scene) => {
                scene.handlePointerEnd({dx, dy});
            });
        }
        this.pointerIsDown = false;
        this.pointerDownPosition = null;
    }

    /**
     * Set up the canvas size.
     */
    setUpCanvas() {
        this.canvas.width = window.innerWidth * this.scale;
        this.canvas.height = window.innerHeight * this.scale;
    }

    /**
     * Initialise the 2D context and scaling.
     */
    initialiseContext() {
        this.context = this.canvas.getContext('2d');
        this.context.scale(this.scale, this.scale);
    }

    /**
     * Add a scene to the game.
     * @param {Object} scene
     * @returns {Game}
     */
    addScene(scene) {
        if(this.showHitBoxes) {
            scene.setShowHitBoxes(true);
        }
        this.scenes.push(scene);
        scene.setGame(this);
        return this;
    }

    /**
     * Remove a scene from the game.
     * @param {Object} sceneToRemove
     */
    removeScene(sceneToRemove) {
        sceneToRemove.remove();
        this.scenes = this.scenes.filter(scene => scene.id !== sceneToRemove.id);
    }

    /**
     * Start the game loop.
     */
    startLoop() {
        this.loop();
    }
    
    /**
     * Draw all scenes.
     */
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.scenes.forEach((scene) => {
            scene.draw(this.context);
        });
    }

    /**
     * Main game loop.
     */
    loop() {
        if (!this.paused) {
            this.currentFrame += 1;
            this.draw();
        }
        requestAnimationFrame(this.loop.bind(this));
    }
}
