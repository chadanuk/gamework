"use strict";
exports.__esModule = true;
exports.Timer = void 0;
var Timer = /** @class */ (function () {
    function Timer() {
        this.startTime = null;
        this.currentTime = null;
        this.timeElapsed = 0;
        this.timer = null;
    }
    Timer.prototype.start = function () {
        var _this = this;
        this.startTime = new Date();
        this.timeElapsed = 0;
        this.timer = setInterval(function () {
            _this.currentTime = new Date();
            _this.timeElapsed = Math.floor((_this.currentTime - _this.startTime) / 1000);
        }, 10);
    };
    Timer.prototype.stop = function () {
        this.startTime = null;
        this.currentTime = null;
        clearInterval(this.timer);
    };
    return Timer;
}());
exports.Timer = Timer;
