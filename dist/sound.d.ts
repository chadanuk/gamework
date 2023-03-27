export class Sound {
    constructor(name: any, sound: any, loop?: boolean, standardVolume?: number);
    name: any;
    audio: HTMLAudioElement;
    loop: boolean;
    sound: any;
    loaded: boolean;
    standardVolume: number;
    playing: boolean;
    load(): void;
    play(): void;
    stop(): void;
}
//# sourceMappingURL=sound.d.ts.map