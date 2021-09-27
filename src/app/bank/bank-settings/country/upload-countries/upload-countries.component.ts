import { Component, OnInit } from '@angular/core';
import { UploadFile, NzModalRef } from 'ng-zorro-antd';
import { CountryBranchService } from 'src/app/core/services/country-branch/country-branch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-countries',
  templateUrl: './upload-countries.component.html',
  styleUrls: ['./upload-countries.component.scss']
})
export class UploadCountriesComponent implements OnInit {
  fileList: any = [];
  selected_file = [];
  fileName;
  loading = false;

  constructor(private country:CountryBranchService,private ref:NzModalRef,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  fileChange(): void {
    const FileEvent = this.fileList[0];

    this.selected_file.push(this.fileList[0]);

    const reader = new FileReader();

    reader.addEventListener('load', (csv: any) => {
      const base64 = csv.target.result;
      const base64Arry = base64.split('base64,');
      this.fileName = base64Arry[1];
    });

    reader.readAsDataURL(FileEvent);
  }

  saveMultiple() {
    this.loading = true;
    const payload = {
      base64Excel: this.fileName,
    };

    this.country.uploadCountries(payload).subscribe((response: any) => {
      this.loading = false;
      this.ref.close();
      switch (response.messageCode) {
        case '00':
          this.toastr.success(response.message);
          break;

        default:
          this.toastr.warning(response.message);
          break;
      }
    });
  }
}
