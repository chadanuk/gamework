import { GameObject } from "gamework/src/GameObject";
import { Rectangle } from "gamework/src/Rectangle";

export class TileMap extends GameObject {
    constructor(scene, tileMap = {}, tileset = null) {
        super(scene,'tilemap', new Rectangle(0, 0, 32, 32));
        this.name = 'tilemap';
        this.id = `tilemap-${new Date().getTime()}`;
        scene.addObject(this);
        this.showHitBox = false;
        this.tileMap = {
            cols: 8,
            rows: 80,
            tsize: 32,
            tiles: [
              
            ],
            ...tileMap,
        };

        this.image = new Image();
        this.isLoaded = null;
        this.tileset = tileset;
        this.load();

        window.gamework.constants.ASSETS.push(this);
    }

    setScene(scene) {
        this.scene = scene;
        return this;
    }
    
    setShowHitBox(showHitBox) {
        this.showHitBox = showHitBox;
        return this;
    }

    drawHitBox(context) {}

    handleCollisions() {}

    calculatePosition() {}

    load() {
        this.image.onload = () => {
            this.loaded = true;
        }
        this.image.src = this.tileset;
    }

    getTile(col, row) {
        return this.tileMap.tiles[row * this.tileMap.cols + col];
    }

    draw(context) {
        if(!this.loaded) {
            return;
        }
        for (let c = 0; c < this.tileMap.cols; c++) {
            for (let r = 0; r < this.tileMap.rows; r++) {
                let tile = this.getTile(c, r);
                if (tile === 0) { // 0 => empty tile
                    continue;
                }
                const x = c * this.tileMap.tsize;
                const y = r * this.tileMap.tsize;
                
                context.drawImage(
                    this.image,
                    (tile - 1) * this.tileMap.tsize,
                    (tile - 1) * this.tileMap.tsize / this.tileMap.cols,
                    this.tileMap.tsize,
                    this.tileMap.tsize, 
                    x, 
                    y,
                    this.tileMap.tsize,
                    this.tileMap.tsize
                );
            }
        }
    }
}