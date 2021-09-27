import { InterruptArgs } from './interruptargs';
import { InterruptSource } from './interruptsource';
export declare class Interrupt {
    source: InterruptSource;
    private sub;
    constructor(source: InterruptSource);
    subscribe(fn: (args: InterruptArgs) => void): void;
    unsubscribe(): void;
    resume(): void;
    pause(): void;
}
