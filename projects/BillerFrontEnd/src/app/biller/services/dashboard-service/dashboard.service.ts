import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'projects/BillerFrontEnd/src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class BillerDashboardService {

  constructor(private http: HttpClient) { }


  getDashboardDataBiller(reqPayload): Observable<any> {
    return this.http.post<any>(
      `${environment.baseurl}getDashBoardDataBiller`, reqPayload
    );
  }
}
