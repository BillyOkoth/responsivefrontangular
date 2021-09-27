import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

 export class BillerIdService {
    constructor() {}

    private billerId = new BehaviorSubject<string>('');
    castBillerId = this.billerId.asObservable();

    setBillerId(billerId) {
        this.billerId.next(billerId);
    }
}
