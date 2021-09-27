export declare abstract class IdleExpiry {
    protected idValue: any;
    protected idlingValue: boolean;
    constructor();
    id(value?: any): any;
    abstract last(value?: Date): Date;
    idling(value?: boolean): boolean;
    now(): Date;
    isExpired(): boolean;
}
