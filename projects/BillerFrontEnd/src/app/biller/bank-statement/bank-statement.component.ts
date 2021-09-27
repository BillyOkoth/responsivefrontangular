import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-statement',
  templateUrl: './bank-statement.component.html',
  styleUrls: ['./bank-statement.component.css']
})
export class BankStatementComponent implements OnInit {

  searchValue = '';
  rows = [];
  loading = true;
  constructor() { }

  ngOnInit() {
  }

}
