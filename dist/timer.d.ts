/**
 * Timer class for measuring elapsed time.
 */
export class Timer {
    startTime: Date;
    currentTime: Date;
    timeElapsed: number;
    timer: NodeJS.Timeout;
    /**
     * Start the timer.
     */
    start(): void;
    /**
     * Stop the timer and clear state.
     */
    stop(): void;
}
//# sourceMappingURL=timer.d.ts.map