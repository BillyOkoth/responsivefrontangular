import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BillerUpdatePayer } from './payer';
import { environment } from 'projects/BillerFrontEnd/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayerService {

  constructor(private http: HttpClient) { }

  billerUpdatePayer(payload: BillerUpdatePayer) {
    return this.http.post<BillerUpdatePayer>(`${environment.baseurl}BillerupdatePayerProfile`, payload);
  }

  addToTeam(payload) {
    return this.http.post(`${environment.baseurl}assignTeamToPayer`, payload);
  }
}
