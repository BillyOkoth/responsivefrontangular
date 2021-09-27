import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

 export class AliasService {
    constructor() {}

    private alias = new BehaviorSubject<string>('');
    private closed_biller_type = new BehaviorSubject<string>('');
    castAlias = this.alias.asObservable();
    castClosedBillerType = this.closed_biller_type.asObservable();

    setAlias(alias) {
        this.alias.next(alias);
    }

    setClosedBillerType(closed_biller_type) {
        this.closed_biller_type.next(closed_biller_type);
    }
}
