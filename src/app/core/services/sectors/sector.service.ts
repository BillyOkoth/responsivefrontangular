import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/BillerFrontEnd/src/environments/environment';
import { AddSector, DeleteSector } from './sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) { }

  getSectors(payload) {
    return this.http.post(`${environment.baseurl}getSectors`, payload);
  }

  addSector(payload: AddSector) {
    return this.http.post<AddSector>(`${environment.baseurl}addSectors`, payload);
  }

  deleteSector(payload: DeleteSector) {
    return this.http.post<DeleteSector>(`${environment.baseurl}deleteSectors`, payload);
  }

  uploadSectors(payload){
    return this.http.post(`${environment.baseurl}addMultipleSectors`,payload)
  }
}
