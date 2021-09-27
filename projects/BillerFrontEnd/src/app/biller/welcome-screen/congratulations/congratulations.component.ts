import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.css']
})
export class CongratulationsComponent implements OnInit {

  constructor(

    private router: Router,
    private modalService: NzModalService
  ) { }

  ngOnInit() {


  }

  addPayers() {

    this.modalService.closeAll();
    this.router.navigate(['/biller/dashboard/view-payers']);

  }

}
