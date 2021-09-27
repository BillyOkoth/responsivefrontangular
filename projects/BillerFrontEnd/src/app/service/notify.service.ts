import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

 export class NotifyService {
    constructor() {}

    private notify = new BehaviorSubject<string>('');
    castNotify = this.notify.asObservable();

    setNotify(notify) {
        this.notify.next(notify);
    }
}
