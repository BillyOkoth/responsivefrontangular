import { EventTargetInterruptOptions, EventTargetInterruptSource } from './eventtargetinterruptsource';
export declare class DocumentInterruptSource extends EventTargetInterruptSource {
    constructor(events: string, options?: number | EventTargetInterruptOptions);
    filterEvent(event: any): boolean;
}
