import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedFilesComponent } from './rejected-files.component';

describe('RejectedFilesComponent', () => {
  let component: RejectedFilesComponent;
  let fixture: ComponentFixture<RejectedFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
