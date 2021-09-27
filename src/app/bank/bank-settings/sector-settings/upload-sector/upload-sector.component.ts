import { Component, OnInit } from '@angular/core';
import { UploadFile, NzModalRef } from 'ng-zorro-antd';
import { SectorService } from 'src/app/core/services/sectors/sector.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-sector',
  templateUrl: './upload-sector.component.html',
  styleUrls: ['./upload-sector.component.scss']
})
export class UploadSectorComponent implements OnInit {
  fileList: any = [];
  selected_file = [];
  fileName;
  loading = false;

  constructor(private sector: SectorService,private ref:NzModalRef,private toastr:ToastrService  ) { }

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
      token: sessionStorage.getItem('h-token'),
      base64Excel: this.fileName,
    };
    

    this.sector.uploadSectors(payload).subscribe((response: any) => {
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
