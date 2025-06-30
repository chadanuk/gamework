"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sound = void 0;
/**
 * Sound class for managing audio playback.
 */
var Sound = /** @class */ (function () {
    /**
     * @param {string} name
     * @param {string} sound
     * @param {boolean} [loop=false]
     * @param {number} [standardVolume=0.4]
     */
    function Sound(name, sound, loop, standardVolume) {
        if (loop === void 0) { loop = false; }
        if (standardVolume === void 0) { standardVolume = 0.4; }
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
    Sound.prototype._load = function () {
        var _this = this;
        this.audio = new Audio(this.sound);
        this.audio.preload = 'auto';
        this.audio.loop = this.loop;
        this.audio.load();
        this.audio.onloadeddata = function () {
            _this.loaded = true;
        };
        this.audio.onerror = function (e) {
            console.error("Failed to load audio: ".concat(_this.sound), e);
        };
    };
    /**
     * Play the sound.
     */
    Sound.prototype.play = function () {
        var _this = this;
        if (!this.loaded || this.playing) {
            return;
        }
        this.playing = true;
        this.audio.volume = this.standardVolume;
        this.audio.play().catch(function (e) {
            console.error("Failed to play audio: ".concat(_this.sound), e);
        });
        this._onEnded = function () { return _this.playing = false; };
        this.audio.addEventListener('ended', this._onEnded);
    };
    /**
     * Stop the sound and clean up event listeners.
     */
    Sound.prototype.stop = function () {
        if (this.audio) {
            this.audio.pause();
            this.playing = false;
            if (this._onEnded) {
                this.audio.removeEventListener('ended', this._onEnded);
                this._onEnded = null;
            }
        }
    };
    /**
     * Set the volume.
     * @param {number} volume
     */
    Sound.prototype.setVolume = function (volume) {
        if (this.audio) {
            this.audio.volume = volume;
        }
    };
    /**
     * Get the current volume.
     * @returns {number}
     */
    Sound.prototype.getVolume = function () {
        return this.audio ? this.audio.volume : this.standardVolume;
    };
    return Sound;
}());
exports.Sound = Sound;
