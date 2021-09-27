import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedBillerComponent } from './closed-biller.component';

describe('ClosedBillerComponent', () => {
  let component: ClosedBillerComponent;
  let fixture: ComponentFixture<ClosedBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
