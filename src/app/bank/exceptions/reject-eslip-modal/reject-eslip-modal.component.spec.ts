import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectEslipModalComponent } from './reject-eslip-modal.component';

describe('RejectEslipModalComponent', () => {
  let component: RejectEslipModalComponent;
  let fixture: ComponentFixture<RejectEslipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectEslipModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectEslipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
