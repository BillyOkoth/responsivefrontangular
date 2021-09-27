import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../../services/policies.service';

@Component({
  selector: 'app-policy-file-data',
  templateUrl: './policy-file-data.component.html',
  styleUrls: ['./policy-file-data.component.css']
})
export class PolicyFileDataComponent implements OnInit {
rows = [];
searchValue;
loading = false;
  constructor(private policy: PoliciesService) { }

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
         this.rows = response;
       }
     });
  }
}
