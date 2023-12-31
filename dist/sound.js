"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sound = void 0;
var Sound = /** @class */ (function () {
    function Sound(name, sound, loop, standardVolume) {
        if (loop === void 0) { loop = false; }
        if (standardVolume === void 0) { standardVolume = 4; }
        this.name = name;
        this.audio = null;
        this.loop = loop;
        this.sound = sound;
        this.loaded = false;
        this.standardVolume = standardVolume;
        this.playing = false;
        this.load();
        window.gamework.constants.ASSETS.push(this);
    }
    Sound.prototype.load = function () {
        var _this = this;
        this.audio = new Audio(this.sound);
        this.audio.preload = 'auto';
        this.audio.loop = this.loop;
        this.audio.load();
        this.audio.onloadeddata = function () {
            _this.loaded = true;
        };
    };
    Sound.prototype.play = function () {
        var _this = this;
        if (!this.loaded || this.playing) {
            return;
        }
        this.playing = true;
        this.audio.volume = this.standardVolume;
        this.audio.play();
        this.audio.addEventListener('ended', function () { return _this.playing = false; });
    };
    Sound.prototype.stop = function () {
        this.audio.pause();
        this.playing = false;
    };
    return Sound;
}());
exports.Sound = Sound;
