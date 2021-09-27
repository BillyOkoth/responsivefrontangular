import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedFileSummaryComponent } from './uploaded-file-summary.component';

describe('UploadedFileSummaryComponent', () => {
  let component: UploadedFileSummaryComponent;
  let fixture: ComponentFixture<UploadedFileSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedFileSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedFileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
