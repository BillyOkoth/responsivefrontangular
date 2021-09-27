import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillersComponent } from './view-billers.component';

describe('ViewBillersComponent', () => {
  let component: ViewBillersComponent;
  let fixture: ComponentFixture<ViewBillersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBillersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
