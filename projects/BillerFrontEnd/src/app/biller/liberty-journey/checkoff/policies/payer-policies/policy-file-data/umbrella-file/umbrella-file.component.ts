import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../../../services/policies.service';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/biller/services/excel-data.service';

@Component({
  selector: 'app-umbrella-file',
  templateUrl: './umbrella-file.component.html',
  styleUrls: ['./umbrella-file.component.css']
})
export class UmbrellaFileComponent implements OnInit {

  rows = [];
  searchValue;
  loading = false;
  umbrella = [];
  constructor(private policy: PoliciesService,
    private excelDownload: ExcelDataService,) { }

  ngOnInit() {
    this.getFileData();
  }

  getFileData() {
    this.loading = true;
    const payload = {
      file_id: sessionStorage.getItem('policy_file')
    };

    this.policy.getPolicyFileData(payload).subscribe((response: any) => {
      this.loading = false;
      if (response.length > 0) {
        // this.rows = response;
        response.forEach((policy: any) => {
          if (policy.policy_type.toLowerCase() === 'umbrella') {
            this.umbrella.push(policy);
          }
        });
        this.rows = this.umbrella;
      }
    });
  }

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelDownload.pensionBillerSide('Pensions.', rows);
    this.loading = false;
  }



}
