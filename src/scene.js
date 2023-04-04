export class TileMap {
    constructor(scene, tileMap, tileset = null) {
        this.scene = scene;
        this.tileMap = {
            cols: 8,
            rows: 8,
            tsize: 32,
            tiles: [
              
            ],
            ...tileMap,
        };

        this.image = new Image();
        this.isLoaded = null;
        this.load();
        this.tileset = tileset;

        window.gamework.constants.ASSETS.push(this);
        this.scene.addObject(this);
    }

    setScene(scene) {
        this.scene = scene;
    }

    load() {
        this.image.onload = () => {
            this.loaded = true;
        }
        
        this.image.src = this.tileset;
    }

    getTile(col, row) {
        return this.tileMap.tiles[row * map.cols + col];
    }

    draw(context) {
        for (var c = 0; c < this.tileMap.cols; c++) {
            for (var r = 0; r < this.tileMap.rows; r++) {
                var tile = this.getTile(c, r);
                if (tile === 0) { // 0 => empty tile
                    return;
                }
                
                context.drawImage(
                    this.image,
                    (tile - 1) * this.tileMap.tsize,
                    0,
                    this.tileMap.tsize,
                    this.tileMap.tsize, 
                    c * this.tileMap.tsize, 
                    r * this.tileMap.tsize,
                    this.tileMap.tsize,
                    this.tileMap.tsize
                );
            }
        }
    }
}