import { Component, OnInit } from '@angular/core';
import { read, utils } from 'xlsx';
import { UploadFile } from 'ng-zorro-antd';
import { PoliciesService } from '../../../services/policies.service';

@Component({
  selector: 'app-policy-instructions',
  templateUrl: './policy-instructions.component.html',
  styleUrls: ['./policy-instructions.component.css'],
})
export class PolicyInstructionsComponent implements OnInit {
  selected_file = [];
  fileList: any = [];
  uploading = false;
  fileName;
  data = [];
  columns = [];
  constructor(private policy: PoliciesService) {}

  ngOnInit() {}

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
    this.getExcelRows();
  }

  getExcelRows() {
    let row;
    const json = [];
    const reader = new FileReader();
    reader.onload = (x: any) => {
      const data = x.target.result;
      const workbook = read(data, { type: 'binary' });
      workbook.SheetNames.forEach((sheetname) => {
        row = utils.sheet_to_json(workbook.Sheets[sheetname]);
        json.push(row);
      });
      this.getJson(json[0]);
    };

    reader.onerror = (x: any) => {
      console.error('File could not be read! Code ');
    };

    reader.readAsBinaryString(this.fileList[0]);
  }

  getJson(value) {
    this.data = value;
    const sample = this.data[0];
    const headers = Object.keys(sample);
    headers.forEach((header) => {
      const index = headers.findIndex((value) => value === header) + 1;
      const column = { header: header, index: index };
      this.columns.push(column);
    });
    this.policy.policyColumns = this.columns;
    //  headers.findIndex(value => value.toLowerCase() == "no");
  }
}
