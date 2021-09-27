import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../service/user-profile.service';
import { LoginService } from '../../../service/login.service';
import { Location } from '@angular/common';
import { CongratulationsComponent } from '../../welcome-screen/congratulations/congratulations.component';
import { NzModalService, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-customize-invoice',
  templateUrl: './customize-invoice.component.html',
  styleUrls: ['./customize-invoice.component.css']
})
export class CustomizeInvoiceComponent implements OnInit {
  brandTheme = '#0033A1';
  billerBaseColor = '#0A2240';
  loading = false;
  fileList = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  fileName: any;
  brandColor = `linear-gradient(to bottom, ${this.brandTheme}, ${this.billerBaseColor})`;


  constructor(
    public userProfileService: UserProfileService,
    private location: Location,
    private loginService: LoginService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {

    if (typeof (this.userProfileService.brandColor) === 'undefined') {
      this.userProfileService.brandColor = '#3939d5';
    }

    setInterval(() => {
      this.brandColor = `linear-gradient(to bottom, ${this.userProfileService.brandColor}, ${this.billerBaseColor})`;
    }, 500);

    this.loginService.colorString = this.brandTheme;
  }

  /* user cancel editing */
  cancelEdit(): void {
    this.location.back();
  }

  convert() {

    const FileEvent = this.fileList[0];
    const reader = new FileReader();
    reader.addEventListener('load', (imageData: any) => {
      const base64 = imageData.target.result;
      const base64Arry = base64.split('base64,');
      this.fileName = base64Arry[1];
      this.loginService.theLogo = this.fileName;
      this.userProfileService.brandImage = this.fileName;
    });

    reader.readAsDataURL(FileEvent);
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }



  saveLogo() {
    this.loading = true;
    const payload = {
      base64Logo: this.loginService.theLogo,
      invoice_name: 'e-biller',
      invoice_color: this.userProfileService.brandColor,
      terms: this.loginService.termsGlobal
    };

    this.loginService.saveInvoiceLogo(payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.location.back();
        if (response.messageCode === '00') {
          this.modalService.create({
            nzContent: CongratulationsComponent,
            nzWidth: '70%',
            nzFooter: null,
            nzMaskClosable: false
          });

        }

      },
    );

  }
}
