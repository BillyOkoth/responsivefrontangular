import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-payers',
  templateUrl: './view-payers.component.html',
  styleUrls: ['./view-payers.component.css'],
})
export class ViewPayersComponent implements OnInit {
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  billerType = '';
  cols = [];
  display = false;

  closedbiller = false;

  constructor() {}

  ngOnInit() {
    this.cols = [
      { field: 'account_no', header: 'Customer No' },
      { field: 'account_no', header: 'Name' },
      { field: 'account_no', header: 'Email Address' },
      { field: 'account_no', header: 'Pin No' },
      { field: 'account_no', header: 'Currency' },
      { field: 'account_no', header: 'Phone No' },
    ];
    if (sessionStorage.getItem('billertype') === 'Closed') {
      this.closedbiller = true;
    } else {
    }
  }


}
