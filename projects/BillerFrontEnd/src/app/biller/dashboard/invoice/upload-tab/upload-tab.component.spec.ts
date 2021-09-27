import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTabComponent } from './upload-tab.component';

describe('UploadTabComponent', () => {
  let component: UploadTabComponent;
  let fixture: ComponentFixture<UploadTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
