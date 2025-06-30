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
    constructor(name: string, sound: string, loop?: boolean, standardVolume?: number);
    name: string;
    audio: HTMLAudioElement;
    loop: boolean;
    sound: string;
    loaded: boolean;
    standardVolume: number;
    playing: boolean;
    /**
     * Load the audio file and handle errors.
     * @private
     */
    private _load;
    /**
     * Play the sound.
     */
    play(): void;
    _onEnded: () => boolean;
    /**
     * Stop the sound and clean up event listeners.
     */
    stop(): void;
    /**
     * Set the volume.
     * @param {number} volume
     */
    setVolume(volume: number): void;
    /**
     * Get the current volume.
     * @returns {number}
     */
    getVolume(): number;
}
//# sourceMappingURL=sound.d.ts.map