import * as baseConstants from './constants.json';

export class Game {
    constructor(canvas){
        this.canvas = canvas;
        this.scale = window.devicePixelRatio; 
        this.canvas.width = window.innerWidth * this.scale;
        this.canvas.height = window.innerHeight * this.scale;
        this.setUpCanvas();
        this.scenes = [];
        this.showHitBoxes = false;
        this.paused = false;
        this.currentFrame = 0;

        this.pointerIsDown = false;
        this.pointerDownPosition = null;
        this.initialiseContext();
        this.addEventListeners();

        this.keysDown = [];

        this.constants = baseConstants;
        window.gamework = this;
    }
    
    setConstants(constants) {
        this.constants = {...this.constants, ...constants};

        return this;
    }
    
    pause() {
        this.pause = true;
    }

    removeEventListeners() {
        window.removeEventListener('resize', this.setUpCanvas);
        this.canvas.removeEventListener('mousedown', this.handlePointerDown);
        this.canvas.removeEventListener('mousemove', this.handlePointerMove);
        this.canvas.removeEventListener('mouseup', this.handlePointerEnd);
        this.canvas.removeEventListener('mouseout', this.handlePointerEnd);

        this.canvas.removeEventListener('touchstart', this.handlePointerDown);
        this.canvas.removeEventListener('touchmove', this.handlePointerMove);
        this.canvas.removeEventListener('touchend', this.handlePointerEnd);
    }

    addEventListeners() {
        window.addEventListener('resize', this.setUpCanvas.bind(this), false);
        
        this.canvas.addEventListener('mousedown', this.handlePointerDown.bind(this), false);
        this.canvas.addEventListener('mousemove', this.handlePointerMove.bind(this), false);
        this.canvas.addEventListener('mouseup', this.handlePointerEnd.bind(this), false);
        this.canvas.addEventListener('mouseout', this.handlePointerEnd.bind(this), false);
        
        this.canvas.addEventListener('touchstart', this.handlePointerDown.bind(this), false);
        this.canvas.addEventListener('touchmove', this.handlePointerMove.bind(this), false);
        this.canvas.addEventListener('touchend', this.handlePointerEnd.bind(this), false);

        this.canvas.addEventListener('keydown', this.handleKeyDown.bind(this), false);
        this.canvas.addEventListener('keyup', this.handleKeyUp.bind(this), false);
    }

    handleKeyDown(event) {
        this.keysDown.push(event.key);

        this.scenes.forEach((scene) => {
            scene.handleKeysDown(this.keysDown);
        });
    }

    handleKeyUp(event) {
        this.keysDown = this.keysDown.filter((keyDown) => {
            return keyDown !== event.key;
        });

        this.scenes.forEach((scene) => {
            scene.handleKeyUp(this.keysDown, event.key);
        });
    }

    getPositionFromPointerEvent(event) {
        if(event.touches !== undefined && event.touches[0] !== undefined) {
            return {x: event.touches[0].clientX, y: event.touches[0].clientYY };
        }

        return {x: event.pageX, y: event.pageY }
    }

    handlePointerDown(event) {
        this.pointerIsDown = true;

        this.pointerDownPosition = this.getPositionFromPointerEvent(event);

        this.scenes.forEach((scene) => {
            scene.handlePointerDown(this.pointerDownPosition);
        });
    }

    handlePointerMove(event) {
        const pointerPosition = this.getPositionFromPointerEvent(event);
        
        const dx = this.pointerIsDown ? pointerPosition.x - this.pointerDownPosition.x : 0;
        const dy = this.pointerIsDown ? pointerPosition.y - this.pointerDownPosition.y : 0;

        this.scenes.forEach((scene) => {
            scene.handlePointerMovement({dx, dy}, pointerPosition, this.pointerIsDown);
        });   
    }

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

    setUpCanvas() {
        this.canvas.width = window.innerWidth * this.scale;
        this.canvas.height = window.innerHeight * this.scale;
    }

    initialiseContext() {
        this.context = this.canvas.getContext('2d');
        this.context.scale(this.scale, this.scale);
    }

    addScene(scene) {
        if(this.showHitBoxes) {
            scene.setShowHitBoxes(true);
        }
        this.scenes.push(scene);
        scene.setGame(this);
        return this;
    }

    removeScene(sceneToRemove) {;
        sceneToRemove.remove();
        this.scenes = this.scenes.filter(scene => scene.id !== sceneToRemove.id);
    }

    startLoop() {
        this.loop();
    }
    
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.scenes.forEach((scene) => {
            if(this.scenes.findIndex(fs => fs.id === scene.id) === -1) {
                return;
            }
            scene.draw(this.context);
        });
    }

    loop() {
        this.currentFrame += 1;
        this.draw.bind(this)();
        requestAnimationFrame(this.loop.bind(this));
    }
}
