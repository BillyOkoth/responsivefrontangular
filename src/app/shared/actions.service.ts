import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllowedActions {
  allowed;
  constructor() {}

  getActions() {
    this.allowed = JSON.parse(sessionStorage.getItem('actions'));
  }
}
