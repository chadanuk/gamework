export class Sound {
    constructor(name, sound, loop = false, standardVolume = 4) {
        this.name = name;
        this.audio = null;
        this.loop = loop;
        this.sound = sound;
        this.loaded = false;
        this.standardVolume = standardVolume;
        this.playing = false;
        this.load()
        window.gamework.constants.ASSETS.push(this);
    }

    load() {
      this.audio = new Audio(this.sound);
      this.audio.preload = 'auto';
      this.audio.loop = this.loop;
      this.audio.load();

      this.audio.onloadeddata = () => {
        this.loaded = true;
      }
    }

    play() {
        if(!this.loaded || this.playing) {
            return;
        }
        this.playing = true;
        
        this.audio.volume = this.standardVolume;
        this.audio.play();
        this.audio.addEventListener('ended', () => this.playing = false);
    }   

    stop() {
        this.audio.pause();
        this.playing = false;
    }
}