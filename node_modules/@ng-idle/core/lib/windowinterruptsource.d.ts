import { EventTargetInterruptOptions, EventTargetInterruptSource } from './eventtargetinterruptsource';
export declare class WindowInterruptSource extends EventTargetInterruptSource {
    constructor(events: string, options?: number | EventTargetInterruptOptions);
}
