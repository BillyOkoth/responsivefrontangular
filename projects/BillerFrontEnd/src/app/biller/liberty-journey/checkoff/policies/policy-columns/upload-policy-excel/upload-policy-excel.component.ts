import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-policy-excel',
  templateUrl: './upload-policy-excel.component.html',
  styleUrls: ['./upload-policy-excel.component.css']
})
export class UploadPolicyExcelComponent implements OnInit {
upload = false;
mapping = false;
current = 0;
  constructor() { }

  ngOnInit() {
    this.upload = true;
  }

  next(): void {
    this.current += 1;
    this.upload = false;
    this.mapping = true;
  }
}
