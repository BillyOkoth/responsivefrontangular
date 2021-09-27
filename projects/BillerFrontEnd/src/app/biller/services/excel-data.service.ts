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

  buildExcelIviewDetails(name: string, sheets: any): any {
    const rowArry = [];

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
    });

    const config = {
      filename: name,
      sheet: {
        data: sheetsArray
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

  billerpayerSampleExcel(name: string, sheets: any): any {
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
              value: 'Cust',
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

  // table for my accounts
  payersExcel(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      firstName: 'First Name',
      lastName: 'Last Name',
      company_name: 'Company Name',
      email: 'Email',
      accounts: 'Accounts',
    };

    // make header
    sheets.unshift(header);

    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.firstName,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.lastName,
        type: 'string'
      };
      rowArry[2] = {
        value: valueData.company_name,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.email,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.accounts,
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
  buildExcelServiceCharge(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      created_at: 'Date',
      eslip_no: 'E-Slip Number',
      status: 'E-Slip Status',
      accounts: 'No. of Accounts',
      amount_to_pay: 'E-Slip Amount',
      amount_charged: 'Amount Charge',
      charge_status: 'Charge Status'
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
      rowArry[5] = {
        value: valueData.amount_charged,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.charge_status,
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

  paymentsSamplelxcel(name: string, sheets: any): any {
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
            }
          ],
          [
            {
              value: 10000000,
              type: 'number'
            }
          ]
        ]
      }
    };

    return zipcelx(config);
  }


  // singleIndividual Sample
  singleIndividualSampleExcel(name: string, sheets: any): any {
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
            }
          ],
          [
            {
              value: 10000000,
              type: 'number'
            }
          ]
        ]
      }
    };

    return zipcelx(config);
  }

    // multiple individual sample
  multipleIndividualSampleExcel(name: string, sheets: any): any {
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
            }
          ],
          [
            {
              value: 10000000,
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
      eslip_amount: 'Amount Paid',
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

  outstandingInvoices(name: string, sheets: any): any {
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

  paidInvoiceS(name: string, sheets: any): any {
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
      date: 'Invoice Date',
      service: 'Service',
      ft: 'FT',
      commission: 'Commission',
      tax: 'Tax',
      amount: 'Amount',
      date_paid: 'Date Paid'
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
        value: valueData.created_at,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.service,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.ft,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.commission,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.tax,
        type: 'string'
      };
      rowArry[7] = {
        value: valueData.amount,
        type: 'string'
      };
      rowArry[8] = {
        value: valueData.date_paid,
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
  pendingEslips(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      policy_no: 'Policy No',
      name: 'Policy Holder',
      biller_name: 'Biller Name',
      payer_name: 'Payer Name',
      amount: 'Amount',
      amount_status: 'Amount Status',
      policy_holder_status: 'Policy Holder Status',
      status: 'Status',
      date: 'Date',
     
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.policy_no,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.name,
        type: 'string'
      };    
      rowArry[2] = {
        value: valueData.biller_name,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.payer_name,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.amount,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.amount_status,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.policy_holder_status,
        type: 'string'
      };
      rowArry[7] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[8] = {
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

  pensionBillerSide(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      policy_no: 'Policy No',
      name: 'Policy Holder',
      biller_name: 'Biller Name',
      payer_name: 'Payer Name',
      amount: 'Amount',
      amount_status: 'Amount Status',
      policy_holder_status: 'Policy Holder Status',
      status: 'Status',
      date: 'Date',
     
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.policy_no,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.name,
        type: 'string'
      };    
      rowArry[2] = {
        value: valueData.biller_name,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.payer_name,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.amount,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.amount_status,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.policy_holder_status,
        type: 'string'
      };
      rowArry[7] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[8] = {
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
  checkOffBillerSide(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      policy_no: 'Policy No',
      name: 'Policy Holder',
      biller_name: 'Biller Name',
      payer_name: 'Payer Name',
      amount: 'Amount',
      amount_status: 'Amount Status',
      policy_holder_status: 'Policy Holder Status',
      status: 'Status',
      date: 'Date',
     
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.policy_no,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.name,
        type: 'string'
      };    
      rowArry[2] = {
        value: valueData.biller_name,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.payer_name,
        type: 'string'
      };
      rowArry[4] = {
        value: valueData.amount,
        type: 'string'
      };
      rowArry[5] = {
        value: valueData.amount_status,
        type: 'string'
      };
      rowArry[6] = {
        value: valueData.policy_holder_status,
        type: 'string'
      };
      rowArry[7] = {
        value: valueData.status,
        type: 'string'
      };
      rowArry[8] = {
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
  viewPayerPolicy(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      policy_no: 'Policy No',
      name: 'Policy Holder',
      date: 'Date',
      amount: 'Amount'
     
    };

    // make header
    sheets.unshift(header);
    const sheetsArray = [];

    sheets.forEach(valueData => {
      rowArry[0] = {
        value: valueData.policy_no,
        type: 'string'
      };
      rowArry[1] = {
        value: valueData.name,
        type: 'string'
      };    
      rowArry[2] = {
        value: valueData.date,
        type: 'string'
      };
      rowArry[3] = {
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
  payerPolicy(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      company_name: 'Company Name',
      email: 'Email',
      payer_phone: 'Phone Number',
      status: 'Status'
     
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
        value: valueData.payer_phone,
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

    return zipcelx(config);
  }
  outstandingInvoice(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      payer_name: 'Payer Name',
      invoice: 'Invoice',
      created_at: 'Invoice Date',
      service: 'Service',
      commission: 'Commission',
      tax: 'Tax',
      amount: 'Amount',
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
        value: valueData.created_at,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.service,
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
        value: valueData.amount,
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

    return zipcelx(config);
  }
  disputedInvoice(name: string, sheets: any): any {
    let rowArry = [];

    const header = {
      payer_name: 'Payer Name',
      invoice: 'Invoice',
      created_at: 'Invoice Date',
      service: 'Service',
      commission: 'Commission',
      tax: 'Tax',
      amount: 'Amount',
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
        value: valueData.created_at,
        type: 'string'
      };
      rowArry[3] = {
        value: valueData.service,
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
        value: valueData.amount,
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

    return zipcelx(config);
  }
}

