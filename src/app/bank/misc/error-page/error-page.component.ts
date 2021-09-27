import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    window.onload = function() {
      document.querySelector('.cont_principal').className =
        'cont_principal cont_error_active';
    };
  }
}
