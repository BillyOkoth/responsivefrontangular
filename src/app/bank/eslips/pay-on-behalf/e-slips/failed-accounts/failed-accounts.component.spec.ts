import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedAccountsComponent } from './failed-accounts.component';

describe('FailedAccountsComponent', () => {
  let component: FailedAccountsComponent;
  let fixture: ComponentFixture<FailedAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
