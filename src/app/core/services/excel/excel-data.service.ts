import { Injectable } from '@angular/core';

import zipcelx from 'zipcelx';

import { ExportToCsv } from 'export-to-csv';

@Injectable({
  providedIn: 'root'
})
export class ExcelDataService {
  constructor() {}

  buildExcel(name: string, sheets: any): any {
    const config = {
      filename: name,
      sheet: {
        data: [sheets]
      }
    };

    return zipcelx(config);
  }

  buildExcelIvalidAccount(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      accountNo: 'Account Number',
      status: 'Status'
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.accountNo,
        type: 'number'
      };
      rowArry[1] = {
        value: valueData.status,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }

  // table for my accounts
  buildExcelIviewAccounts(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      account_no: 'Account Number',
      account_name: 'Account Name',
      alias: 'Alias'
    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.account_no,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.account_name,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.alias,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }

  // table for Accountsreports
  buildExcelIviewAccountsReports(name: string, sheets: any): any {
    const sheetsArray = [];
    let rowArry = [];

    const header = {
      account_name: 'Account Name',
      account_no: 'Account Number',
      amount_due: 'Amount Due'
    };

    // make header
    sheets.unshift(header);

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.account_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.account_no,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.amount_due,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }

  //  Account report summary
  buildExcelIviewAccountsReportsSummary(name: string, sheets: any): any {
    const sheetsArray = [];
    let rowArry = [];

    const header = {
      created_at: 'Date Created',
      eslip_no: 'Eslip No',
      bank_ref_no: 'Bank Ref No.',
      eslipamountDue: 'Amount Due',
      amount_to_pay: 'amount_to_pay',
      due_date: 'Due Date',
      eslipStatus: 'Status'
    };

    // make header
    sheets.unshift(header);

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.created_at,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.eslip_no,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.bank_ref_no,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.eslipamountDue,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.amount_to_pay,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.due_date,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.eslipStatus,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }

  // table for Eslip reports
  // table for reports
  buildExcelIviewEslipReports(name: string, sheets: any): any {
    const sheetsArray = [];
    let rowArry = [];

    const header = {
      created_at: 'Date',
      eslip_no: ' E-slip Number',
      status: 'E-slip Status',
      accounts: 'No of Accounts',
      amount_to_pay: 'E-slip Amount',
      bank_ref_no: 'Bank Ref No.',
      ref_no: 'Biller Ref'
    };

    // make header
    sheets.unshift(header);

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.created_at,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.eslip_no,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.accounts,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.amount_to_pay,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.bank_ref_no,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.ref_no,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }
  // table for view details

  buildExcelIviewDetails(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      account_no: 'Account Number',
      account_name: 'Account Name',
      account_balance: 'Amount Balance',
      status: 'Validation',
      created_at: 'Created Date'
    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.account_no,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.account_name,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.account_balance,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.created_at,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }

  // tables for eslip generation.
  buildExcelIpaymentEslip(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      account_no: 'Account Number',
      account_name: 'Name',
      due_date: 'Due Date',
      amount_due: 'Amount Due',
      amount_to_pay: 'AmountPay'
    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.account_no,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.account_name,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.due_date,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.amount_due,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.amount_to_pay,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    zipcelx(config);
  }

  buildExcelBillers(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      company_name: 'Company Name',
      comp_code: 'Biller Code',
      sector: 'Sector',
      branch: 'Branch',
      email: 'Email',
      created_by: 'Created By',
      updated_by: 'Updated By'

    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.company_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.comp_code,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.sector,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.branch,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.email,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.created_by,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.updated_by,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    zipcelx(config);
  }

  buildExcelPayers(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      company_name: 'Company Name',
      email: 'Email',
      comp_code: 'Company Code',
      status: 'Status',
    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.company_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.email,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.comp_code,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.status,
        type: 'string'
      };


      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    zipcelx(config);
  }




  /// eslips account table .
  buildExcelEslipAccounts(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      account_name: 'Account Name',
      account_no: 'Account No.',
      amount_to_pay: 'AmountPay',
      amount_due: 'Amount Due',
      status: 'Status',
      due_date: 'Due Date'
    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.account_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.account_no,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.amount_to_pay,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.amount_due,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.due_date,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    zipcelx(config);
  }

  /// failed Accounts.

  buildExcelFailedAccounts(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      account_name: 'Account Name',
      account_no: 'Account No.',
      amount_to_pay: 'Amount to Pay',
      amount_due: 'Amount Due',
      description: 'Description',
      biller_ref: 'REF No',
      status: 'Status',
      due_date: 'Due Date'
    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.account_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.account_no,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.amount_to_pay,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.amount_due,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.description,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.biller_ref,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[7] = {
        value: valueData.due_date,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    zipcelx(config);
  }

  buildExcelTeamMember(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      username: 'User Name',
      otherName: 'Other Name.',
      status: 'Status',
      userGroup: 'User Group',
      email: 'Email',
      created_at: 'Date Created',
      datemodified: 'Date Modified',
      datelastlogin: 'Date Last Login'
    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.username,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.otherName,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.userGroup,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.email,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.created_at,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.datemodified,
        type: 'string'
      };
      rowArry[7] = {
        value: valueData.datelastlogin,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    zipcelx(config);
  }

  buildloadedAccounts(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      account_no: 'Account No',
      account_name: 'Account Name',
      amount_due: 'Amount Due',
      accounts: 'No. of Accounts',
      due_date: 'Due Date'
    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.account_no,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.account_name,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.amount_due,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.accounts,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.due_date,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }


  buildExcelExpiredEslip(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      created_at: 'Date',
      payer_name:  'Payer Name',
      eslip_no: 'E-Slip Number',
      status: 'E-Slip Status',
      accounts: 'No. of Accounts',
      bank_ref_no: 'Bank Reference',
      amount_to_pay: 'E-Slip Amount'
    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.created_at,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.payer_name,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.eslip_no,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.accounts,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.bank_ref_no,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.amount_to_pay,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }

  buildDetailsPendingService(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      account_name: 'Account Name',
      account_no:  'Account Number',
      eslip_no: 'Eslip Number',
      amount_to_pay: 'Amount to Pay',
      amount_due: 'Amount Due',
      due_date: 'Due Date'

    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.account_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.account_no,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.eslip_no,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.amount_to_pay,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.amount_due,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.due_date,
        type: 'string'
      };


      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }
  billerTeamMember(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      personel_l_name: 'Name',
      email:  'Email',
      phone: 'Phone No.',
      group: 'User Group.',

    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.personel_l_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.email,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.phone,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.group,
        type: 'string'
      };


      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }
  payerTeamMember(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      personel_l_name: 'Name',
      email:  'Email',
      phone: 'Phone No.',
      group: 'User Group.',

    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.personel_l_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.email,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.phone,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.group,
        type: 'string'
      };


      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }
  buildExcelPendingCharges(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      year: 'Year',
      month:  'Month',
      amount: 'Amount',

    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.year,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.month,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.amount,
        type: 'string'
      };


      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }
  // tabels for pending eslips.
  buildExcelIpendingEslip(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      created_at: 'Date',
      payer_name:  'Payer Name',
      eslip_no: 'E-Slip Number',
      status: 'E-Slip Status',
      accounts: 'No. of Accounts',
      amount_to_pay: 'E-Slip Amount'
    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.created_at,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.payer_name,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.eslip_no,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.accounts,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.amount_to_pay,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }

  // tables for paid eslips.
  buildExcelIpaidEslip(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      created_at: 'Date',
      payer_name: 'Payer Name',
      eslip_no: 'E-Slip Number',
      status: 'E-Slip Status',
      accounts: 'No. of Accounts',
      bank_ref_no: 'Bank Ref',
      amount_to_pay: 'E-Slip Amount'
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.created_at,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.payer_name,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.eslip_no,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.accounts,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.bank_ref_no,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.amount_to_pay,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }

  // download sample payments file excel.

  paymentsSampleExcel(name: string, sheets: any): any {
    // make header

    const sheetsArray = [];

    sheets.forEach(valueData => {
      const rowArry = [];

      rowArry[0] = {
        value: '0010000100',
        type: 'string'
      };
      rowArry[1] = {
        value: '500000',
        type: 'string'
      };

      sheetsArray.push(rowArry);
    });

    const config = {
      filename: name,
      sheet: {
        data: [
          [
            {
              value: 'AccountName',
              type: 'string'
            },
            {
              value: 'Amount',
              type: 'string'
            }
          ],
          [
            {
              value: 10000000,
              type: 'number'
            },
            {
              value: 2000000,
              type: 'number'
            }
          ]
        ]
      }
    };

    return zipcelx(config);
  }

  // download sample accounts ecel file.
  accountsSampleExcel(name: string, sheets: any): any {
    const sheetsArray = [];

    sheets.forEach(valueData => {
      const rowArry = [];

      rowArry[0] = {
        value: '0101010101',
        type: 'string'
      };

      sheetsArray.push(rowArry);
    });

    const config = {
      filename: name,
      sheet: {
        // data: sheetsArray
        data: [
          [
            {
              value: 'AccountNumber',
              type: 'string'
            },
            {
              value: 'Amount',
              type: 'string'
            },
            {
              value: 'Alias',
              type: 'string'
            }
          ],
          [
            {
              value: 120191910000,
              type: 'number'
            },
            {
              value: '',
              type: 'number'
            },
            {
              value: 'Alias',
              type: 'string'
            }
          ]
        ]
      }
    };

    return zipcelx(config);
  }

  buildexceptionOwners(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      created_date: 'Date',
      comp_code: 'Company Code',
      description: 'Description',
      payer_name: 'Payer Name'
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.created_date,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.comp_code,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.description,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.payer,
        type: 'string'
      };
      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }

  buildReportDetails(name: string, sheets: any): any {
    let rowArry = [];

    const header = {

      account_name: 'Account Name',
      meter_ft: 'Meter FT',
      meter_count: 'Meter Count',
      trans_date: 'Transaction Date',
      trans_id: 'Transaction Id',
      amount: 'Amount',

    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.account_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.meter_ft,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.meter_count,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.trans_date,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.trans_id,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.amount,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }
  buildReportHistory(name: string, sheets: any): any {
    let rowArry = [];

    const header = {

      eslip_no: 'Eslip No',
      payref: 'Payment Ref',
      amount: 'Amount Paid',
      fromdate: 'Account Name',
      todate: 'Payer Name',
      created_at: 'Created At',

    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.eslip_no,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.payref,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.amount,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.fromdate,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.todate,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.created_at,
        type: 'string'
      };

      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }
  buildReports(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      created_at: 'Date',
      eslip_no: 'Eslip No',
      account_no: 'Account Number',
      bank_ref_no: 'Bank Reference',
      biller_payment_ref: 'Biller Payment Ref',
      account_name: 'Account Name',
      payer_name: 'Payer Name',
      amount_to_pay: 'Amount Paid',
      status: 'Status',
      expiry_date: 'Due Date'
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.created_at,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.eslip_no,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.account_no,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.bank_ref_no,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.biller_payment_ref,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.account_name,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.payer_name,
        type: 'string'
      };
      rowArry[7] = {
        value: valueData.amount_to_pay,
        type: 'string'
      };
      rowArry[8] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[9] = {
        value: valueData.expiry_date,
        type: 'string'
      };
      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }
  buildCsvReports(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      created_at: 'Date',
      eslip_no: 'Eslip No',
      account_no: 'Account Number',
      bank_ref_no: 'Bank Reference',
      biller_payment_ref: 'Biller Payment Ref',
      account_name: 'Account Name',
      amount_due: 'Amount Due',
      status: 'Status',
      due_date: 'Due Date'
    };

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Report',
      filename: 'Report',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: header
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.created_at,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.eslip_no,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.account_no,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.bank_ref_no,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.biller_payment_ref,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.account_name,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.amount_due,
        type: 'string'
      };
      rowArry[7] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[8] = {
        value: valueData.due_date,
        type: 'string'
      };
      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    const csvExporter = new ExportToCsv(options);

    const csv = csvExporter.generateCsv(config);

    return  csv;
  }

  buildexceptionList(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      created_date: 'Date',
      comp_code: 'Company Code',
      description: 'Description',
      payer_name: 'Payer Name',
      code: 'Code'
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.created_date,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.comp_code,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.description,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.payer_name,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.code,
        type: 'string'
      };
      sheetsArray.push(rowArry);
      rowArry = [];
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
      }
    };

    return zipcelx(config);
  }
}
