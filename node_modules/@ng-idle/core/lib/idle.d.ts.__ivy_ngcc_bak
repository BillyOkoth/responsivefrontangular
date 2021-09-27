import { EventEmitter, NgZone, OnDestroy } from '@angular/core';
import { IdleExpiry } from './idleexpiry';
import { Interrupt } from './interrupt';
import { InterruptSource } from './interruptsource';
import { KeepaliveSvc } from './keepalivesvc';
export declare enum AutoResume {
    disabled = 0,
    idle = 1,
    notIdle = 2
}
/**
 * A service for detecting and responding to user idleness.
 */
export declare class Idle implements OnDestroy {
    private expiry;
    private zone;
    private idle;
    private timeoutVal;
    private autoResume;
    private interrupts;
    private running;
    private idling;
    private idleHandle;
    private timeoutHandle;
    private countdown;
    private keepaliveEnabled;
    private keepaliveSvc;
    onIdleStart: EventEmitter<any>;
    onIdleEnd: EventEmitter<any>;
    onTimeoutWarning: EventEmitter<number>;
    onTimeout: EventEmitter<number>;
    onInterrupt: EventEmitter<any>;
    [key: string]: any;
    constructor(expiry: IdleExpiry, zone: NgZone, keepaliveSvc?: KeepaliveSvc);
    setIdleName(key: string): void;
    getKeepaliveEnabled(): boolean;
    setKeepaliveEnabled(value: boolean): boolean;
    getTimeout(): number;
    setTimeout(seconds: number | boolean): number;
    getIdle(): number;
    setIdle(seconds: number): number;
    getAutoResume(): AutoResume;
    setAutoResume(value: AutoResume): AutoResume;
    setInterrupts(sources: Array<InterruptSource>): Array<Interrupt>;
    getInterrupts(): Array<Interrupt>;
    clearInterrupts(): void;
    isRunning(): boolean;
    isIdling(): boolean;
    watch(skipExpiry?: boolean): void;
    setIdleIntervalOutsideOfZone(watchFn: () => void, frequency: number): void;
    stop(): void;
    timeout(): void;
    interrupt(force?: boolean, eventArgs?: any): void;
    private setIdling;
    private toggleState;
    private setTimoutIntervalOutsideZone;
    private toggleInterrupts;
    private getExpiryDiff;
    private doCountdownInZone;
    private doCountdown;
    private safeClearInterval;
    private startKeepalive;
    private stopKeepalive;
    ngOnDestroy(): void;
}
