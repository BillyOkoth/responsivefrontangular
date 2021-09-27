import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountsComponent } from './add-accounts.component';

describe('AddAccountsComponent', () => {
  let component: AddAccountsComponent;
  let fixture: ComponentFixture<AddAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
