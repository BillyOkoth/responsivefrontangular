import { IdleExpiry } from './idleexpiry';
export declare class SimpleExpiry extends IdleExpiry {
    private lastValue;
    constructor();
    last(value?: Date): Date;
}
