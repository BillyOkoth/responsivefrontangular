import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyManagementComponent } from './currency-management.component';

describe('CurrencyManagementComponent', () => {
  let component: CurrencyManagementComponent;
  let fixture: ComponentFixture<CurrencyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
