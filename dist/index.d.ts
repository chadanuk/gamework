declare module "asset" {
    export class Asset {
        constructor(imageSrc: any, gameObject?: any, repeat?: boolean);
        gameObject: any;
        imageSrc: any;
        loaded: boolean;
        image: HTMLImageElement;
        repeat: boolean;
        findAsset(imageSrc: any): any;
        setRepeat(value: any): Asset;
        setGameObject(gameObject: any): Asset;
        load(): void;
        draw(context: any): void;
    }
}
declare module "collision" {
    export class Collision {
        constructor(type: any, object1: any, object2: any);
        type: any;
        object1: any;
        object2: any;
        getFriction(): any;
    }
}
declare module "vector" {
    export class Vector {
        constructor(x: any, y: any);
        x: any;
        y: any;
        diff(vector: any): Vector;
        distanceFrom(vector: any): number;
        angleToVector(vector: any): number;
        subtract(vector: any): Vector;
        add(vector: any): Vector;
        multiply(vector: any): Vector;
        divide(vector: any): Vector;
    }
}
declare module "gameObject" {
    export class GameObject {
        constructor(scene: any, name: any, rectangle: any, options?: {
            velocity: Vector;
            acceleration: Vector;
            currentAngle: number;
            rotation: number;
            friction: any;
            maxSpeed: number;
            ignoreCollisions: boolean;
            paused: boolean;
            deleted: boolean;
            shouldConstrainToCanvasBounds: boolean;
            onPositionChange: () => void;
            onCollision: () => void;
            controlledByKeyPad: boolean;
            accelerateInDirectionOfTravelOnly: boolean;
            drawTrace: boolean;
            showHitBox: boolean;
        });
        id: number;
        name: any;
        scene: any;
        rectangle: any;
        shape: any;
        sprite: any;
        asset: any;
        currentCollisions: any[];
        keysDown: any[];
        sounds: any[];
        trace: any[];
        pause(): void;
        paused: boolean;
        addSound(sound: any): GameObject;
        setShowHitBox(showHitBox: any): GameObject;
        showHitBox: any;
        setAsset(asset: any): GameObject;
        setScene(scene: any): GameObject;
        setAccelerateIndirectionOfTravelOnly(followVelocity: any): GameObject;
        accelerateInDirectionOfTravelOnly: any;
        setIgnoreCollisions(ignoreCollisions: any): GameObject;
        ignoreCollisions: any;
        setMaxSpeed(maxSpeed: any): GameObject;
        maxSpeed: any;
        setVelocity(velocity: any): GameObject;
        velocity: any;
        setAcceleration(acceleration: any): GameObject;
        acceleration: any;
        setFriction(friction: any): GameObject;
        friction: any;
        getFriction(): any;
        updateVelocity(velocity?: {
            x: any;
            y: any;
        }): void;
        remove(): void;
        deleted: boolean;
        setPosition(position: any): void;
        updatePositionBasedOnKeys(): void;
        getPosition(): {
            x: any;
            y: any;
        };
        constrainToCanvasBounds(): void;
        calculatePosition(): void;
        handleKeysDown(keysDown: any): void;
        handleKeyUp(keysDown: any, keyUp: any): void;
        handlePointerDown(position: any): void;
        handlePointerHover(): void;
        handlePointerHoverLeave(): void;
        handlePointerMovement(movement: any): void;
        handlePointerEnd(movement: any): void;
        stop(): void;
        findSound(name: any): any;
        playSound(name: any): void;
        stopSound(name?: any): void;
        drawHitBox(context: any): void;
        drawTraceLine(context: any): void;
        drawRotated(context: any): void;
        draw(context: any): void;
        hasNoVelocity(): boolean;
        getCollisionByType(collisionType: any): any;
        detectCollisions(object: any): void;
        collisionExists(collisionType: any): boolean;
        getCollisionsFriction(types?: any[]): number;
        handleRotationInCollision(collisionSide: any, friction: any): void;
        correctAccelerationAfterRotation(): void;
        handleCollisions(): void;
    }
    import { Vector } from "vector";
}
declare module "rectangle" {
    export class Rectangle {
        constructor(x: any, y: any, width: any, height: any);
        x: any;
        y: any;
        width: any;
        height: any;
    }
}
declare module "textItem" {
    export class TextItem extends GameObject {
        constructor(scene: any, name: any, position: any, fontSize?: string, fontType?: string, colour?: string, text?: string);
        position: any;
        fontSize: string;
        fontType: string;
        colour: string;
        text: string;
        setText(text: any): TextItem;
    }
    import { GameObject } from "gameObject";
}
declare module "popup" {
    export class Popup extends GameObject {
        constructor(name: any, scene: any, canvas: any, title?: string, rectangle?: any);
        canvas: any;
        title: TextItem;
        buttons: any[];
        verticalButtonSpacing: any;
        setTitle(title: any): Popup;
        clearButtons(): void;
        lastButton(): any;
        addButton(button: any): Popup;
    }
    import { GameObject } from "gameObject";
    import { TextItem } from "textItem";
}
declare module "assetManager" {
    export class AssetManager {
        constructor(canvas: any);
        assets: any;
        loadedInterval: any;
        allAssetsLoaded: boolean;
        loadingProgress: number;
        popup: Popup;
        assetsLoaded(): any;
        drawLoadingProgress(context: any): void;
    }
    import { Popup } from "popup";
}
declare module "button" {
    export class Button extends GameObject {
        constructor(name: any, scene: any, text: any, onTap: any);
        text: TextItem;
        buttonFontSize: number;
        onTapButton: any;
        strokeStyle: any;
        fillStyle: any;
        active: boolean;
        setWidth(width: any): void;
        handlePointerStart(position: any): void;
        handlePointerHoverLeave(position: any): void;
    }
    import { GameObject } from "gameObject";
    import { TextItem } from "textItem";
}
declare module "circle" {
    export class Circle {
        constructor(x: any, y: any, radius: any);
        x: any;
        y: any;
        radius: any;
    }
}
declare module "circleGameObject" {
    export class CircleGameObject extends GameObject {
        constructor(scene: any, name: any, circle: any, velocity: any, rotation?: number);
        circle: any;
        detectCollisionsWithOtherCircle(object: any): void;
        detectCollisionsWithRectangle(object: any): void;
    }
    import { GameObject } from "gameObject";
}
declare module "game" {
    export class Game {
        constructor(canvas: any);
        canvas: any;
        scale: number;
        scenes: any[];
        showHitBoxes: boolean;
        paused: boolean;
        currentFrame: number;
        pointerIsDown: boolean;
        pointerDownPosition: {
            x: any;
            y: any;
        };
        keysDown: any[];
        constants: any;
        setConstants(constants: any): Game;
        pause(): void;
        removeEventListeners(): void;
        addEventListeners(): void;
        handleKeyDown(event: any): void;
        handleKeyUp(event: any): void;
        getPositionFromPointerEvent(event: any): {
            x: any;
            y: any;
        };
        handlePointerDown(event: any): void;
        handlePointerMove(event: any): void;
        handlePointerEnd(event: any): void;
        setUpCanvas(): void;
        initialiseContext(): void;
        context: any;
        addScene(scene: any): Game;
        removeScene(sceneToRemove: any): void;
        startLoop(): void;
        draw(): void;
        loop(): void;
    }
}
declare module "outer.walls" {
    export class OuterWalls {
        constructor(scene: any, gap?: any, wallsConfig?: ({
            x: number;
            y: number;
            w: any;
            h: any;
        } | {
            x: number;
            y: any;
            w: any;
            h: number;
        })[]);
        scene: any;
        depth: any;
        wallsConfig: ({
            x: number;
            y: number;
            w: any;
            h: any;
        } | {
            x: number;
            y: any;
            w: any;
            h: number;
        })[];
        pixelWallsConfig: any[];
        walls: any[];
        gap: any;
        setWallsConfig(wallsConfig: any, gap: any): void;
        removeWallsFromScene(): void;
        findWallIndexForGap(): any;
        splitWallForGap(): void;
        convertWallConfigToPixels(): void;
        generateWalls(): void;
    }
}
declare module "scene" {
    export class Scene {
        constructor(name?: any, game?: any);
        id: string;
        objects: any[];
        objectsSelected: any[];
        objectsHoveredOver: any[];
        showHitBoxes: boolean;
        name: any;
        game: any;
        hidden: boolean;
        deleted: boolean;
        remove(): void;
        setGame(game: any): Scene;
        setShowHitBoxes(show: any): Scene;
        addObject(object: any): Scene;
        clearObjects(): Scene;
        findObjectByName(name: any): any;
        removeObjectsWithNameContaining(stringPartial: any): void;
        hide(): void;
        show(): void;
        findObjectIndex(object: any): any;
        handleKeysDown(keysDown: any): void;
        handleKeyUp(keysDown: any, keyUp: any): void;
        handlePointerDown(position: any): void;
        handlePointerMovement(movement: any, pointerPosition: any, pointerIsDown: any): void;
        handlePointerEnd(movement: any): void;
        draw(context: any): void;
    }
}
declare module "sound" {
    export class Sound {
        constructor(name: any, sound: any, loop?: boolean, standardVolume?: number);
        name: any;
        audio: HTMLAudioElement;
        loop: boolean;
        sound: any;
        loaded: boolean;
        standardVolume: number;
        playing: boolean;
        load(): void;
        play(): void;
        stop(): void;
    }
}
declare module "sprite" {
    export class Sprite {
        constructor(imageSrc: any, gameObject: any, animate?: boolean);
        gameObject: any;
        imageSrc: any;
        loaded: boolean;
        image: HTMLImageElement;
        animate: boolean;
        repeat: boolean;
        isLoaded: any;
        currentFrame: number;
        frameRate: number;
        column: number;
        row: number;
        setColumns(value: any): Sprite;
        columns: any;
        setRows(value: any): Sprite;
        rows: any;
        setColumn(value: any): Sprite;
        setRow(value: any): Sprite;
        nextColumn(): void;
        nextRow(): void;
        nextImage(): void;
        setGameObject(gameObject: any): Sprite;
        load(): void;
        draw(context: any): void;
    }
}
declare module "squareGameObject" {
    export class SquareGameObject extends GameObject {
    }
    import { GameObject } from "gameObject";
}
declare module "tileMap" {
    export class TileMap {
        constructor(scene: any);
        tiles: any[];
    }
}
declare module "timer" {
    export class Timer {
        startTime: Date;
        currentTime: Date;
        timeElapsed: number;
        timer: number;
        start(): void;
        stop(): void;
    }
}
//# sourceMappingURL=index.d.ts.map