import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBranchesComponent } from './upload-branches.component';

describe('UploadBranchesComponent', () => {
  let component: UploadBranchesComponent;
  let fixture: ComponentFixture<UploadBranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBranchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
