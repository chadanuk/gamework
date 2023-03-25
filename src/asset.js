import { ASSETS } from "../constants";

export class Asset {
    constructor(imageSrc, gameObject = null, repeat = true) {
        this.gameObject = gameObject;
        this.imageSrc = imageSrc;
        this.loaded = false;
        this.image = new Image();
        this.repeat = repeat;
        this.load();
        if(!this.findAsset(imageSrc)) {
            ASSETS.push(this);
        }
    }

    findAsset(imageSrc) {
        const foundAsset = ASSETS.find((assetInData) => {
            return assetInData.imageSrc === imageSrc;
        });
        
        if(foundAsset === undefined) {
            return null;
        }

        return foundAsset;
    }

    setRepeat(value) {
        this.repeat = value;
        
        return this;
    }

    setGameObject(gameObject) {
        this.gameObject = gameObject;

        return this;
    }

    load() {
        if(this.gameObject) {
            this.image.width = this.gameObject.rectangle.width;
            this.image.height = this.gameObject.rectangle.height;
            this.image.style.objectFit = 'contain';
        }
        this.image.onload = () => {
            this.loaded = true;
        }
        this.image.src = this.imageSrc;

    }

    draw(context) {
        if(!this.gameObject || !this.loaded) {
            return;
        }
        
        if(this.repeat) {
            const pattern = context.createPattern(this.image, "repeat");
            context.fillStyle = pattern;
            context.fillRect(this.gameObject.rectangle.x, this.gameObject.rectangle.y, this.gameObject.rectangle.width, this.gameObject.rectangle.height);
            return;
        }
        
        context.drawImage(this.image, this.gameObject.rectangle.x, this.gameObject.rectangle.y, this.gameObject.rectangle.width, this.gameObject.rectangle.height)
    }
}