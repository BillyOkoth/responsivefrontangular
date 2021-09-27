import { WindowInterruptSource } from './windowinterruptsource';
export declare class StorageInterruptSource extends WindowInterruptSource {
    constructor(throttleDelay?: number);
    filterEvent(event: StorageEvent): boolean;
}
