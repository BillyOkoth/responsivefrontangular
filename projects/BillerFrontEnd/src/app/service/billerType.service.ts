import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

 export class BillerTypeService {
    constructor() {}

    private closed_biller_class = new BehaviorSubject<string>('');
    castClosedBillerClass = this.closed_biller_class.asObservable();

    setClosedBillerClass(closed_biller_class) {
        this.closed_biller_class.next(closed_biller_class);
    }
}
