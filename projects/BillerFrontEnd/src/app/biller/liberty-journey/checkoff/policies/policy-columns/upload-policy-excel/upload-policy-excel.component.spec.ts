import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPolicyExcelComponent } from './upload-policy-excel.component';

describe('UploadPolicyExcelComponent', () => {
  let component: UploadPolicyExcelComponent;
  let fixture: ComponentFixture<UploadPolicyExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPolicyExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPolicyExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
