import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { LoginService } from '../../../../service/login.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { OpenBillerAdminComponent } from '../open-biller-admin/open-biller-admin.component';
import { MyAccountsService } from '../../../../service/my-accounts service/my-accounts.service';
import {
  UpdateAlias,
  DeleteAccount
} from '../../../../service/my-accounts service/my-accounts.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExcelDataService } from '../../../../service/excel-data.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzTableComponent } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDeletionComponent } from './confirm-deletion/confirm-deletion.component';

export interface PeriodicElement {
  eslip_no: any;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-view-accounts',
  templateUrl: './view-accounts.component.html',
  styleUrls: ['./view-accounts.component.css']
})
export class ViewAccountsComponent implements OnInit, OnDestroy {

  constructor(
    private loginService: LoginService,
    private router: Router,
    public myaccountsService: MyAccountsService,
    public fb: FormBuilder,
    private excelDownload: ExcelDataService,
    private toastr: ToastrService,
    private ref: ChangeDetectorRef,
    private modalService: NzModalService
  ) {}
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  // virtual scroll;
  // @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  // @ViewChild("basicTable", { static: false })
  nzTableComponent: NzTableComponent;
  loading = false;
  i = 0;
  aa = false;
  searchValue = '';
  editing = {};
  private destroy$ = new Subject();
  rows: any = [];
  temp = [];
  cols = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  disabled = true;
  biller_code;
  color = '#32a852';
  tplModal: NzModalRef;
  displayDialog: boolean;
  row = {};
  selectedRows = [];
  newRow: boolean;
  aliasForm: FormGroup;
  msgs = [];
  totalRecords;
  selectedRow = [];
  data1: any;
  user_type;

  // new

  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  listOfAllData = [];

  numberOfChecked = 0;

  isAllDisplayDataChecked = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  saveload: boolean;
  list: any;
  account_name: any;
  account_no: any;
  amount_due: any;
  alias: any;

  slipTotal = 0;

  selection = new SelectionModel(true, []);

  scrollToIndex(index: number): void {
    this.nzTableComponent.cdkVirtualScrollViewport.scrollToIndex(index);
  }

  trackByIndex(_: number, data: any): number {
    return data.index;
  }

  ngOnInit() {
    this.list = Array.from({ length: 100000 }).map((_, i) => i);
    this.getMyAccounts();
    this.color = '#32a852';
    this.loading = true;
    this.biller_code = this.loginService.biller_code;
    this.user_type = sessionStorage.getItem('user-type');
    this.cols = [
      { field: 'account_no', header: 'Account No' },
      { field: 'account_name', header: 'Account Name' },
      { field: 'alias', header: 'Other Name' }
    ];
    this.aliasForm = this.fb.group({
      alias: [''],
      account_no: ['']
    });

    this.myaccountsService.fetchAccountsSubject.subscribe(value => {
      if (!this.loading) {
        // make sure you make a request only once
        setTimeout(() => {
          this.getMyAccounts();
        }, 1000);
      }
    });
  }

  getMyAccounts() {
    this.myaccountsService.selectedAccounts = [];
    const payload = {
      biller_code: sessionStorage.getItem('biller_code')
    };
    this.loading = true;
    this.loginService.loadPayerAccounts(payload).subscribe(
      response => {
        this.loading = false;
        this.totalRecords = response.length;
        this.temp = [...response];
        this.rows = response;
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  // creating new Accounts

  addNew(): void {
    this.modalService.create({
      nzTitle: 'Accounts',
      nzContent: OpenBillerAdminComponent,
      nzFooter: null,
      nzWidth: '1000px'
    });
  }

  // take user to payments page
  paymentPage(): void {
    this.loginService.selectedAccounts = this.selected;

    this.router.navigate(['/app/dashboard/payments']);
  }

  getTotal() {
    let total = 0;

    this.selected.forEach((value: any) => {
      total += parseFloat(value.amount_due);
    });

    this.slipTotal = total;
  }

  /**
   * @description:: take the user to uploaded files
   */
  toUploadedFile() {
    this.ref.detach();
    this.router.navigate(['/app/dashboard/uploaded-file-summary']);
  }

  // prime ng refactors

  showDialogToAdd() {
    this.displayDialog = true;
  }

  save(): void {

    this.loading = true;
    const payload: UpdateAlias = {
      account_no: this.account_no,
      alias: this.aliasForm.value.alias
    };

    this.myaccountsService
      .updateAccountAlias(payload)
      .subscribe((response: any) => {
        if (response.messageCode == '00') {
          this.toastr.success(response.message, 'Success');

          setTimeout(() => {
            this.displayDialog = false;
            this.loading = false;
            this.msgs = [];
            this.getMyAccounts();
          }, 1500);
        } else {
          this.toastr.warning(response.message, 'Warning');
          setTimeout(() => {
            this.loading = false;
            this.displayDialog = false;
            this.msgs = [];
            this.getMyAccounts();
          }, 1500);
        }
      });
  }

  delete(value) {
    this.loading = true;
    const payload: DeleteAccount = {
      account_no: value.account_no,

      biller_code: value.biller_code
    };

    this.myaccountsService.deleteAccount(payload).subscribe((response: any) => {
      this.loading = false;
      if ((response.messageCode = '00')) {
        this.displayDialog = false;

        this.toastr.success(response.message, 'Success');
        this.getMyAccounts();
      } else if ((response.messageCode = '06')) {
        this.toastr.warning(response.message, 'Warning');
        this.getMyAccounts();
      } else if ((response.messageCode = '03')) {
        this.toastr.warning(response.message, 'Warning');
        this.getMyAccounts();
      } else if ((response.messageCode = '02')) {
        this.toastr.warning(response.message, 'Warning');
        this.getMyAccounts();
      }
    });
  }

  onSelect(value) {}

  toEslips() {
    this.router.navigate(['/app/dashboard/generated-e-slip']);
  }

  downloadCSV() {
    const rows = [...this.rows];

    this.excelDownload.buildExcelIviewAccounts('MyAccounts', rows);
  }

  //
  ngOnDestroy() {
    this.ref.detach();
    this.destroy$.next();
    this.destroy$.complete();
  }

  // new

  handleOk(): void {
    this.displayDialog = false;
  }

  handleCancel(): void {
    this.displayDialog = false;
  }

  onRowSelect(value) {
    this.newRow = false;
    this.displayDialog = true;

    (this.account_name = value.account_name),
      (this.account_no = value.account_no),
      (this.amount_due = value.amount_due),
      (this.alias = value.alias);
  }

  cloneRow(c) {
    const row = {};
    for (const prop in c) {
      row[prop] = c[prop];
    }
    return row;
  }

  search() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('basicTable');
    tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }

  reset() {
    const input = '';
    this.search();
  }

  deleteMultiple() {

    this.myaccountsService.selectedAccounts = this.selectedRows;
    this.modalService.create({
      nzTitle: 'Delete Multiple Accounts',
      nzContent: ConfirmDeletionComponent,
      nzFooter: null
    });
    this.selectedRows = [];
    // dialogRef.afterClosed().subscribe(result => {
    //   this.getMyAccounts();
    // });
  }

  updateAllChecked(): void {
    this.isIndeterminate = false;
    if (this.isAllDisplayDataChecked) {
      this.rows = this.rows.map(item => {
        return {
          ...item,
          checked: true
        };
      });
      this.selectedRows = this.rows;

    } else {
      this.rows = this.rows.map(item => {
        return {
          ...item,
          checked: false
        };
      });
      this.selectedRows = this.selectedRow.filter(value => {
        return value.checked == true;
      });

    }
  }

  updateSingleChecked(value) {

    if (value.checked == true) {
      this.selectedRows.push(value);

    } else {
      this.selectedRows = this.selectedRows.filter(value => {
        return value.checked == true;
      });

    }
  }

  setIndex(ii) {
    this.aa = ii;
  }

  getNextBatch(event) {}
}
