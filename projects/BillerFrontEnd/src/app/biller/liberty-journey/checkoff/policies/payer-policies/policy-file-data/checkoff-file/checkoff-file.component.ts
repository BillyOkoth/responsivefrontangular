import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../../../services/policies.service';
import { ExcelDataService } from 'projects/BillerFrontEnd/src/app/biller/services/excel-data.service';

@Component({
  selector: 'app-checkoff-file',
  templateUrl: './checkoff-file.component.html',
  styleUrls: ['./checkoff-file.component.css']
})
export class CheckoffFileComponent implements OnInit {

  rows = [];
  searchValue;
  loading = false;
  checkoff = [];
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
          if (policy.policy_type.toLowerCase() === 'checkoff') {
            this.checkoff.push(policy);
          }
        });
        this.rows = this.checkoff;
      }
    });
  }
  

  downloadExcel() {
    this.loading = true;
    const rows = [...this.rows];

    this.excelDownload.checkOffBillerSide('CheckOff.', rows);
    this.loading = false;
  }
}
