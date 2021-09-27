import { EventEmitter, NgZone, OnDestroy } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { KeepaliveSvc } from '@ng-idle/core';
/**
 * An example of an injectable service.
 */
export declare class Keepalive extends KeepaliveSvc implements OnDestroy {
    private http;
    private zone;
    private pingRequest;
    private pingInterval;
    private pingHandle;
    onPing: EventEmitter<any>;
    onPingResponse: EventEmitter<HttpResponse<any>>;
    constructor(http: HttpClient, zone: NgZone);
    request<T>(url?: string | HttpRequest<T>): HttpRequest<T>;
    interval(seconds?: number): number;
    ping(): void;
    start(): void;
    stop(): void;
    ngOnDestroy(): void;
    isRunning(): boolean;
    private hasPingHandle;
}
