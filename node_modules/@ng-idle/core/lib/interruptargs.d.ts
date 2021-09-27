import { InterruptSource } from './interruptsource';
export declare class InterruptArgs {
    source: InterruptSource;
    innerArgs: any;
    force: boolean;
    constructor(source: InterruptSource, innerArgs: any, force?: boolean);
}
