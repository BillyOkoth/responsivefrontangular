import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../../services/biller-service/biller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploaded-invoice-details',
  templateUrl: './uploaded-invoice-details.component.html',
  styleUrls: ['./uploaded-invoice-details.component.css']
})
export class UploadedInvoiceDetailsComponent implements OnInit {

  loading = false;
  rows = [];
  aa = false;
  searchValue = ' ';


  constructor(
    private billerService: BillerService,
    private router: Router
  ) { }

  ngOnInit() {

    this.getInvoiceFileRecords();
  }


  getInvoiceFileRecords() {
    this.loading = true;

    const payload = {
      file_id: sessionStorage.getItem('fileId')
    };
    this.billerService.getInvoiceFileRecords(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.rows = response;
      }
    );
  }


  closeView() {
    this.router.navigate(['/biller/dashboard/invoice']);
  }

  setIndex(ii) {
    this.aa = ii;
  }
}
