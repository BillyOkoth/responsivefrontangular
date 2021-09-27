import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-accounts',
  templateUrl: './add-accounts.component.html',
  styleUrls: ['./add-accounts.component.scss']
})
export class AddAccountsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  toMyAccounts() {


    this.router.navigate(['admin/viewAccounts']);
  }
}
