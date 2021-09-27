import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectNewBillerComponent } from './reject-new-biller.component';

describe('RejectNewBillerComponent', () => {
  let component: RejectNewBillerComponent;
  let fixture: ComponentFixture<RejectNewBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectNewBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectNewBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
