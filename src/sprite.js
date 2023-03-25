import { ASSETS } from "../constants";

export class Sprite {
        constructor(imageSrc, gameObject, animate = true) {
            this.gameObject = gameObject;
            this.imageSrc = imageSrc;
            this.loaded = false;
            this.image = new Image();
            this.animate = animate;
            this.repeat = true;
            this.isLoaded = null;
            this.load();
            this.currentFrame = 0;
            this.frameRate = 20;
            this.column = 0;
            this.row = 0;
            ASSETS.push(this);
        }
        
        setColumns(value) {
            this.columns = value;
            
            return this;
        }

        setRows(value) {
            this.rows = value;
            
            return this;
        }

        setColumn(value) {
            this.column = value;
            
            return this;
        }

        setRow(value) {
            this.row = value;
            
            return this;
        }
        
        nextColumn() {
            if(this.column + 1 === this.columns) {
                this.column = 0;
            }

            this.column += 1;
        }
        
        nextRow() {
            if(this.row  +1 === this.rows) {
                this.row = 0;
            }
        }

        nextImage() {
            if(this.currentFrame % this.frameRate !== 0) {
                return;
            }
            this.nextColumn();
            this.nextRow();
        }
    
        setGameObject(gameObject) {
            this.gameObject = gameObject;
    
            return this;
        }
    
        load() {
            this.image.onload = () => {
                this.loaded = true;
            }
            
            this.image.src = this.imageSrc;
        }
    
        draw(context) {
            if(!this.gameObject || !this.loaded) {
                return;
            }
            const w = this.image.width / this.columns;
            const h = this.image.height / this.rows;

            this.currentFrame += 1;
            context.drawImage(this.image, this.column * w, this.row * this.gameObject.rectangle.height, this.gameObject.rectangle.width, this.gameObject.rectangle.height, this.gameObject.rectangle.x, this.gameObject.rectangle.y, this.gameObject.rectangle.width, this.gameObject.rectangle.height);
            
            if(!this.animate) {
                return;
            }

            this.nextImage();
        }
    }