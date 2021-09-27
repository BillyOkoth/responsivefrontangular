import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  getDashBoardDataBank(reqPayload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseurl}getDashBoardDataBank`, reqPayload
    );
  }

  getSystemMonitoring(reqPayload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseurl}getSystemMonitoring`, reqPayload
    );
  }
}
