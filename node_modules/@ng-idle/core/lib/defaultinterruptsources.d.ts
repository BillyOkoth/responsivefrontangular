import { DocumentInterruptSource } from './documentinterruptsource';
import { EventTargetInterruptOptions } from './eventtargetinterruptsource';
import { StorageInterruptSource } from './storageinterruptsource';
export declare function createDefaultInterruptSources(options?: EventTargetInterruptOptions): (DocumentInterruptSource | StorageInterruptSource)[];
export declare const DEFAULT_INTERRUPTSOURCES: any[];
