import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance-payer-map',
  templateUrl: './insurance-payer-map.component.html',
  styleUrls: ['./insurance-payer-map.component.css']
})
export class InsurancePayerMapComponent implements OnInit {
  mapping;
  upload;
  current = 0;
  constructor() { }

  ngOnInit() {
    this.upload = true;
  }

  pre(): void {
    this.current -= 1;
    this.upload = true;
    this.mapping = false;
  }

  next(): void {
    this.current += 1;
    this.upload = false;
    this.mapping = true;
  }

  done(): void {
    console.log('done');
  }




}
