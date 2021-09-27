import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceTemplateComponent } from './invoice-template/invoice-template.component';
import { BellaComponent } from './bella/bella.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceTemplateComponent,
    children: [
      {
        path: '',
        component: BellaComponent
      } ,
      // {
      //   path: 'printview',
      //   component:ViewInvoiceComponent
      // },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
