import { EventEmitter } from '@angular/core';
import { InterruptArgs } from './interruptargs';
export declare abstract class InterruptSource {
    protected attachFn?: (source: InterruptSource) => void;
    protected detachFn?: (source: InterruptSource) => void;
    isAttached: boolean;
    onInterrupt: EventEmitter<InterruptArgs>;
    constructor(attachFn?: (source: InterruptSource) => void, detachFn?: (source: InterruptSource) => void);
    attach(): void;
    detach(): void;
}
