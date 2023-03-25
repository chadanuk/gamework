export class Timer {
    constructor() {
        this.startTime = null;
        this.currentTime = null;
        this.timeElapsed = 0;
        this.timer = null;
    }

    start() {
        this.startTime = new Date();
        this.timeElapsed = 0;
        this.timer = setInterval(() => {
            this.currentTime = new Date();
            this.timeElapsed = Math.floor((this.currentTime - this.startTime) / 1000);
        }, 10);   
    }

    stop() {
        this.startTime = null;
        this.currentTime = null;

        clearInterval(this.timer);
    }
}