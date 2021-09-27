import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoiceTemplateComponent } from './invoice-template/invoice-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InvoiceTemplateComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [

  ],
  entryComponents: []
})
export class InvoicesModule { }

