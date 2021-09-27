import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBillersComponent } from './active-billers.component';

describe('ActiveBillersComponent', () => {
  let component: ActiveBillersComponent;
  let fixture: ComponentFixture<ActiveBillersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveBillersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveBillersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
