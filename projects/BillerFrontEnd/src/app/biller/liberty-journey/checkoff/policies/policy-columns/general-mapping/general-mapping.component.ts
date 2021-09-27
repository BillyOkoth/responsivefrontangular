import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-mapping',
  templateUrl: './general-mapping.component.html',
  styleUrls: ['./general-mapping.component.css']
})
export class GeneralMappingComponent implements OnInit {
  upload = false;
  mapping = false;
  current = 0;

  constructor() { }

  ngOnInit(): void {
    this.upload = true;
  }

  next(): void {
    this.current += 1;
    this.upload = false;
    this.mapping = true;
  }
}
