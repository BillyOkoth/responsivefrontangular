import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-map',
  templateUrl: './invoice-map.component.html',
  styleUrls: ['./invoice-map.component.css']
})
export class InvoiceMapComponent implements OnInit {
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
