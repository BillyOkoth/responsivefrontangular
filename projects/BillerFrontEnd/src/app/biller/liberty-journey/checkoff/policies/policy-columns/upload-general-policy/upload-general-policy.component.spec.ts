import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGeneralPolicyComponent } from './upload-general-policy.component';

describe('UploadGeneralPolicyComponent', () => {
  let component: UploadGeneralPolicyComponent;
  let fixture: ComponentFixture<UploadGeneralPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadGeneralPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGeneralPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
