import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSectorComponent } from './upload-sector.component';

describe('UploadSectorComponent', () => {
  let component: UploadSectorComponent;
  let fixture: ComponentFixture<UploadSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
