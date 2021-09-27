import { Injectable } from '@angular/core';

import zipcelx from 'zipcelx';

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

  // table for Eslip reports
  // table for reports
  buildExcelIviewEslipReports(name: string, sheets: any): any {
    const sheetsArray = [];
    let rowArry = [];

    const header = {
      created_at: 'Date',
      eslip_no: ' E-slip Number',
      bank_ref_no: 'Bank Ref No.',
      ref_no: 'Biller Ref',
      eslipamountDue: 'Amount Due',
      amount_to_pay: 'E-slip Amount',
      due_date: 'Due Date',
      status: 'E-slip Status',
      accounts: 'No of Accounts',

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
        value: valueData.ref_no,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.eslipamountDue,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.amount_to_pay,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.due_date,
        type: 'string'
      };
      rowArry[7] = {
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

  buildExcelIviewEslipReportSummary(name: string, sheets: any): any {
    const sheetsArray = [];
    let rowArry = [];

    const header = {
      created_at: 'Date Created',
      eslip_no: ' E-slip No',
      account_no: 'Account No.',
      bank_ref_no: 'Bank Ref No.',
      biller_payment_ref: 'Biller Payment Ref',
      account_name: 'Account Name',
      amount_due: 'Amount Due',
      status: 'Status',
      due_date: 'Due Date'
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

    return zipcelx(config);
  }

  buildExcelReportHistory(name: string, sheets: any): any {
    const sheetsArray = [];
    let rowArry = [];

    const header = {
      created_at: 'Date Created',
      eslip_no: ' E-slip Number',
      amount: 'Eslip Amount',
      payref: 'Payment Ref No',
      corporateid: ' Corporate Id',
      payment_date: 'Payment Date',


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
        value: valueData.amount,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.payref,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.corporateid,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.payment_date,
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

  buildExcelReportDetail(name: string, sheets: any): any {
    const sheetsArray = [];
    let rowArry = [];

    const header = {
      trans_date: '  Transaction Date',
      eslip_no: ' E-slip Number',
      account_name: 'Account Name',
      amount: ' Amount',
      trans_id: 'Transaction Id',
      meter_ft: 'Meter Ft',
      meter_count: ' Meter Count',


    };

    // make header
    sheets.unshift(header);

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.trans_date,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.eslip_no,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.account_name,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.amount,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.trans_id,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.meter_ft,
        type: 'string'
      };
      rowArry[7] = {
        value: valueData.meter_count,
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

  // tabels for pending eslips.
  buildExcelIpendingEslip(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      created_at: 'Date',
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
        value: valueData.bank_ref_no,
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

  buildReports(name: string, sheets: any): any {
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
              value: 'Other Name (Optional)',
              type: 'string'
            }

          ],
          [
            {
              value: '',
              type: 'number'
            },
            {
              value: '',
              type: 'string'
            }
          ]
        ]
      }
    };

    return zipcelx(config);
  }

  payerSampleExcel(name: string, sheets: any): any {
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
              value: 'Cust Code',
              type: 'string'
            },
            {
              value: 'Customer',
              type: 'string'
            },
            {
              value: 'Location',
              type: 'string'
            },
            {
              value: 'Address',
              type: 'string'
            },
            {
              value: 'City',
              type: 'string'
            },
            {
              value: 'Telephone Number',
              type: 'string'
            },
            {
              value: 'Country',
              type: 'string'
            },
            {
              value: 'Email',
              type: 'string'
            }

          ],
          [
            {
              value: '',
              type: 'number'
            },
            {
              value: '',
              type: 'string'
            },
            {
              value: '',
              type: 'number'
            },
            {
              value: '',
              type: 'string'
            },
            {
              value: '',
              type: 'number'
            },
            {
              value: '',
              type: 'string'
            },
            {
              value: '',
              type: 'number'
            },
            {
              value: '',
              type: 'string'
            },
          ]
        ]
      }
    };

    return zipcelx(config);
  }
  viewPolicyFiles(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      payer_name: 'Payer Name',
      name: 'Policy Name',
      policy_no: 'Policy Number',
      created_at: 'Date Created',
      policy_holder_status: 'Policy Holder Status',
      amount_status: 'Amount Status',
      status: 'Status',
      date: 'Date',
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.payer_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.name,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.policy_no,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.created_at,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.policy_holder_status,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.amount_status,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[7] = {
        value: valueData.date,
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
  checkOffPolicies(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      name: 'Name',
      policy_no: 'Policy No.',
      policy_holder_status: 'Policy Status',
      amount: 'Amount To Pay',
      amount_status: 'Amount Status' ,
      date: 'Date Due',

    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.policy_no,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.policy_holder_status,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.amount,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.amount_status,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.date,
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
  outstandingPolicies(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      created_at: 'Date Created',
      file_id: 'File Id',
      policies: 'Policies',
      status: 'Status',
      date: 'Date Due',
      amount: 'Amount To Pay',
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
        value: valueData.file_id,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.policies,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.date,
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
  outstandingInvoice(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      payer_name: 'Payer Name',
      invoice: 'Invoice',
      account_no: 'Service',
      service: 'Bank Reference',
      amount: 'Amount',
      commission: 'Commission',
      tax: 'Tax',
      due_date: 'Due Date'
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.payer_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.invoice,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.service,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.amount,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.commission,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.tax,
        type: 'string'
      };
      rowArry[6] = {
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

  paidInvoice(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      payer_name: 'Payer Name',
      invoice: 'Invoice',
      account_no: 'Service',
      service: 'Bank Reference',
      amount: 'Amount',
      commission: 'Commission',
      tax: 'Tax',
      due_date: 'Due Date'
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.payer_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.invoice,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.service,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.amount,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.commission,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.tax,
        type: 'string'
      };
      rowArry[6] = {
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

  disputedInvoice(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      payer_name: 'Payer Name',
      invoice: 'Invoice',
      account_no: 'Service',
      service: 'Bank Reference',
      amount: 'Amount',
      commission: 'Commission',
      tax: 'Tax',
      due_date: 'Due Date'
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.payer_name,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.invoice,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.service,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.amount,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.commission,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.tax,
        type: 'string'
      };
      rowArry[6] = {
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
}
