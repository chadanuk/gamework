/**
 * Sound class for managing audio playback.
 */
export class Sound {
    /**
     * @param {string} name
     * @param {string} sound
     * @param {boolean} [loop=false]
     * @param {number} [standardVolume=0.4]
     */
    constructor(name, sound, loop = false, standardVolume = 0.4) {
        this.name = name;
        this.audio = null;
        this.loop = loop;
        this.sound = sound;
        this.loaded = false;
        this.standardVolume = standardVolume;
        this.playing = false;
        window.gamework.constants.ASSETS.push(this);
        this._load();
    }

    /**
     * Load the audio file and handle errors.
     * @private
     */
    _load() {
        this.audio = new Audio(this.sound);
        this.audio.preload = 'auto';
        this.audio.loop = this.loop;
        this.audio.load();
        this.audio.onloadeddata = () => {
            this.loaded = true;
        };
        this.audio.onerror = (e) => {
            console.error(`Failed to load audio: ${this.sound}`, e);
        };
    }

    /**
     * Play the sound.
     */
    play() {
        if(!this.loaded || this.playing) {
            return;
        }
        this.playing = true;
        this.audio.volume = this.standardVolume;
        this.audio.play().catch((e) => {
            console.error(`Failed to play audio: ${this.sound}`, e);
        });
        this._onEnded = () => this.playing = false;
        this.audio.addEventListener('ended', this._onEnded);
    }

    /**
     * Stop the sound and clean up event listeners.
     */
    stop() {
        if(this.audio) {
            this.audio.pause();
            this.playing = false;
            if(this._onEnded) {
                this.audio.removeEventListener('ended', this._onEnded);
                this._onEnded = null;
            }
        }
    }

    /**
     * Set the volume.
     * @param {number} volume
     */
    setVolume(volume) {
        if(this.audio) {
            this.audio.volume = volume;
        }
    }

    /**
     * Get the current volume.
     * @returns {number}
     */
    getVolume() {
        return this.audio ? this.audio.volume : this.standardVolume;
    }
}