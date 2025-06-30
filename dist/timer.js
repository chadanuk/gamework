"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
/**
 * Timer class for measuring elapsed time.
 */
var Timer = /** @class */ (function () {
    /**
     * Create a new Timer.
     */
    function Timer() {
        this.startTime = null;
        this.currentTime = null;
        this.timeElapsed = 0;
        this.timer = null;
    }
    /**
     * Start the timer.
     */
    Timer.prototype.start = function () {
        var _this = this;
        this.startTime = new Date();
        this.timeElapsed = 0;
        this.timer = setInterval(function () {
            _this.currentTime = new Date();
            _this.timeElapsed = Math.floor((_this.currentTime - _this.startTime) / 1000);
        }, 10);
    };
    /**
     * Stop the timer and clear state.
     */
    Timer.prototype.stop = function () {
        this.startTime = null;
        this.currentTime = null;
        clearInterval(this.timer);
    };
    return Timer;
}());
exports.Timer = Timer;
