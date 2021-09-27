import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOffUploadDialogComponent } from './check-off-upload-dialog.component';

describe('CheckOffUploadDialogComponent', () => {
  let component: CheckOffUploadDialogComponent;
  let fixture: ComponentFixture<CheckOffUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOffUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOffUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
