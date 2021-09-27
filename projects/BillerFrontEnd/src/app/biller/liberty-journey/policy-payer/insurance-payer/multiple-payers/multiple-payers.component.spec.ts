import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplePayersComponent } from './multiple-payers.component';

describe('MultiplePayersComponent', () => {
  let component: MultiplePayersComponent;
  let fixture: ComponentFixture<MultiplePayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplePayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplePayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
